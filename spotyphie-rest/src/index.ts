import express, {Request, Response} from 'express';
import {config} from "./configs";
import {routes} from "./routes";
import init from "./helper/init";

const app = express();
const cors = require('cors')



app.use(cors());
app.use(express.json());

app.listen(config.PORT, () => {
  init();
  console.log(`Server berjalan pada http://localhost:${config.PORT} since ${config.time}`);
  
});

app.get('/', (req : Request, res : Response) => {
  res.send(`
  <h1 style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 144px">
    🔥 Welcome to spotyphie REST apiii🔥
  </h1>
 `);
});

app.use(routes);


