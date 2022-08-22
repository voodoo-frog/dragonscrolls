import bcrypt from "bcryptjs";

import User from "~/models/user";

import dbConnect from "~/lib/dbConnect";

export async function getUserById(id) {
  await dbConnect();

  return User.findById(id);
}

export async function getUserByEmail(email) {
  await dbConnect();

  return User.findOne({ email }).exec();
}

export async function getUserByDisplay(display) {
  await dbConnect();

  return User.findOne({ display }).exec();
}

export async function createUser(name, display, email, password) {
  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    name,
    display,
    email,
    password: hashedPassword,
  });
}

export async function deleteUserByEmail(email) {
  await dbConnect();

  return User.delete({ email });
}

export async function verifyLogin(email, password) {
  await dbConnect();

  const userWithPassword = await User.findOne({ email }).select("+password");

  console.log("userWithPassword", userWithPassword);

  console.log("email", email);
  console.log("password", password);

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password);

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  console.log("userWithoutPassword", userWithoutPassword);
  console.log("userWithPassword", userWithPassword);

  return userWithoutPassword;
}
