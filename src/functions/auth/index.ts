
import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export const register = {
  handler: `${handlerPath(__dirname)}/handler.register`,
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/register',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
export const login = {
  handler: `${handlerPath(__dirname)}/handler.login`,
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/login',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

