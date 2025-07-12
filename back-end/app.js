const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/routes");
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", routes)




const port = 3000;
const server = app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})