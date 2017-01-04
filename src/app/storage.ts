import { Injectable } from '@angular/core';
import * as rxdb from 'rxdb';
import rxdbLocalStorage from 'rxdb-adapter-localstorage';

// NOTE:
// This is a badly written service
// Please don't try this at work

// register storage adapter
rxdb.plugin(rxdbLocalStorage);

const schema = {
  title: 'test-schema',
  description: 'This is a test schema',
  properties: {
    id: { type: 'string', primary: true },
    value: { type: 'number' }
  },
}

@Injectable()
export class StorageService {
  _collectionPromise: Promise<any>

  setValue(value: number) {
    return Promise.resolve(null)
      .then(() => this.getCollection())
      .then(coll => {
        return Promise.resolve(null)
          .then(() => coll.findOne({ id: 'test-doc' }).exec())
          .then(doc => {
            if (doc) {
              doc.set('value', value);
              return doc.save();
            }
            return coll.insert({ id: 'test-doc', value });
          })
      })
  }

  getCollection() {
    if (!this._collectionPromise) {
      this._collectionPromise = Promise.resolve(null)
        .then(() => rxdb.create('test-db', 'localstorage'))
        .then(db => db.collection('test-collection', schema))
    }
    return this._collectionPromise;
  }
}
