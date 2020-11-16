import { platformNativeScriptDynamic } from '@nativescript/angular';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformNativeScriptDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
