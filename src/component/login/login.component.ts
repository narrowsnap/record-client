import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../service/user/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  warning: string = '';
  data: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if(!this.username || !this.password) {
      this.warning = '请完善输入';
    }  else {
      this.userService.login(this.username, this.password)
        .subscribe(
          data => {
            this.data = data;
            if(this.data.status === 200) {
              localStorage.setItem('username', this.username);
              this.router.navigate(['/home'])
            } else {
              alert(this.data.message);
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  }

}
