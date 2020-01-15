import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { AbmComponent } from './components/abm/abm.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ArticuloComponent } from './components/articulo/articulo.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NotifierModule} from 'angular-notifier';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    AbmComponent,
    SpinnerComponent,
    ArticuloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    NotifierModule,
    MatDialogModule,
    MatProgressSpinnerModule
      ],
      entryComponents:[SpinnerComponent],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
