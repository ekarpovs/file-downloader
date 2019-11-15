import express, { Application, ErrorRequestHandler, Request, Response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import path from 'path';
import * as dwnlc from '../controllers/download.controller';

// import * as routes from '../routes';

export const expressConfig = (): Application => {

  const app = express();
  // Configure middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    // tslint:disable-next-line:no-console
    console.log('development');
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  // support parsing of application/json type post data
  app.use(bodyParser.json());
  // support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // set static path to serve static files
  app.use(express.static(path.join(__dirname, 'public')));

  // Configure routes
  app.route('/:file').get(dwnlc.one);

  app.get( '*', ( req: Request, res: Response ) => {
    res.status(404).send();
  } );

  // Configure CORS - Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // tslint:disable-next-line:no-console
    console.error(err);
    res.status(500).send(`Something broken!`);
  };

  app.use(errorHandler);

  return app;
};
