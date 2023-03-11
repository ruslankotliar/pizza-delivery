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

type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | undefined;
};

type Resolvers = {
  Query: {
    me: (_: any, __: any, context: any) => Promise<UserResponse>;
  };
  Mutation: {
    register: (
      _: MyRequest,
      args: RegisterArgs,
      context: any
    ) => Promise<UserResponse>;
    login: (
      _: any,
      args: { email: string; password: string },
      context: any
    ) => Promise<UserResponse>;
  };
};

export type { Resolvers, MyRequest, MyContext, RegisterArgs, UserResponse };
