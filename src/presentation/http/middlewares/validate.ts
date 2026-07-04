import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { DatosInvalidosError } from "@domain/errors/DatosInvalidosError";

export function validate(schema: ZodSchema, target: "body" | "query" = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const data = target === "body" ? req.body : req.query;
    const result = schema.safeParse(data);

    if (!result.success) {
      next(new DatosInvalidosError(result.error));
      return;
    }

    if (target === "body") {
      req.body = result.data;
    } else {
      req.parsedQuery = result.data as Record<string, unknown>;
    }

    next();
  };
}
