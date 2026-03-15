import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from './shared/toast.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');
  const toastService = inject(ToastService);


  if (token){
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });

    return next(clonedReq).pipe(
      catchError((error)=>{
        toastService.showToast('Something went wrong!', 'danger');
        return throwError(()=> error);
      })
    );
  }

  return next(req);

};
