import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' 
import { Article } from '../model/article-model';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url="/api/articles";

  constructor( private http: HttpClient) { 

  }

  getArticles() {
    return this.http.get<any>(this.url);
  }
  
  getArticle(id) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  createArticle(newArticle: Article) {
    return this.http.post(this.url, newArticle);
  }

  modifyArticle(id, article: Article) {
    return this.http.put(`${this.url}/${id}`, article);
  }

  deleteArticle(id) {
    return this.http.delete(this.url + `/${id}`);
  }

}
