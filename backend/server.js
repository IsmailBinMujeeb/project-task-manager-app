import app from "./index.js";
import connectDB from "./config/db.config.js";

;(
    async function () {

        await connectDB();
        app.listen(app.get('port'));
    }
)()