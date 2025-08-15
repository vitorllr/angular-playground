import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { MessageService } from 'primeng/api';
import { AuthService } from './components/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const authService = inject(AuthService);
          const messageService = inject(MessageService);
          const handler = { handle: next } as any;
          return new AuthInterceptor(authService, messageService).intercept(req, handler);
        }
      ])
    )
  ]
};
