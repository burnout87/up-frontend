import { Component, OnInit, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ConnectivityService } from '../connectivity.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-storia',
  templateUrl: './storia.component.html',
  styleUrls: ['./storia.component.scss'],
})
export class StoriaComponent implements OnInit, AfterViewInit, OnDestroy {

  //@ViewChild('containerStoria', {static: false}) containerStoria: ElementRef;

  public isSmall;
  public isMedium;
  public isLarge;

  public isMax;

  public hrefs;
  public figures;
  public imgfigures;
  public iframes;

  public storia?: Storia;
  public latestStorie?: Storia[] = [];

  private navigationSubscription;
  private scrollPosition: [number, number];

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService,
              private breakpointObserver: BreakpointObserver, private router: Router,
              @Inject(DOCUMENT) document
    ) {

    this.iframes = document.querySelectorAll('iframe');

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

    this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isMax = true;
        this.iframes.forEach((iframe) => {
          iframe.style.width = '300px';
          iframe.style.height = '167.75px';
        });
      } else {
        this.isMax = false;
        this.iframes.forEach((iframe) => {
          iframe.style.width = '600px';
          iframe.style.height = '335.5px';
        });
      }
    });

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.latestStorie = [];
        this.loadPageContent();
      }
    });
  }

  private loadPageContent() {
    const storiaData = this.route.snapshot.data['storia'];
    const latestStorieData = this.route.snapshot.data['latestStorie'];
    this.storia = this.populateStoria(storiaData);
    latestStorieData.forEach((latestStoriaData: any) => {
        this.latestStorie.push(this.populateStoria(latestStoriaData));
    });
  }
  
  private populateStoria(dataStoria: any) : Storia {
    var storia = {
      id: dataStoria.id,
      date: dataStoria.date,
      date_gmt: dataStoria.date_gmt,
      modified: dataStoria.modified,
      modified_gmt: dataStoria.modified_gmt,
      slug: dataStoria.slug,
      status: dataStoria.status,
      type: dataStoria.type,
      link: dataStoria.link,
      title: dataStoria.title.rendered,
      content: dataStoria.content.rendered,
      excerpt: dataStoria.excerpt.rendered,
      author: dataStoria.author,
      featured_media: dataStoria.featured_media,
      comment_status: dataStoria.comment_status,
      ping_status: dataStoria.ping_status,
      sticky: dataStoria.sticky,
      template: dataStoria.template,
      format: dataStoria.format,
      meta: dataStoria.meta,
      categories: dataStoria.categories,
      tags: dataStoria._embedded["wp:term"].filter(x => x.length > 0 && x[0].taxonomy && x[0].taxonomy == 'post_tag').length > 0?dataStoria._embedded["wp:term"].filter(x => x[0].taxonomy == 'post_tag')[0]:[],
      _links_self: dataStoria._links.self[0].href,
      _links_collection: dataStoria._links.collection[0].href,
      _links_about: dataStoria._links.about[0].href,
      _links_author: dataStoria._links.author[0].href,
      _links_replies: dataStoria._links.replies[0].href,
      _media_full: dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.full?dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url:"",
      _media_medium: dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.medium?dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url:"",
      _media_large: dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.large?dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url:"",
      _media_thumbnail: dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail?dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url:"",
      _media_medium_large: dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large?dataStoria._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url:""
    };

    return storia;
    
  }

  ngOnInit() {  }

  ngAfterViewInit(): void {

    this.applyStyleStoria();

  }

  ngOnDestroy() { 
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run storia data loading
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
    }
  }

  applyStyleStoria() {
    this.hrefs = document.querySelectorAll('a');
    this.hrefs.forEach((a) => {
      a.style.textDecoration = 'none';
      a.style.color = '#13aff0';
    });

    this.figures = document.querySelectorAll('figure');
    this.imgfigures = document.querySelectorAll('figure > img');
    this.iframes = document.querySelectorAll('iframe');

    this.figures.forEach((figure) => {
      figure.style.margin = '0px';
    });

    this.imgfigures.forEach((img) => {
      img.style.width = '100%';
    });

    if (this.isMax === true) {
      this.iframes.forEach((iframe) => {
        iframe.style.width = '300px';
        iframe.style.height = '167.75px';
      });
    } else {
      this.iframes.forEach((iframe) => {
        iframe.style.width = '600px';
        iframe.style.height = '335.5px';
      });
    }

  }

}
