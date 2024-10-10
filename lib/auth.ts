import bcrypt from "bcryptjs";

const JWT_SECRET = "jsonwebtoken"; // Must match your backend secret

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Number of salt rounds to use
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
