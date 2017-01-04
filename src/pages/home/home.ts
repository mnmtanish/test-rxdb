import { Component } from '@angular/core';
import { StorageService } from '../../app/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  value: number

  constructor(public storage: StorageService) {
    this.value = 0;
    this.storage.getCollection().then(coll => {
      coll.find().$.subscribe(docs => {
        this.value = docs && docs[0] && docs[0].get('value') || 0;
      });
    });
  }

  updateTime() {
    const value = Date.now();
    this.storage.setValue(value);
  }
}
