import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { PORT } from "./src/constants.js";


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("✅ server is running at port ", PORT);
    });
  })
  .catch((err) => {
    console.log("❌ connection failed to db ", err.message);
  });
