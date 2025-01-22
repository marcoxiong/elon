import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateRequestDto = 
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      // Collect all errors into a structured array
      const errors = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      // Return a 400 response with error details
      res.status(400).json({ errors });
      return; // Stop execution here
    }
    // Assign parsed data to req.body if validation succeeds
    req.body = result.data;
    // Call the next middleware or route handler
    next();
  };
