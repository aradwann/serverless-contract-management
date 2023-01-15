import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { authService } from '../../services'
import loginSchema from "./schema";


const registerHandler: ValidatedEventAPIGatewayProxyEvent<typeof loginSchema> = async (event) => {
  try {
    const res = await authService.register({
      username: event.body.username,
      password: event.body.password,
    })
    return formatJSONResponse({
      res
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    })
  }
}

export const register = middyfy(registerHandler);

const loginHandler: ValidatedEventAPIGatewayProxyEvent<typeof loginSchema> = async (event) => {
  try {
    const token = await authService.login({
      username: event.body.username,
      password: event.body.password,
    })
    return formatJSONResponse({
      token
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    })
  }
}

export const login = middyfy(loginHandler);


