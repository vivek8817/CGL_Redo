import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request to hold our user payload
export interface AuthRequest extends Request {
  user?: { id: string };
} 

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = decoded; // Attach the user ID to the request!
    next(); // Let them pass to the controller
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
