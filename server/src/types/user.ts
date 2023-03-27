interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

interface GoogleUser {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export { User, GoogleUser };
