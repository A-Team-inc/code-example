import { NextRouter } from 'next/router';

export function getFilenameFromUrl(url: string) {
  const validUrl = getValidUrl(url);
  if (validUrl) {
    const pathname = new URL(validUrl).pathname;
    const index = pathname.lastIndexOf('/');
    return -1 !== index ? pathname.substring(index + 1) : pathname;
  }
}

export function getValidUrl(url: string) {
  if (url) {
    if (url.startsWith('//')) return 'https:' + url;
  }
  return url;
}

export function removeUrlParameter(url: string, paramKey: string) {
  const r = new URL(url);
  r.searchParams.delete(paramKey);
  return r.href;
}

export function getSingleValue(value: unknown, defVal?: unknown) {
  return value ? (Array.isArray(value) ? value[0] : value) : defVal;
}

export const sameParent = (router: NextRouter, url: string) => {
  return url && router.pathname && url.split('/')[1] === router.pathname.split('/')[1];
};

export const sameUrl = (router: NextRouter, url: string) => {
  return url && router.pathname && url === router.pathname;
};
