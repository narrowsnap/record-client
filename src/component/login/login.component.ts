import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../service/user/user.service'

@Component({
  selector: 'app-nav',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  warning: string = '';

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
            console.log(data);
            if(data.status === 200) {
              this.router.navigate(['/home'])
            } else {
              alert(data.message);
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  }

}
