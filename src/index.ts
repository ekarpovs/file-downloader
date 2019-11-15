import dotenv from 'dotenv';

import * as express from './configuration/express.config';

// initialize configuration
dotenv.config();

const app = express.expressConfig();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

// start the Express server
const server = app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
    // tslint:disable-next-line:no-console
    console.log('  Press CTRL-C to stop\n');
} );

export default server;
