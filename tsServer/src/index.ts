import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import {GridComponent} from './models/grids/GridComponent';

const app =  express();
const port = 8080; // default port to listen
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// define a route handler for the default home page
app.get( '/', ( req: any, res: any ) => {
    res.send( 'Hello world!' );
} );

// start the Express server
app.listen( port, () => {
    const grid = new GridComponent();
    grid.generateGridTemplate();

    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
// tslint:disable-next-line: no-console
    console.log(grid);
} );

app.post( '/data', ( req: Request, res: Response ) => {
    app.post('/custom-data', )
    res.send( 'Hello world!' );
} );
