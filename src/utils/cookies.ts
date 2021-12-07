/*
 Cookies manager for the client-side and SSR

 Props for the getCookies:
 @key: string;

 Props for the setCookies:
 @key: string;
 @value: string;
 @opts: { expires?: string; path?: string; domain?: string; secure?: string }
*/

import Cookies from 'cookies';

export const parseCookieValue = (val?: string) => {
  if (val) {
    try {
      return JSON.parse(val);
    } catch (e) {
      // ignore invalid values
    }
  }
};

const formatCookieValue = (val: Record<string, unknown>) => {
  try {
    return JSON.stringify(val);
  } catch (e) {
    return '{}';
    // ignore invalid values
  }
};

export const getCookies = (key: string) => {
  const cookieParts = document.cookie.split(/;\s*/);

  for (let i = 0; i < cookieParts.length; i++) {
    const ps = cookieParts[i].split('=');
    const k = decodeURI(ps[0]);
    if (k === key) return parseCookieValue(decodeURI(ps[1]));
  }

  return undefined;
};

export const setCookies = (
  key: string,
  value: Record<string, unknown>,
  opts?: { expires?: string; path?: string; domain?: string; secure?: string }
) => {
  if (!opts) opts = {};

  let options = encodeURI(key) + '=' + encodeURI(formatCookieValue(value));
  if (opts.expires) options += '; expires=' + opts.expires;
  if (opts.path) options += '; path=' + encodeURI(opts.path);
  if (opts.domain) options += '; domain=' + encodeURI(opts.domain);
  if (opts.secure) options += '; secure';

  document.cookie = options;

  return options;
};

export const SSRCookies = (req: unknown, res: unknown, view: string) => {
  const cookies = new Cookies(req, res);
  const cookieValue = cookies.get(view);

  return { props: { [view]: cookieValue || '' } };
};
