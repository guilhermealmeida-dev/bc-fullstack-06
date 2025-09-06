import { Request, Response, NextFunction } from "express";

export function logError(error: any, request: Request, response: Response, next: NextFunction) {
    console.log("----------------------------------------------\n");
    console.log(error);
    console.log("----------------------------------------------\n");
    return next(error);
}

