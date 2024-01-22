/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

export interface BlogPost {
    id: number;
    author_details: Details;
    image_details: Details;
    title: string;
    description: string;
    content: string;
    publishDate: Date;
  }
  
  export interface Details {
    id: number;
    name: string;
    image: string;
    uploadDate?: Date;
  }