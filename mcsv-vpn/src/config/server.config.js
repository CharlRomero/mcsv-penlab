import  express  from "express";
import cors from "cors"
import vpnRoutes from "../routes/index.routes.js"

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/mcsv", vpnRoutes)

export default app;