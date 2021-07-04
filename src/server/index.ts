import express, { Request, Response, Router, Express } from "express";
import { RequestHandler } from "express-serve-static-core";

// call express
const app: Express = express(); // define our app using express

// configure app to use bodyParser for
// Getting data from body of requests
app.use(express.urlencoded({ extended: true }) as RequestHandler);

app.use(express.json() as RequestHandler);

const port: number = Number(process.env.PORT) || 8050; // set our port

// Send index.html on root request
app.use(express.static("dist"));
app.get("/", (req: Request, res: Response) => {
  res.sendFile("/dist/index.html");
});

// REGISTER ROUTES
// all of the routes will be prefixed with /api
/* const routes: Router[] = Object.values(router);
app.use('/api', routes); */
// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Listening on ${port}`);
