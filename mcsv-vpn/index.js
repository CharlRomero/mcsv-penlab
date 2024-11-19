import { PORT } from "./src/config/env.config.js";
import app from "./src/config/server.config.js";



app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running in port ${PORT}`)
);