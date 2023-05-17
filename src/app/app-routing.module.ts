import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosListComponent } from './components/libros-list/libros-list.component'
import { LibrosHomeComponent } from './components/libros-home/libros-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: LibrosHomeComponent
  },
  {
    path: '',
    redirectTo: '/libros',
    pathMatch: 'full'
  },
  {
    path: 'libros',
    component: LibrosListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
