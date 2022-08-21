import bcrypt from "bcryptjs";

import User from "~/models/user";

export async function getUserById(id) {
  return User.findById(id);
}

export async function getUserByEmail(email) {
  return User.findOne({ email });
}

export async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    email,
    password: hashedPassword,
  });
}

export async function deleteUserByEmail(email) {
  return User.delete({ email });
}

export async function verifyLogin(email, password) {
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

  return userWithoutPassword;
}
