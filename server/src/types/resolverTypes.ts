/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface MyRequest extends Request {
  session: any;
}

interface MyContext {
  req: Request;
  res: Response;
  userId: string;
}

type RegisterArgs = {
  input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: string;
  };
};

type LoginArgs = {
  input: {
    email: string;
    password: string;
  };
};

type GoogleLoginArgs = {
  input: {
    token: string;
  };
};

type AuthResponse = {
  token: string;
};

type AvatarResponse = {
  avatar: string;
};

type UserDataResponse = {
  firstName: string;
  lastName: string;
  email: string;
};

interface AuthResolverInterface {
  register: (
    _: MyRequest,
    args: RegisterArgs,
    context: any
  ) => Promise<AuthResponse | undefined>;
  login: (
    _: MyRequest,
    args: LoginArgs,
    context: any
  ) => Promise<AuthResponse | undefined>;

  googleLogin: (
    _: MyRequest,
    args: GoogleLoginArgs,
    context: any
  ) => Promise<AuthResponse | undefined>;
}

interface UserResolverInterface {
  userAvatar: (
    _: any,
    __: any,
    context: MyContext
  ) => Promise<AvatarResponse | undefined>;
  userData: (
    _: any,
    __: any,
    context: MyContext
  ) => Promise<UserDataResponse | undefined>;
}

interface QueryInterface extends UserResolverInterface {}
interface MutationInterface extends AuthResolverInterface {}

type Resolvers = {
  Query: QueryInterface;
  Mutation: MutationInterface;
};

export type {
  Resolvers,
  MyRequest,
  MyContext,
  RegisterArgs,
  LoginArgs,
  AuthResponse,
  GoogleLoginArgs,
  AvatarResponse,
  AuthResolverInterface,
  UserResolverInterface,
};
