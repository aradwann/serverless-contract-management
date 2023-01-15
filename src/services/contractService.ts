import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Contract from "src/models/contract";

export default class ContractService {
  private TableName = "ContractsTable"

  constructor(private docClient: DocumentClient) { }

  async createContract(contract: Contract) {
    await this.docClient.put({
      TableName: this.TableName,
      Item: contract
    }).promise()

    return contract;
  }
  async getContract(id: string): Promise<Contract> {

    const contract = await this.docClient.get({
      TableName: this.TableName,
      Key: {
        contractId: id
      }
    }).promise()
    if (!contract.Item) {
      throw new Error("Id does not exit");
    }
    return contract.Item as Contract;

  }
  async getAllContractIds(): Promise<Contract[]> {
    const contracts = await this.docClient.scan({
      TableName: this.TableName,
      AttributesToGet: ['contractId']
    }).promise()

    return contracts.Items as Contract[]
  }

}
