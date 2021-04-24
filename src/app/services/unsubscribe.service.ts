import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeService {

  constructor(
  ) { }

  /**
  *Unsubscribes each item in a list of subscriptions (Can handle empty list).
  * @param {Subscription[]} subscriptionsList List of subscriptions.
  * @return {Subscription[]} Returns an emptied Subscription list.
  */
  unsubscribeData(subscriptionsList: Subscription[]) {
    if (subscriptionsList.length > 0) {
      subscriptionsList.forEach(item => {
        if (!item.closed) item.unsubscribe();
      })
      subscriptionsList = [];
    }
    return subscriptionsList;
  }
}
