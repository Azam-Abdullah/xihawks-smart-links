import { config } from "dotenv";

if (process.env.NODE_ENV !== "production")  config();

import app from './src/app.js';


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Listening on port: ",port)
})