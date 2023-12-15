export type User = {
  name: string;
  email?: string;
  id: string;
};

export type CreateUserDto = Omit<Required<User>, "id"> & {
  password: string;
};

export type LoginUserDto = {
  username_or_email: string;
  password: string;
};
