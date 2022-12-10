import app from "./app.js";
import envConfig from "./config/env.config.js";
import "./config/dbConnection.js";

app.listen(envConfig.PORT, () => {
  console.log(`App listening on PORT ${envConfig.PORT}`);
});
