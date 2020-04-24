import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectivityService } from '../connectivity.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-storia',
  templateUrl: './storia.component.html',
  styleUrls: ['./storia.component.scss']
})
export class StoriaComponent implements OnInit {

  public isSmall;
  public isMedium;
  public isLarge;

  storiaId: any;
  storia?: Storia;

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService,
              private breakpointObserver: BreakpointObserver,
    ) {
    this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.Medium])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isMedium = true;
      } else {
        this.isMedium = false;
      }
    });

    this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.XLarge])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isLarge = true;
      } else {
        this.isLarge = false;
      }
    });

  }
  
  ngOnInit() {
    this.storiaId = this.route.snapshot.paramMap.get('id');
    this.wsService.getPost(this.storiaId).subscribe((wpStoria:any) => {
      this.storia = {
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
        _links_self: wpStoria._links.self[0].href,
        _links_collection: wpStoria._links.collection[0].href,
        _links_about: wpStoria._links.about[0].href,
        _links_author: wpStoria._links.author[0].href,
        _links_replies: wpStoria._links.replies[0].href,
        _media_full: "",
        _media_medium: "",
        _media_large: "",
        _media_thumbnail: "",
        _media_medium_large: ""
      };
      this.wsService.getMedia(this.storia.id).subscribe((wpMedia:any) => {
        this.storia._media_full = wpMedia[0].media_details.sizes.full?wpMedia[0].media_details.sizes.full.source_url:"";
        this.storia._media_medium = wpMedia[0].media_details.sizes.medium?wpMedia[0].media_details.sizes.medium.source_url:"";
        this.storia._media_large = wpMedia[0].media_details.sizes.large?wpMedia[0].media_details.sizes.large.source_url:"";
        this.storia._media_thumbnail = wpMedia[0].media_details.sizes.thumbnail?wpMedia[0].media_details.sizes.thumbnail.source_url:"";
        this.storia._media_medium_large = wpMedia[0].media_details.sizes.medium_large?wpMedia[0].media_details.sizes.medium_large.source_url:"";
      });
    });
  }

  ngAfterViewInit(): void {
    
  }

}
