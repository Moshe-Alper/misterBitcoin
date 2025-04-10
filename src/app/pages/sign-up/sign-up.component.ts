import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  userName = '';
    
  constructor(
      private userService: UserService,
      private router: Router
  ) { }


  signUp(): void {
      this.userService.signup(this.userName)
          .pipe(take(1))
          .subscribe(() => {
              this.router.navigate(['/'])
          })

  }

}
