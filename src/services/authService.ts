import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "../models/user";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


export default class AuthService {
  private TableName = "UsersTable"

  constructor(private docClient: DocumentClient) { }

  async register(eventBody: User) {
    const res = await this.docClient.get({ TableName: this.TableName, Key: { username: eventBody.username } }).promise();
    if (res.Item) {
      throw new Error('User with that username already exists')
    }
    const hash = await bcrypt.hash(eventBody.password, 8);
    const newUser = await this.docClient.put({
      TableName: this.TableName,
      Item: { username: eventBody.username, password: hash }
    }).promise();
    return newUser.Attributes
  }

  async login(eventBody: User) {
    const res = await this.docClient.get({ TableName: this.TableName, Key: { username: eventBody.username } }).promise();
    if (!res.Item) {
      throw new Error('this user does not exsit');
    }

    const user = res.Item as User
    return await this.comparePassword(eventBody.password, user.password, user.username)
  }

  private async comparePassword(eventPassword: string, userPassword: string, username: string) {
    return bcrypt.compare(eventPassword, userPassword)
      .then(passwordIsValid =>
        !passwordIsValid
          ? Promise.reject(new Error('The credentials do not match.'))
          : this.signToken(username)
      );
  }

  private async signToken(username: string) {
    return jwt.sign({ username: username }, process.env.JWT_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
  }

  private async checkIfInputIsValid(eventBody: User) {
    if (
      !(eventBody.password &&
        eventBody.password.length >= 7)
    ) {
      return new Error('Password error. Password needs to be longer than 8 characters.')
    }

    if (
      !(eventBody.username &&
        eventBody.username.length > 5 &&
        typeof eventBody.username === 'string')
    ) new Error('Username error. Username needs to longer than 5 characters')


    return Promise.resolve();
  }
  async me(username: string) {
    return username
  }
}
