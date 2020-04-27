import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../connectivity.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-storie',
  templateUrl: './storie.component.html',
  styleUrls: ['./storie.component.css']
})
export class StorieComponent implements OnInit {

  public isSmall;
  public isMedium;
  public isLarge;

  storie:Array<Storia> = new Array();

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

      const dataStorie = this.route.snapshot.data['storie'];
      this.populateStorie(dataStorie);
  }

  ngOnInit() {  }

  private populateStorie(dataStorie:[]) {
    dataStorie.forEach((wpStoria: any)  => {
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
        tags: wpStoria._embedded["wp:term"].filter(x => x.length > 0 && x[0].taxonomy && x[0].taxonomy == 'post_tag').length > 0?wpStoria._embedded["wp:term"].filter(x => x[0].taxonomy == 'post_tag')[0]:[],
        _links_self: wpStoria._links.self[0].href,
        _links_collection: wpStoria._links.collection[0].href,
        _links_about: wpStoria._links.about[0].href,
        _links_author: wpStoria._links.author[0].href,
        _links_replies: wpStoria._links.replies[0].href,
        _media_full: wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.full?wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url:"",
        _media_medium: wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.medium?wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url:"",
        _media_large: wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.large?wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url:"",
        _media_thumbnail: wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail?wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url:"",
        _media_medium_large: wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large?wpStoria._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url:""
      };
        
      this.storie.push(storia);
    });
  }

  ngAfterViewInit(): void {
    
  }

}

