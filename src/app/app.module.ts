import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LibrosListComponent } from './components/libros-list/libros-list.component';

import { LibrosService } from './services/libros.service';
import { LibrosHomeComponent } from './components/libros-home/libros-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LibrosListComponent,
    LibrosHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LibrosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
