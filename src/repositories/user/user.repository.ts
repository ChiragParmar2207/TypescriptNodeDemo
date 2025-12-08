import { UserDocument, UserModel } from '../../models/user/user.model';

export default class UserRepository {
  static async createUser(payload: any): Promise<UserDocument> {
    return await UserModel.create(payload);
  }

  static async getUser(filter: any): Promise<UserDocument> {
    return await UserModel.findOne(filter);
  }

  static async updateUser(filter: any, payload: any): Promise<UserDocument> {
    return await UserModel.findOneAndUpdate(filter, payload);
  }
}
