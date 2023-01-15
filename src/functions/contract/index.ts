import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';
export const getAllContracts = {
  handler: `${handlerPath(__dirname)}/handler.getAllContracts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'contracts/',
      },
    },
  ],
};

export const createContract = {
  handler: `${handlerPath(__dirname)}/handler.createContract`,
  events: [
    {
      http: {
        method: 'post',
        path: 'contracts',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getContract = {
  handler: `${handlerPath(__dirname)}/handler.getContract`,
  events: [
    {
      http: {
        method: 'get',
        path: 'contracts/{id}',
      },
    },
  ],
};
