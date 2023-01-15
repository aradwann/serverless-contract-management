import { dynamoDBClient } from '../models/database'
import ContractService from './contractService'

export const contractService = new ContractService(dynamoDBClient());

