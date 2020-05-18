import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from "@angular/router";
import {NgbPaginationConfig} from "@ng-bootstrap/ng-bootstrap";
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategory: number=1;
//new prop for serverside paging
  currentPage: number =1;
  pageSize: number = 6;
  totalRecords: number = 0;

  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute,
              private _cartService: CartService,
              private _spinnerService: NgxSpinnerService,
              _config:NgbPaginationConfig) {
      _config.maxSize = 3;
      _config.boundaryLinks =true; //sets first and last page button
     }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

 
  listBooks() {
    //starts the loader of the spinner
    this._spinnerService.show();
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchBooks();
    }else{
      this.handleListBooks();
    }

  }

  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword,this.currentPage -1,this.pageSize)
                      .subscribe(this.processPaginate() )
  }

  handleListBooks(){
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
      //setting up current page to 1 if user navigates to other category
    if(this.previousCategory != this.currentCategoryId){
      this.currentPage =1;
    }
  
    this.previousCategory = this.currentCategoryId;


    this._bookService.getBooks(this.currentCategoryId,
      this.currentPage - 1,
      this.pageSize)
      .subscribe(
          this.processPaginate());
    } else {
      // this.currentCategoryId = 1;
      this._bookService.getBooks2( this.currentPage - 1,
        this.pageSize).subscribe(
          this.processPaginate())
    }

  }

  updatePageSize(pageSize: number){
   this.pageSize = pageSize;
   this.currentPage = 1;
    this.listBooks();
  }

  processPaginate(){
    return data => {
      //hide/stop the spinner-loader
      this._spinnerService.hide();
      
      this.books = data._embedded.books;
      //starts from 1 index
      this.currentPage = data.page.number +1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  addToCart(book: Book){
    console.log(`book name: ${book.name}, and price: ${book.unitPrice}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }
}
