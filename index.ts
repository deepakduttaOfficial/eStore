import app from "./app";
import envConfig from "./src/config/env.config";
import "./src/config/db.config";

const PORT = envConfig.PORT;
app.listen(PORT, () => {
  console.log(`APP RUNNING AT PORT ${PORT}`);
});
