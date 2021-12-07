import getConfig from 'next/config';
import { NextSeo } from 'next-seo';
import React from 'react';
// Note: This is Mobx store, we can't provide code from here.
// import { store, StoreContext } from 'stores/store';
// import AssetBrowsingWrapper from 'templates/AssetBrowsingWrapper';
import { SSRCookies } from 'utils/cookies';
import { SSRProps } from 'utils/globalTypes';
import UseSsrAuth from 'utils/hooks/useSsrAuth';

export default function AssetsBrowsingPage({ assetBrowsingView }: { assetBrowsingView?: string }) {
  const { publicRuntimeConfig } = getConfig();
  const { NEXT_PUBLIC_DOMAIN } = publicRuntimeConfig;

  const title = 'Marketplace of Real-Estate assets';
  const url = `https://${NEXT_PUBLIC_DOMAIN}/asset-browsing`;
  const description = 'Asset buy/sell, Security buy/sell, Secondary Real-Estate';

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          title: title,
          url: url,
          description
        }}
      />
      {/*<StoreContext.Provider value={{ ...store, cookie: { value: assetBrowsingView } }}>*/}
      {/*  <AssetBrowsingWrapper />*/}
      {/*</StoreContext.Provider>*/}
    </>
  );
}

export async function getServerSideProps({ req, res }: SSRProps) {
  const authProps = await UseSsrAuth({ req });
  const configProps = SSRCookies(req, res, 'assetBrowsingView');
  return { props: { ...configProps.props, ...authProps.props } };
}
