import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

const validateRequestDto =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      res.status(400).json({ errors });
      return;
    }
    // Assign parsed data to req.body if validation succeeds
    req.body = result.data;
    // Call the next middleware or route handler
    next();
  };

export default validateRequestDto;
