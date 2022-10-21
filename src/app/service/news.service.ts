import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // apiKey : 2750e7eac1954f3ba1dec50679bb241b
  // url : https://newsapi.org/v2/everything?q=keyword&apiKey=
  apiKey:string = "2750e7eac1954f3ba1dec50679bb241b";
  url:string = "https://newsapi.org/v2/sources?language=en&apiKey=";
  constructor(private http: HttpClient) { }

  initSource() {
    return this.http.get<any>(this.url+this.apiKey);
  }
  getArticleByid(source: string) {
    return this.http.get<any>("https://newsapi.org/v2/top-headlines?sources=" + source + "&apiKey="+ this.apiKey);
  }
  initArticles() {
    return this.http.get<any>("https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey="+ this.apiKey);
  }

}
