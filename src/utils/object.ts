import { IMediaData, LatLon } from 'utils/globalTypes';
import { getValidUrl } from 'utils/urlUtils';

export const getObjProperty = (obj?: Record<string, unknown>, prop?: string, defVal?: unknown) => {
  const val =
    prop &&
    // eslint-disable-next-line
    prop.split('.').reduce((m: any, i: string) => (m && typeof m === 'object' ? m[i] : null), obj);
  return val !== undefined && val != null ? val : defVal;
};

export const getObjContentList = (obj: Record<string, unknown>, path: string) => {
  const contentList = getObjProperty(obj, path);

  if (contentList) return createContentList(contentList);
};

export const getObjPropertyMap = (obj: Record<string, unknown>, props: Record<string, string>) => {
  return Object.keys(props).reduce<Record<string, unknown>>((result, key) => {
    const value = getObjProperty(obj, props[key]);
    if (value) {
      result[key] = value;
    }
    return result;
  }, {});
};

export const getObjPropertyGallery = (obj: Record<string, unknown>, path: string) => {
  const media = getObjProperty(obj, path) as Array<IMediaData>;
  if (media) {
    return media.map(({ fields }) => ({
      original: galleryImage(fields.file.url),
      thumbnail: thumbnailImage(fields.file.url),
      title: fields.title
    }));
  }
};

export const jsonParse = (object: { [key: string]: string | number } | string) => {
  return object && JSON.parse(JSON.stringify(object));
};

export const createContentList = (array?: Array<Record<string, unknown>>) => {
  return (
    array &&
    array.map((item: Record<string, unknown>) => ({
      item: getObjProperty(item, 'fields.data'),
      label: getObjProperty(item, 'fields.label')
    }))
  );
};

export const isEmpty = (obj?: Record<string, unknown>) => {
  return !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);
};

export const isArrayEmpty = (arr?: Array<unknown>) => {
  return !arr || !arr?.length || arr?.length == 0;
};

export const removeEmpty = (object: Record<string, unknown>) => {
  return Object.entries(object).reduce(
    (acc, [key, value]) => (value ? { [key]: value, ...acc } : acc),
    {}
  );
};

export const renameProp = (oldProp: string, newProp: string, { [oldProp]: old, ...others }) => {
  return {
    [newProp]: old,
    ...others
  } as LatLon;
};

export const getGalleryItems = (media?: string[]) => {
  return media
    ? media.map((mediaSrc: string) => {
        return {
          original: thumbnailImage(mediaSrc)
        };
      })
    : [];
};

export const parseLinkMarkdown = (markdownText: string, className?: string) => {
  const template = className
    ? `<a class="${className} ${className}__$1" href="$2">$1</a>`
    : "<a href='$2'>$1</a>";
  return markdownText.replace(/\[(.*?)\]\((.*?)\)/gim, template);
};

export function thumbnailImage(imageSrc: string) {
  const r = new URL(getValidUrl(imageSrc));
  r.searchParams.append('fit', 'thumb');
  r.searchParams.append('f', 'center');
  r.searchParams.append('h', '146');
  r.searchParams.append('w', '228');
  return r.href;
}

const galleryImage = (imageSrc: string) => {
  const r = new URL(getValidUrl(imageSrc));
  r.searchParams.append('fit', 'thumb');
  r.searchParams.append('f', 'center');
  r.searchParams.append('h', '650');
  return r.href;
};
