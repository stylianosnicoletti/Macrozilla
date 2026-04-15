import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class SimpleLoadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}