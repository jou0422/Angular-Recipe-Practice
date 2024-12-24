import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ModalComponent } from './modal/modal.component';


export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const localStorageKey = localStorage.getItem('isLoginStatus');

  if (localStorageKey === 'true') {
    return router.createUrlTree(['/home']);
    //TODO 回首頁之後 header and footer 不見了
  } else {
    return true;
  }
}
