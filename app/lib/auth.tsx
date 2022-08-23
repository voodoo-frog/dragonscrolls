import bcrypt from "bcryptjs";

import User from "~/models/user";

import dbConnect from "~/lib/dbConnect";

export async function getUserById(id: string) {
  await dbConnect();

  return User.findById(id);
}

export async function getUserByEmail(email: string) {
  await dbConnect();

  return User.findOne({ email }).exec();
}

export async function getUserByDisplay(display: string) {
  await dbConnect();

  return User.findOne({ display }).exec();
}

export async function createUser(
  name: string,
  display: string,
  email: string,
  password: string
) {
  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    name,
    display,
    email,
    password: hashedPassword,
  });
}

export async function deleteUserByEmail(email: string) {
  await dbConnect();

  return User.deleteOne({ email });
}

export async function verifyLogin(email: string, password: string) {
  await dbConnect();

  const userWithPassword = await User.findOne({ email }).select("+password");

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password);

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
