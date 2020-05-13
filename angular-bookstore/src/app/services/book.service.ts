import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://jenkins-server.ddns.net:49090/api/v1/books";

  private categoryUrl = "http://jenkins-server.ddns.net:49090/api/v1/book-category";


  constructor(private httpClient: HttpClient ) { }

  getBooks(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/categoryId?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  private getBookList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getBooks2(currentPage: number, pageSize: number): Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/findByName?name=&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  //old method unused for displaying all books without pagination
  getBooks3(): Observable<Book[]>{
    const searchUrl = `${this.baseUrl}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }

  getBookCategories(): Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/findByName?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  
  }

  getBookDetails(bookId:number): Observable<Book>{
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }
}

interface GetResponseBooks{
  _embedded: {
    books: Book[];
  },
  page: {
    //num of ell in each page
    size: number,
    //total num of rec in database
    totalElements: number,
    //starts from 0 index
    tozalPages: number,
    //curr page
    number: number
  }
}

interface GetResponseBookCategory{
  _embedded: {
    bookCategory: BookCategory[];
  }
}
