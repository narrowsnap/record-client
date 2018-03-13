import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HTTP_HOST } from '../config';

@Injectable()
export class RecordService {
  url: string = HTTP_HOST + '/user/';

  constructor(
    private http: HttpClient
  ) { }

  addRecord(username: string, password: string) {
    return this.http.post(this.url+'register', {username: username, password: password})
  }
}
