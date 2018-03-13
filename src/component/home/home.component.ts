import { Component, OnInit } from '@angular/core';

import { Record } from '../../model/record';

@Component({
  selector: 'app-nav',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  records: Record[] = [];

  constructor() { }

  ngOnInit() {
  }

  addRecord() {

  }

}
