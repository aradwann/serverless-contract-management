import { dynamoDBClient } from '../models/database'
import ContractService from './contractService'
import AuthService from './authService'

const DDBClient = dynamoDBClient()
export const contractService = new ContractService(DDBClient);
export const authService = new AuthService(DDBClient);

