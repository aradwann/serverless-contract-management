import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { authService } from '../../services'
import loginSchema from "./schema";


const registerHandler: ValidatedEventAPIGatewayProxyEvent<typeof loginSchema> = async (event) => {
  try {
    const res = await authService.register(event.body.username, event.body.password)
    return formatJSONResponse({
      res
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


