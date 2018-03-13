import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  re_pass: string;
  warning: string = '';
  data: any;

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
            this.data = data;
            if(this.data.status === 200) {
              this.router.navigate(['/login'])
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
