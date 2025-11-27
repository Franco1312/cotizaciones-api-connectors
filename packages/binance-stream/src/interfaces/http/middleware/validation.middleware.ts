import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError, ZodIssue } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: err.errors.map((e: ZodIssue) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(err as Error);
    }
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: err.errors.map((e: ZodIssue) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(err as Error);
    }
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.params);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: err.errors.map((e: ZodIssue) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(err as Error);
    }
  };
}
