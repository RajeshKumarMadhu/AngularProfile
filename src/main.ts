import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    let ga_id = "G-SMK8ZQ5K7F"; // google analytics id

    document.write(`<script async src="https://www.googletagmanager.com/gtag/js?id=${ga_id}"></script>`);

    const script1 = document.createElement('script');
    script1.innerHTML = `

        // Google Analytics

        window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga_id}', {
            'linker': {
            'domains': ['kuralvenpa.web.app']
            }
        });
    `;
    document.head.appendChild(script1);

    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
