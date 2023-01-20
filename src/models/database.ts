import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export function dynamoDBClient(): DocumentClient {
  if (process.env.IS_OFFLINE) {
    const docClient = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:5000',
      accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
      secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    })
    return docClient;
  }
  if (process.env.MOCK_DYNAMODB_ENDPOINT) {
    console.log("------------------------TEST DB will be created -------------------")
    const docClient = new AWS.DynamoDB.DocumentClient({
      accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
      secretAccessKey: 'DEFAULT_SECRET', // needed if you don't have aws credentials at all in env
      endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
      sslEnabled: false,
      region: 'localhost',
    })
    return docClient;
  }
  return new AWS.DynamoDB.DocumentClient();
}
