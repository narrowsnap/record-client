import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Record } from '../../model/record';
import { RecordService } from '../../service/record/record.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  records: Record[] = [];
  selected_record: Record = new Record();
  title: string;
  data: any;
  detail: boolean = false;

  constructor(
    private recordService: RecordService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initRecord();
  }

  initRecord() {
    this.recordService.initRecord(localStorage.getItem('username'))
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
          this.records = this.data.records;
        },
        err => {
          console.log(err);
        }
      )
  }

  addRecord() {
    this.recordService.addRecord(localStorage.getItem('username'), this.title)
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
          if(this.data.status !== 200) {
            alert(this.data.message);
          } else {
            document.getElementById('close_modal').click();
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  recordDetail(record_id: string) {
    this.router.navigate(['/record', record_id])
  }

}
