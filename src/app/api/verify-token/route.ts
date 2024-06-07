import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.TOKEN_SECRET || "your_jwt_secret";

interface JwtPayload {
  email: string;
  id: string;
  username: string;
  iat: number;
  exp: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
