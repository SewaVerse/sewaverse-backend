import jwt from "jsonwebtoken";

export const generateToken = (payload: any) => {
  const secretKey = process.env.AUTH_SECRET as string;
  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};
