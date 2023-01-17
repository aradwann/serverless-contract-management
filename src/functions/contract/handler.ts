import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import { contractService, authService } from '../../services/index'
import createContractSchema from "./schema";

export const getAllContractIds = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  auth(event)

  const contracts = await contractService.getAllContractIds();
  return formatJSONResponse({
    contracts
  })
})

const createContractHandler: ValidatedEventAPIGatewayProxyEvent<typeof createContractSchema> = async (event) => {
  try {

    const userId = auth(event)

    const id = v4();
    await contractService.createContract({
      contractId: id,
      name: event.body.name,
      templateId: event.body.templateId,
      userId: userId
    })
    return formatJSONResponse({
      contractId: id
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e.message
    })
  }
}

export const createContract = middyfy(createContractHandler);

export const getContract = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {


  try {
    auth(event)

    const id = event.pathParameters.id;
    const contract = await contractService.getContract(id)
    return formatJSONResponse({
      ...contract
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e.message
    });
  }
})

function auth(event) {
  const authHeader = event.headers.Authorization
  if (!authHeader) {
    throw new Error("there is no auth head specified")
  }
  const token = authHeader.split(' ')[1]
  const userId = authService.authorize(token)

  return userId
}