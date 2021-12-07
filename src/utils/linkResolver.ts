// util for dynamic prismic link resolution
// @ts-ignore
export const linkResolver = (doc):string => {    
    if(!doc) return '/404';
    if(doc.url) return doc.url;
    if (doc.type === 'homepage') return '/';
    if (doc.type === 'product') return '/products/';
    if (doc.type === 'industries_page') return `/industries/${doc.uid}`
    if (doc.type === 'contact') return '/contact/';
    if (doc.type === 'contact_form') return `/contact/${doc.uid}`;
    if (doc.type === 'legal') return '/legal/';
    if (doc.type === 'about_us') return '/about-us/';
    if (doc.type === 'blog_post') return`/blog/${doc.uid}`;
    if (doc.type === 'blog_landing') return `/blog/`;
    if (doc.type === 'resources_page') return '/resoures/';
    if (doc.type === 'generic_page') return `/${doc.uid}/`;
    if (doc.type === 'careers_post') return `/careers/${doc.uid}`;
    if (doc.type === 'careers') return '/careers';
    if (!doc.uid) return '/';
    return `/${doc.uid}`;
}

export interface LinkInterface {
  _linkType? : string,
  url?: string,
  target?: string,
  _meta? : {
    type: string,
    uuid?: string,
  }
}

export const resolveLink = (link: LinkInterface): string =>
    link._linkType === 'Link.document' ? linkResolver(link._meta) : link.url!;
