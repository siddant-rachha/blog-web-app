declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'blog-nav-container': {
          'logo-src': string;
          'avatar-src': string;
          'nav-items': string;
          'nav-active': string;
          'avatar-name': string;
          'avatar-items': string;
          'search-items': string;
          'no-results': string;
          'search-item-loading': string;
        };
        'blog-list': {
          'blog-posts': string;
          'blog-filter': string;
          'blog-per-page': string;
          'pagination-filter': string;
        };
        'blog-page': {
          'blog-post': string;
        };
        'blog-form': {
          name?: string;
          title?: string;
          desc?: string;
          'image-url'?: string;
          'reset-form': string;
        };
      }
    }
  }
}
export {};
