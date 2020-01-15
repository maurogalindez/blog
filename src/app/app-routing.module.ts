import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { AbmComponent } from './components/abm/abm.component';
import { ArticuloComponent } from './components/articulo/articulo.component';


const routes: Routes = [
  { path: 'articulos', component: ArticulosComponent },
  { path: 'abm', component: AbmComponent},
  { path: 'articulo/:id', component: ArticuloComponent},
  { path: '**', redirectTo: 'articulos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
