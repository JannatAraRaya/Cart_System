const mongoose = require("mongoose");
const databaseConnection = async (callback: () => void): Promise<void> => {
    try {
        if (process.env.DATABAse_URL) {
            const client = await mongoose.connect(process.env.DATABASE_URL);
            if (client) {
                console.log("Great! Database is connected.");

                callback();
            }
            else {
                console.log("Database is not connected, Database URL is not provided.")
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export {databaseConnection}