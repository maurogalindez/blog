import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Article } from '../../model/article-model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import {SpinnerComponent } from '../spinner/spinner.component'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent extends SpinnerComponent implements OnInit {
  id: number;
  article: Article;
  constructor(private http: HttpService,
              private route: ActivatedRoute,
              public router: Router,
              private notifier: NotifierService,
              protected dialog: MatDialog) {
              super(dialog);
  }

  ngOnInit() {
    this.openSpinner();
    let id = this.route.snapshot.paramMap.get('id')
    this.getArticle(id);
    this.closeSpinner();
    
  }


  getArticle(id) {
   this.http.getArticle(id).subscribe((response) => {
     this.article = response
   }), (error) => {
     this.notifier.notify('error', 'No se ha encontrado el articulo solicitado')
     this.router.navigate(['articulos']);
   };

  }

  goBack(){
    this.router.navigate(['articulos']);
  }

  upvote(article) {
    this.openSpinner();
    article.votes++;
    this.http.modifyArticle(article.id, article).subscribe(()=> {
      this.closeSpinner();
    },(error) => {
      this.closeSpinner();
      this.notifier.notify('error', 'todo salio mal');
    });
  }

  downvote(article) {
    this.openSpinner();
    if(article.votes >= 1) {
      article.votes--;
      this.http.modifyArticle(article.id, article);
    } else {
        this.notifier.notify('error', 'Este articulo ya tiene cero votos');
    }
    this.closeSpinner();
  }
}
