import { NextFunction, Request, Response } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401).json({ error: "No token provided." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403).json({ error: "Invalid token." });

    (req as any).user = user;
    next();
  });
};

export default jwtAuth;