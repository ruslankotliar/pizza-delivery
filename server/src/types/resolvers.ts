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

type LoginResponse = {
  id: string;
};

type RegisterResponse = {
  id: string;
  avatar: string;
};

type Resolvers = {
  Query: {
    me: (_: any, __: any, context: any) => Promise<LoginResponse>;
  };
  Mutation: {
    register: (
      _: MyRequest,
      args: RegisterArgs,
      context: any
    ) => Promise<RegisterResponse>;
    login: (
      _: MyRequest,
      args: LoginArgs,
      context: any
    ) => Promise<LoginResponse>;

    googleLogin: (
      _: MyRequest,
      args: GoogleLoginArgs,
      context: any
    ) => Promise<LoginResponse>;
  };
};

export type {
  Resolvers,
  MyRequest,
  MyContext,
  RegisterArgs,
  LoginArgs,
  LoginResponse,
  RegisterResponse,
  GoogleLoginArgs,
};
