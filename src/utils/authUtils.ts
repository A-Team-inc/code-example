import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Amplify, Auth, withSSRContext } from 'aws-amplify';
import * as jsonwebtoken from 'jsonwebtoken';
import jwkToPem, { JWK } from 'jwk-to-pem';
import getConfig from 'next/config';
import Cookies from 'universal-cookie';
import { IReq } from 'utils/globalTypes';
import { getObjProperty } from 'utils/object';

Amplify.Logger.LOG_LEVEL = 'INFO';

export interface IAuthDetails {
  isAuthenticated?: boolean;
  isManagement?: boolean;
  isSystem?: boolean;
  investorId?: string;
  groups?: string[];
  email?: string;
  name?: string;
  intercomUser?: string;
}

interface TokenHeader {
  kid: string;
  alg: string;
}

interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}

interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}

interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

interface Claim {
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  client_id: string;
  email?: string;
  intercom_user?: string;
  name?: string;

  [key: string]: unknown;
}

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_COGNITO, NEXT_PUBLIC_COGNITO_PUBLIC_KEYS } = publicRuntimeConfig;

const cognitoConfig = NEXT_PUBLIC_COGNITO && JSON.parse(NEXT_PUBLIC_COGNITO);
const cognitoPoolId = cognitoConfig && cognitoConfig.USER_POOL_ID;
const cognitoIssuer =
  cognitoPoolId && `https://mock.amazonaws.com/${cognitoPoolId}`;
const cognitoPublicKeys =
  NEXT_PUBLIC_COGNITO_PUBLIC_KEYS && (JSON.parse(NEXT_PUBLIC_COGNITO_PUBLIC_KEYS) as PublicKeys);

let cacheKeys: MapOfKidToPublicKey | undefined;
const getPublicKeys = () => {
  if (!cacheKeys) {
    cacheKeys = cognitoPublicKeys.keys.reduce((agg: any, current: any) => {
      const jwk = current as JWK;
      const pem = jwkToPem(jwk);
      agg[current.kid] = { instance: current, pem };
      return agg;
    }, {} as MapOfKidToPublicKey);
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

export const isSystemUser = (groups?: string[]) => {
  return !!(groups && groups.includes('system'));
};

export const isSponsorUser = (groups?: string[]) => {
  return !!(groups && groups.filter((group) => group.startsWith('sponsor_')).length > 0);
};

export const isManagement = (groups?: string[]) => {
  return isSystemUser(groups) || isSponsorUser(groups);
};

export const getGroups = (session?: CognitoUserSession) => {
  return getObjProperty(session?.getAccessToken()?.payload, 'cognito:groups');
};

export const getInvestorId = (session?: CognitoUserSession) => {
  return getObjProperty(session?.getIdToken()?.payload, 'mock_i_id');
};

export const getName = (session?: CognitoUserSession) => {
  return getObjProperty(session?.getIdToken()?.payload, 'name');
};

export const getEmail = (session?: CognitoUserSession) => {
  return getObjProperty(session?.getIdToken()?.payload, 'email');
};

export const getIntercomUser = (session?: CognitoUserSession) => {
  return getObjProperty(session?.getIdToken()?.payload, 'intercom_user');
};

export const updateName = async (name: string) => {
  const user = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, {
    name: name
  });
};

const cookies = new Cookies();
let authConfigured = false;
let authConfiguring = false;

export const initAuth = () => {
  if (!!NEXT_PUBLIC_COGNITO && !authConfigured) {
    initAmplify();
  }
  return authConfigured;
};

const initAmplify = () => {
  if (authConfiguring) {
    return;
  }
  const auth_config = NEXT_PUBLIC_COGNITO ? JSON.parse(NEXT_PUBLIC_COGNITO as string) : undefined;

  if (auth_config) {
    try {
      authConfiguring = true;
      const amplifyConfig = {
        aws_project_region: auth_config.REGION,
        aws_cognito_identity_pool_id: auth_config.IDENTITY_POOL_ID,
        aws_cognito_region: auth_config.REGION,
        aws_user_pools_id: auth_config.USER_POOL_ID,
        aws_user_pools_web_client_id: auth_config.APP_CLIENT_ID,

        // Cognito Hosted UI configuration
        oauth: {
          domain: auth_config.DOMAIN,
          scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
          redirectSignIn: auth_config.REDIRECT_SIGN_IN,
          redirectSignOut: auth_config.REDIRECT_SIGN_OUT,
          responseType: 'code',

          // optional, for Cognito hosted ui specified options
          options: {
            // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
            AdvancedSecurityDataCollectionFlag: true
          }
        },
        federationTarget: 'COGNITO_USER_POOLS',
        Auth: {
          authenticationFlowType: 'USER_SRP_AUTH'
        },
        ssr: true
      };

      Amplify.configure(amplifyConfig);

      Auth.configure(amplifyConfig);

      authConfigured = true;
    } finally {
      authConfiguring = false;
    }
  }
};

export const getAuthDetails = (req?: IReq) => {
  if (req) {
    const { Auth } = withSSRContext({ req });

    const lastUser = Auth._storage.getItem(
      `CognitoIdentityServiceProvider.${cognitoConfig.APP_CLIENT_ID}.LastAuthUser`
    );
    const token = Auth._storage.getItem(
      `CognitoIdentityServiceProvider.${cognitoConfig.APP_CLIENT_ID}.${lastUser}.idToken`
    );

    return getAuthDetailsFromToken(lastUser, token);
  } else {
    const lastUser = cookies.get(
      `CognitoIdentityServiceProvider.${cognitoConfig.APP_CLIENT_ID}.LastAuthUser`
    );
    const token = cookies.get(
      `CognitoIdentityServiceProvider.${cognitoConfig.APP_CLIENT_ID}.${lastUser}.idToken`
    );

    return getAuthDetailsFromToken(lastUser, token);
  }
};

export const isAuthenticated = (req?: IReq) => {
  return !!getAuthDetails(req);
};

const getAuthDetailsFromToken = (lastUser: string, token: string) => {
  if (!token) {
    // noinspection ExceptionCaughtLocallyJS
    return;
  }
  const tokenSections = token.split('.');
  if (tokenSections.length < 2) {
    // noinspection ExceptionCaughtLocallyJS
    console.log('requested token is invalid');
    return;
  }
  const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
  const header = JSON.parse(headerJSON) as TokenHeader;
  const keys = getPublicKeys();
  const key = keys && keys[header.kid];
  if (key === undefined) {
    // noinspection ExceptionCaughtLocallyJS
    console.log('claim made for unknown kid');
    return;
  }
  const claim = jsonwebtoken.verify(token, key.pem) as Claim;
  const currentSeconds = Math.floor(new Date().valueOf() / 1000);
  if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
    // noinspection ExceptionCaughtLocallyJS
    console.log('claim is expired or invalid');
    return;
  }
  if (claim.iss !== cognitoIssuer) {
    // noinspection ExceptionCaughtLocallyJS
    console.log('claim issuer is invalid');
    return;
  }
  if (claim.token_use !== 'id') {
    // noinspection ExceptionCaughtLocallyJS
    console.log('claim use is not id');
    return;
  }

  return {
    token: token,
    email: claim.email,
    groups: getObjProperty(claim, 'cognito:groups', []),
    intercomUser: claim.intercom_user || '',
    name: claim.name || ''
  };
};
