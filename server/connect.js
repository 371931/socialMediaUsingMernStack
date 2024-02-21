import { MongoClient } from "mongodb";
import env from "dotenv";

env.config();

const uri = process.env.URI;
const client = new MongoClient(uri);
let db;
export let notconnected;


try {
    await client.connect();
    db = client.db("socialMedia");
    console.log("Connected successfully to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application
}


export default db;