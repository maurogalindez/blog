import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' 
import { NewArticle } from '../model/newArticle-model'
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

  createArticle(newArticle: NewArticle) {
    return this.http.post(this.url, newArticle);
  }

  modifyArticle(id, article) {
    return this.http.put(`${this.url}/${id}`, article);
  }

  deleteArticle(id) {
    return this.http.delete(this.url + `/${id}`);
  }

}
