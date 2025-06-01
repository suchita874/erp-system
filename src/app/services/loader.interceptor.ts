import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private loaderService = inject(LoaderService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show(); // show loader
    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide(); // hide loader when request completes or errors
      })
    );
  }
}
