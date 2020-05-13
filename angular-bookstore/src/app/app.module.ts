import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';
//import { JwPaginationComponent } from 'jw-angular-pagination';

import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { SearchNotFoundComponent } from './components/search-not-found/search-not-found.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

const routes: Routes = [
  {path: 'books/:id', component: BookDetailsComponent},
  {path: 'books', component: BookListComponent},
  {path: 'search/:keyword', component: BookListComponent},
  {path: 'category/:id', component: BookListComponent},
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    SearchNotFoundComponent,
    BookDetailsComponent,
    //JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


