import Head from 'next/head';
import React from 'react';
// Note: This is Mobx store, we can't provide code from here.
// import { store, StoreContext } from 'stores/store';
// import AssetBrowsingWrapper from 'templates/AssetBrowsingWrapper';
import { SSRCookies } from 'utils/cookies';
import { SSRProps } from 'utils/globalTypes';
import UseSsrAuth from 'utils/hooks/useSsrAuth';

export default function AssetsBrowsingPage({ assetBrowsingView }: { assetBrowsingView?: string }) {
  return (
    <>
      <Head>
        <title>Browse Assets</title>
      </Head>
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
