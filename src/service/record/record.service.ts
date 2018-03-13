import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HTTP_HOST } from '../config';

@Injectable()
export class RecordService {
  url: string = HTTP_HOST + '/record/';

  constructor(
    private http: HttpClient
  ) { }

  initRecord(username: string) {
    return this.http.post(this.url+'initRecord', {username: username})
  }

  addRecord(username: string, title: string) {
    return this.http.post(this.url+'addRecord', {username: username, title: title})
  }

  updateRecord(record) {
    return this.http.post(this.url+'updateRecord', {record: record})
  }

  getRecordById(record_id: string) {
    return this.http.post(this.url+'getRecordById', {record_id: record_id})
  }

}
