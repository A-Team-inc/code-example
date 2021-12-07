import { getAuthDetails, isManagement } from 'utils/authUtils';
import { IReq } from 'utils/globalTypes';

export interface ClaimVerifyResult {
  props: {
    readonly isAuthenticated: boolean;
    readonly isManagement?: boolean;
    readonly email?: string;
    readonly name?: string;
    readonly intercomUser?: string;
  };
}

const UseSsrAuth = async ({ req }: IReq): Promise<ClaimVerifyResult> => {
  let result: ClaimVerifyResult;
  try {
    const authDetails = getAuthDetails(req);
    result = {
      props: {
        isAuthenticated: !!authDetails,
        isManagement: isManagement(authDetails?.groups),
        ...authDetails
      }
    };
  } catch (error) {
    result = { props: { isAuthenticated: false } };
  }

  return result;
};

export default UseSsrAuth;
