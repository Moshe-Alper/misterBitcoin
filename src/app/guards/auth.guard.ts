import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)

  return userService.loggedInUser$.pipe(
    map(user => {
      if (!user) {
        console.log('Not authorized')
        return router.createUrlTree(['/signup'])
      }
      return true
    })
  )
}
      
  