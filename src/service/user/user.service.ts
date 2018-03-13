import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HTTP_HOST } from '../config';

@Injectable()
export class UserService {
  url: string = HTTP_HOST + '/user/';

  constructor(
    private http: HttpClient
  ) { }

  register(username: string, password: string) {
    return this.http.post(this.url+'register', {username: username, password: password})
  }

  login(username: string, password: string) {
    return this.http.post(this.url+'login', {username: username, password: password})
  }

}
