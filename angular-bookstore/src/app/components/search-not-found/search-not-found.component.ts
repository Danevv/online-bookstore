import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { strict } from 'assert';

@Component({
  selector: 'app-search-not-found',
  templateUrl: './search-not-found.component.html',
  styleUrls: ['./search-not-found.component.css']
})
export class SearchNotFoundComponent implements OnInit {
  keyword: string;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const keyword2: string = this._route.snapshot.paramMap.get('keyword');
    this.keyword = keyword2;
  }

}
