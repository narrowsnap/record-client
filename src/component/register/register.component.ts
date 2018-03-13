import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  re_pass: string;
  warning: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    if(!this.username || !this.password || !this.re_pass) {
      this.warning = '请完善输入';
    } else if (this.password != this.re_pass) {
      this.warning = '两次密码不相同';
    } else {
      this.userService.register(this.username, this.password)
        .subscribe(
          data => {
            console.log(data);
            if(data.status === 200) {
              this.router.navigate(['/login'])
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
