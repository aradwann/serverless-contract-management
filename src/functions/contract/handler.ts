import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import { contractService } from '../../services/index'
import createContractSchema from "./schema";

export const getAllContracts = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const contracts = await contractService.getAllContracts();
  return formatJSONResponse({
    contracts
  })
})

const createContractHandler: ValidatedEventAPIGatewayProxyEvent<typeof createContractSchema> = async (event) => {
  try {
    const id = v4();
    const contract = await contractService.createContract({
      contractId: id,
      name: event.body.name,
      templateId: event.body.templateId,
      userId: event.body.userId
    })
    return formatJSONResponse({
      contract
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    })
  }
}

export const createContract = middyfy(createContractHandler);

export const getContract = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
    const contract = await contractService.getContract(id)
    return formatJSONResponse({
      contract, id
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    });
  }
})
