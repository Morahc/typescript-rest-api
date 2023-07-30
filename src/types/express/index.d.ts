import express from 'express';
import session from 'express-session';
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user: Types.ObjectId;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    user?: Record<string, any>;
  }
}