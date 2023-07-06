import { Document } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar: string;
}

interface StoredUser extends User {
  _id: string;
}

interface GoogleUser {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}

interface UserDocument extends Document, User {
  comparePassword: (password: string) => Promise<boolean>;
}

export { User, GoogleUser, StoredUser, UserDocument };
