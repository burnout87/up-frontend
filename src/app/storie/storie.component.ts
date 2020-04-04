import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../connectivity.service';

@Component({
  selector: 'app-storie',
  templateUrl: './storie.component.html',
  styleUrls: ['./storie.component.css']
})
export class StorieComponent implements OnInit {

  storie:Array<Storia> = new Array();

  constructor(private wsService: ConnectivityService) { 

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.wsService.getListPosts().subscribe((wpStorie:any) => {
      wpStorie.forEach((wpStoria: any)  => {
        var storia: Storia = {
          id: wpStoria.id,
          date: wpStoria.date,
          date_gmt: wpStoria.date_gmt,
          modified: wpStoria.modified,
          modified_gmt: wpStoria.modified_gmt,
          slug: wpStoria.slug,
          status: wpStoria.status,
          type: wpStoria.type,
          link: wpStoria.link,
          title: wpStoria.title.rendered,
          content: wpStoria.content.rendered,
          excerpt: wpStoria.excerpt.rendered,
          author: wpStoria.author,
          featured_media: wpStoria.featured_media,
          comment_status: wpStoria.comment_status,
          ping_status: wpStoria.ping_status,
          sticky: wpStoria.sticky,
          template: wpStoria.template,
          format: wpStoria.format,
          meta: wpStoria.meta,
          categories: wpStoria.categories,
          tags: wpStoria.tags,
          _links_self: wpStoria._links.self.href,
          _links_collection: wpStoria._links.collection.href,
          _links_about: wpStoria._links.about.href,
          _links_author: wpStoria._links.author.href,
          _links_replies: wpStoria._links.replies.href
        };
        this.storie.push(storia);
      });
    });
  }

}

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
  title: string;
  content: string;
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
  _links_self: string;
  _links_collection: string;
  _links_about: string;
  _links_author: string;
  _links_replies: string;
}
