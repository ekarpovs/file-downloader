import { RequestHandler, Request, Response, NextFunction } from 'express';

export const one: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = `${process.env.STATIC_DIR}/${req.params.file}.zip`;
    return res.download(file);
  } catch ( error ) {
    return next(error);
  }
};
