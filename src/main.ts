import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
console.log('modified by xiaokk3');

console.log('modifid by xiaokk2 branch');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

function promiseChain(arr, input) {
  return arr.reduce(
    (promiseFn, cb) => promiseFn.then(cb),
    Promise.resolve(input)
  );
}

function Pipe(...fns) {
  return (input) => fns.reduce((prev, next) => next(prev), input);
}
