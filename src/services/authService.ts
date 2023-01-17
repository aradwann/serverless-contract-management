import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "../models/user";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { v4 } from "uuid";


export default class AuthService {
  private TableName = "UsersTable"

  // TODO: configure env secret
  private JWT_SECRET = "some-temporary-secret-for-dev-only";

  constructor(private docClient: DocumentClient) { }

  async register(username: string, password: string) {
    const user = await this.getUserWithUsername(username);

    if (user) {
      throw new Error('User with that username already exists')
    }

    const hash = bcrypt.hashSync(password, 10);
    const id = v4();
    const newUser: User = { userId: id, username: username, password: hash }
    await this.docClient.put({
      TableName: this.TableName,
      Item: newUser
    }).promise();
    console.log({ newUser })
    return id
  }

  async login(username: string, password: string) {
    const user = await this.getUserWithUsername(username);

    if (!user) {
      throw new Error('this user does not exsit');
    }
    return await this.comparePassword(password, user.password, user.userId)

  }

  authorize(token: string) {
    
    const { userId } = jwt.verify(token, this.JWT_SECRET) as jwt.JwtPayload
    if (!userId) {
      throw new Error("unauthorized")
    }
    return userId
  }


  // private async checkIfInputIsValid(eventBody: User) {
  //   if (
  //     !(eventBody.password &&
  //       eventBody.password.length >= 7)
  //   ) {
  //     return new Error('Password error. Password needs to be longer than 8 characters.')
  //   }

  //   if (
  //     !(eventBody.username &&
  //       eventBody.username.length > 5 &&
  //       typeof eventBody.username === 'string')
  //   ) new Error('Username error. Username needs to longer than 5 characters')


  //   return Promise.resolve();
  // }
  // async me(username: string) {
  //   return username
  // }


  // helpers 

  private async getUserWithUsername(username: string) {
    // TODO: optimize to use efficient query and avoid scan

    const res = await this.docClient.scan({
      TableName: this.TableName,
      FilterExpression: "#username = :user_name",
      ExpressionAttributeNames: {
        "#username": "username",
      },
      ExpressionAttributeValues: { ":user_name": `${username}` }
    }).promise();

    return res.Items[0] as User
  }

  private async comparePassword(eventPassword: string, userPassword: string, userId: string) {
    const isValid = await bcrypt.compare(eventPassword, userPassword)

    if (!isValid) throw new Error('The credentials do not match.')
    return this.signToken(userId)

  }

  private signToken(userId: string) {
    // TODO: configure env secret

    return jwt.sign({ userId }, this.JWT_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
  }

}
