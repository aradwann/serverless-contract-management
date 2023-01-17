import type { AWS } from '@serverless/typescript';

import { hello } from '@functions/hello';
import { createContract, getAllContractIds, getContract } from '@functions/contract'
import { register, login, authorizerFunc } from '@functions/auth'

const serverlessConfiguration: AWS = {
  service: 'contracts-management',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dynamodb-local', 'serverless-offline',], // TODO: use openapi plugin to generate a nice interface page
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    httpApi: {
      // TODO user authorizer
      // there is an open issue with serverless-offline plugin: https://github.com/dherault/serverless-offline/issues/1624
      // so custom authorizers won't be loaded for offline use
      // authorizers: {
      //   customAuthorizer: {
      //     type: 'request',
      //     functionName: "authorizerFunc",
      //     enableSimpleResponses: true,
      //     payloadVersion: '2.0',
      //     AuthorizerPayloadFormatVersion: '2.0',
      //     identitySource: '$request.header.Authorization',
      //     managedExternally: true
      //   }
      // }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
          ],
          Resource: "arn:aws:dynamodb:us-west-2:*:table/ContractsTable",
        }],
      },
    },
  },
  // import the function via paths
  functions: { authorizerFunc, register, login, hello, createContract, getContract, getAllContractIds },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    }
  },

  resources: {
    Resources: {
      ContractsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "ContractsTable",
          AttributeDefinitions: [{
            AttributeName: "contractId",
            AttributeType: "S",
          },
          ],
          KeySchema: [{
            AttributeName: "contractId",
            KeyType: "HASH"
          },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
        }
      },
      UsersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "UsersTable",
          AttributeDefinitions: [{
            AttributeName: "userId",
            AttributeType: "S",
          },
          ],
          KeySchema: [{
            AttributeName: "userId",
            KeyType: "HASH"
          },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  },
};

module.exports = serverlessConfiguration;
