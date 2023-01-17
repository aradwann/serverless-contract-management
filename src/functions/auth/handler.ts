import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { authService } from '../../services'
import loginSchema from "./schema";


const registerHandler: ValidatedEventAPIGatewayProxyEvent<typeof loginSchema> = async (event) => {
  try {
    const userId = await authService.register(event.body.username, event.body.password)
    return formatJSONResponse({
      userId
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e.message
    })
  }
}

export const register = middyfy(registerHandler);

const loginHandler: ValidatedEventAPIGatewayProxyEvent<typeof loginSchema> = async (event) => {
  try {
    const token = await authService.login(event.body.username, event.body.password)
    return formatJSONResponse({
      token
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e.message
    })
  }
}

export const login = middyfy(loginHandler);


// export const authorize = (event: APIGatewayProxyEvent) => {
//   const token = event.headers.Authorization.split(' ')[1]
//   console.log({ token })


//   let response = {
//     "isAuthorized": false,
//   };

//   if (token === "secretToken") {
//     console.log('allowed')
//     response = {
//       "isAuthorized": true,
//     };
//   }

//   return response
// };

export const authorize = function (event: APIGatewayProxyEvent) {
  const token = event.headers.Authorization.split(' ')[1]
  if (token == "secretToken") {
    console.log("allowed");
    return {
      "principalId": "abcdef", // The principal user identification associated with the token sent by the client.
      "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [{
          "Action": "execute-api:Invoke",
          "Effect": "Allow",
          "Resource": "*"
        }]
      },
      "context": {
        "stringKey": "value",
        "numberKey": 1,
        "booleanKey": true,
        "arrayKey": ["value1", "value2"],
        "mapKey": { "value1": "value2" }
      }
    };
  }
  else {
    console.log("denied");
    return {
      "principalId": "abcdef", // The principal user identification associated with the token sent by the client.
      "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [{
          "Action": "execute-api:Invoke",
          "Effect": "Deny",
          "Resource": "*"
        }]
      },
      "context": {
        "stringKey": "value",
        "numberKey": 1,
        "booleanKey": true,
        "arrayKey": ["value1", "value2"],
        "mapKey": { "value1": "value2" }
      }
    };
  }
};

