interface Storia {
    id: number;
    date: string;
    date_gmt: string;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title?: string;
    content?: string;
    excerpt: string;
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any;
    categories: any;
    tags: any;
    _media_full: string;
    _media_medium: string;
    _media_large: string;
    _media_thumbnail: string;
    _media_medium_large: string;
    _links_self: string;
    _links_collection: string;
    _links_about: string;
    _links_author: string;
    _links_replies: string;
  }
  