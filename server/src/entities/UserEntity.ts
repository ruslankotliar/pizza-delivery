import { UserModel } from '../models/User';
import { UserDocument, User } from '../types';

interface UserEntityInterface {
  findUserById: (id: string) => Promise<UserDocument | null>;
  findUserByEmail: (email: string) => Promise<UserDocument | null>;
  createUser: (user: User) => Promise<UserDocument>;
}

export const userEntity: UserEntityInterface = {
  async findUserById(id) {
    const user = await UserModel.findById(id);
    return user;
  },

  async findUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  },

  async createUser(user) {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  },
};
