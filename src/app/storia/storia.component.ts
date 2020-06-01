import { Component, OnInit, AfterViewInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ConnectivityService } from '../connectivity.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { SafeHtmlPipe } from '../safe-html.pipe';

@Component({
  selector: 'app-storia',
  templateUrl: './storia.component.html',
  styleUrls: ['./storia.component.scss'],
  providers: [ SafeHtmlPipe ]
})
export class StoriaComponent implements OnInit, AfterViewInit, OnDestroy {

  // @ViewChild('pRef', {static: false}) pRef: ElementRef;

  // public isS;
  // public isM;
  // public isL;
  // public isXL;

  // public isMax;

  public hrefs;
  public figures;
  public imgfigures;
  public iframes;

  public storia?: Storia;
  public latestStorie?: Storia[] = [];

  public nextStoria: number;

  private navigationSubscription;
  private scrollPosition: [number, number];

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService,
              private breakpointObserver: BreakpointObserver, private router: Router,
              @Inject(DOCUMENT) document, private sHtmlP: SafeHtmlPipe
    ) {

    //this.iframes = document.querySelectorAll('iframe');

    // this.breakpointObserver
    // .observe([Breakpoints.XSmall, Breakpoints.HandsetPortrait])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isS = true;
    //   } else {
    //     this.isS = false;
    //   }
    // });

    // this.breakpointObserver
    // .observe([Breakpoints.Small, Breakpoints.Medium])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isM = true;
    //   } else {
    //     this.isM = false;
    //   }
    // });

    // this.breakpointObserver
    // .observe([Breakpoints.Large])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isL = true;
    //   } else {
    //     this.isL = false;
    //   }
    // });

    // this.breakpointObserver
    // .observe([Breakpoints.XLarge])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isXL = true;
    //   } else {
    //     this.isXL = false;
    //   }
    // });

    // this.breakpointObserver
    // .observe(['(max-width: 800px)'])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isMax = true;
    //     this.iframes.forEach((iframe) => {
    //       iframe.style.width = '300px';
    //       iframe.style.height = '167.75px';
    //     });
    //   } else {
    //     this.isMax = false;
    //     this.iframes.forEach((iframe) => {
    //       iframe.style.width = '600px';
    //       iframe.style.height = '335.5px';
    //     });
    //   }
    // });

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

    storia.link =  'https://ww.unitipossiamo.it/storie/' + storia.id

    storia._links_self = storia._links_self.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");
    storia._links_collection = storia._links_collection.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");
    storia._links_about = storia._links_about.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");
    storia._links_replies = storia._links_replies.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");

    storia._media_full = storia._media_full.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");
    storia._media_medium = storia._media_medium.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");
    storia._media_large = storia._media_large.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");
    storia._media_thumbnail = storia._media_thumbnail.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");
    storia._media_medium_large = storia._media_medium_large.replace("www.unitipossiamo.it", "www.unitipossiamo.it:8443");

    storia._media_full = storia._media_full.substring( storia._media_full.indexOf("https://www.uniti") , storia._media_full.length);
    storia._media_medium = storia._media_medium.substring( storia._media_medium.indexOf("https://www.uniti") , storia._media_medium.length);
    storia._media_large = storia._media_large.substring( storia._media_large.indexOf("https://www.uniti") , storia._media_large.length);
    storia._media_thumbnail = storia._media_thumbnail.substring( storia._media_thumbnail.indexOf("https://www.uniti") , storia._media_thumbnail.length);
    storia._media_medium_large = storia._media_medium_large.substring( storia._media_medium_large.indexOf("https://www.uniti") , storia._media_medium_large.length);

    // normalize links of the images inside the content
    if(storia.content.indexOf("<img") > -1 ) {
      var i = storia.content.indexOf("https://www.unitipossiamo.it/");
      while( i > -1 ) {
        storia.content = storia.content.replace(storia.content.substring(storia.content.lastIndexOf("\"", i) + 1, i), "").replace("https://www.unitipossiamo.it/", "https://www.unitipossiamo.it:8443/");
        i = storia.content.indexOf("https://www.unitipossiamo.it/");
      }
    }

    return storia;
    
  }

  ngOnInit() {  }

  ngAfterViewInit(): void {
    // console.log(this.pRef.nativeElement.innerHTML);
    // this.pRef.nativeElement.innerHTML = this.sHtmlP.transform(this.storia.content, 'html');
    //this.applyStyleStoria();

  }

  ngOnDestroy() { 
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run storia data loading
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
    }
  }

  // applyStyleStoria() {
  //   this.hrefs = document.querySelectorAll('a');
  //   this.hrefs.forEach((a) => {
  //     a.style.textDecoration = 'none';
  //     a.style.color = '#13aff0';
  //   });

  //   this.figures = document.querySelectorAll('figure');
  //   this.imgfigures = document.querySelectorAll('figure > img');
  //   this.iframes = document.querySelectorAll('iframe');

  //   this.figures.forEach((figure) => {
  //     figure.style.margin = '0px';
  //   });

  //   this.imgfigures.forEach((img) => {
  //     img.style.width = '100%';
  //   });

  //   if (this.isMax === true) {
  //     this.iframes.forEach((iframe) => {
  //       iframe.style.width = '300px';
  //       iframe.style.height = '167.75px';
  //     });
  //   } else {
  //     this.iframes.forEach((iframe) => {
  //       iframe.style.width = '600px';
  //       iframe.style.height = '335.5px';
  //     });
  //   }

  // }

  onNext(lastId) {
    this.nextStoria = lastId;
    console.log("lastId", lastId);
    this.router.navigate(['/storie/' + lastId]);
  }

}
