import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent extends SpinnerComponent implements OnInit {
  title: string;
  subTitle: string;
  content: string;
  articles: Array<any>;

  constructor(private http: HttpService,
              public router: Router,
              private notifier: NotifierService,
              protected dialog: MatDialog) {
              super(dialog)
               }

  ngOnInit() {
    this.articlesRequest();
    window.scroll(0,0);

  }

  articlesRequest() {
    this.openSpinner();
    this.http.getArticles().subscribe((response) => {
      this.articles = response;
      this.closeSpinner();
    }, (error)=> {
      this.closeSpinner();
      this.notifier.notify('error','todo salio mal');
    });
  }

  goToArticle(id) {
    this.router.navigate(['articulo/'+id]);
  }

  upvote(article) {
    this.openSpinner();
    article.votes++;
    this.http.modifyArticle(article.id, article).subscribe((response) => {
      this.closeSpinner();
    },(error)=> {
      this.closeSpinner();
      this.notifier.notify('error','todo salio mal');
    });
  }

  downvote(article) {
    this.openSpinner();
    if(article.votes >= 1) {
      article.votes -- ;
      this.http.modifyArticle(article.id, article).subscribe((response) => {
        this.articlesRequest();
        this.closeSpinner();
      },(error)=> {
        this.closeSpinner();
        this.notifier.notify('error','todo salio mal');
      })
    } else {
        this.notifier.notify('error', 'Este articulo ya tiene cero votos');
        this.closeSpinner();
      }
  }

}
