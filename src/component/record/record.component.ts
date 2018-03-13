import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Record } from '../../model/record';
import { RecordService } from '../../service/record/record.service'

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  record: Record = new Record();
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  timer: any;
  start_date: any;
  lock: boolean = true;
  data: any;

  constructor(
    private recordService: RecordService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(
      params => {
        this.getRecordById(params['id']);
      }
    )
  }

  getRecordById(record_id) {
    this.recordService.getRecordById(record_id)
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
          this.record = this.data.record;
          this.initTime(this.record.continued);
        },
        err => {
          console.log(err);
        }
      )
  }

  initTime(time) {
    this.hour = Math.floor(time / 3600);
    this.minute = Math.floor((time % 3600) / 60);
    this.second = time - this.hour*3600 - this.minute*60;
  }

  start() {
    if(this.lock) {
      this.start_date = Date.now();
    }
    this.timer = setInterval(() => {
      if(this.second == 59) {
        if(this.minute == 59) {
          this.hour++;
          this.minute = 0;
        } else {
          this.minute++;
        }
        this.second = 0;
      } else {
        this.second++;
      }
    }, 1000)
  }

  end() {
    clearInterval(this.timer);
    this.record.continued = this.hour*3600 + this.minute*60 + this.second;
    this.record.date.push(this.start_date + '-' + Date.now());
    console.log(this.record);
    this.recordService.updateRecord(this.record)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }

  pause() {
    clearInterval(this.timer);
  }

}
