import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { Observable } from "rxjs/Observable";
import { map, catchError, finalize } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService,
              private router: Router,
              private route: ActivatedRoute) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (!this.loaderService.getFlightStatus()) {
          console.log("Loader Loading");
          this.loaderService.setFlightStatus(true);          
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.setLoadingMessage("King Shan is not reachable!");
        this.loaderService.setFlightStatus(false);
        console.log("ERROR", error);
        return Observable.throw(error);  
      }),
      finalize(() => {
        this.loaderService.setFlightStatus(false);
      })
    );
  }
}