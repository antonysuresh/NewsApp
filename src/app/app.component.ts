import { NewsService } from './service/news.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver} from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'newsApp';
  public sources: any = [];
  public articles: any = [];
  selectedNews: any = "Top 10 Trending News";
  @ViewChild(MatSidenav) public sideNav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private api: NewsService
    ){}
  ngOnInit(): void {
    this.api.initArticles().subscribe({
      next: (res:any) => {
        console.log(res);
        this.articles = res.articles;
      },
      error: () =>{
        alert("error")
      }
    })
    this.api.initSource().subscribe({
      next: (res:any) => {
        console.log(res);
        this.sources = res.sources;
      },
      error: () =>{
        alert("error")
      }
    })
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:787px)'])
    .subscribe((res:any)=>{
      if(res.matches) {
        this.sideNav.mode  = 'push';
        this.sideNav.close();
      }else {
        this.sideNav.mode  = 'side';
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }

  searchSource(source:any) {
    this.api.getArticleByid(source.id).subscribe({
      next: (res) => {
        this.articles = res.articles;
        this.selectedNews = source.name;
      },
      error: () => {
        alert("error");
      }
    })
  }
}
