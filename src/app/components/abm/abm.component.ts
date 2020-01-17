import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Article } from 'src/app/model/article-model';


@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.scss']
})
export class AbmComponent extends SpinnerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'subTitle', 'votes', 'editar', 'borrar'];
  articles;
  dataSource;
  newArticle: Article;
  status: string
  createOrModify: boolean;
  article: Article
  modifiedArticle: Article;

  private readonly notifier: NotifierService;

  constructor(private http: HttpService,
              private router: Router,
              notifierService: NotifierService,
              protected dialog: MatDialog
  ) {
    super(dialog);
    this.notifier = notifierService;
    this.newArticle = new Article('','','');
  } 

  ngOnInit() {
    this.getArticles();
    this.createOrModify = true;
  }

  getArticles() {
    this.openSpinner();
    this.http.getArticles().subscribe((response) => {
      this.articles = response;
      this.dataSource = this.articles;
      this.closeSpinner();
    }, (error) => {
        console.log(<any>error);
        this.closeSpinner();
    });

  }

  

  onSubmit(form) {
    this.newArticle.votes = 0;
    this.openSpinner();
    if(!this.newArticle.title || !this.newArticle.subTitle || !this.newArticle.content) {
      this.notifier.notify('error','Todos los campos deben ser completados para poder crear un articulo')
    }else{
      this.http.createArticle(this.newArticle).subscribe((success) => {
        this.status = "success";
        form.reset();
        this.getArticles();
        this.notifier.notify('success', 'El articulo ha sido creado con exito')
      }, (error) => {
        this.status = "error";
        console.log(<any>error);
      });
    } 
    this.closeSpinner();
    window.scrollTo(0,document.body.scrollHeight);
  }

  deleteArticle(id) {
    this.http.deleteArticle(id).subscribe((success)=> {
      this.notifier.notify('success', 'El articulo ha sido borrado');
      this.getArticles();
    },(error)=> {
      this.notifier.notify('error','No ha podido borrarse el articulo');
    });
    window.scroll(0,0);
  }


  modifyArticle(form) {
    this.http.modifyArticle(this.modifiedArticle.id, this.modifiedArticle).subscribe((response) => {
      this.notifier.notify('success', 'El articulo ha sido modificado exitosamente');
      this.getArticles();
      form.reset()
      this.createOrModify = !this.createOrModify;
    })
  }



  goToArticles() {
    this.router.navigate(['articulos']);
  }

  switchView(id) {
    this.http.getArticle(id).subscribe((response) => {
      this.modifiedArticle = response;
      this.createOrModify = !this.createOrModify;
      window.scroll(0,0);
    });
  }

}

 
 