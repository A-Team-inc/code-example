// Utility function to remove prismic compression params from image links
// https://user-guides.prismic.io/en/articles/3395418-image-optimization-service-faq

export const stripCompressionParams = (url: string) => url.split('?')[0];