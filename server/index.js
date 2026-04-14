import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import pkg from "pg";

// Import MongoDB routes
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import productsRoutes from "./routes/product.js";

// Import PostgreSQL routes
import PgProductRoutes from "./routes/postgresRoutes/pgProduct.js";

// Load environment variables
dotenv.config();

// Create the Express application
const app = express();

// Configure middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the PostgreSQL client and connect to the database
const { Client } = pkg;
const pgClient = new Client(process.env.PG_URI);

// Function to get the current database name
const getCurrentDatabaseName = async () => {
  try {
    const result = await pgClient.query("SELECT current_database()");
    return result.rows[0].current_database;
  } catch (error) {
    console.error("Failed to get current database name:", error);
    return null;
  }
};

// Define routes
app.get("/", async (request, response) => {
  const dbName = await getCurrentDatabaseName();
  response.json({ info: `You are connected to MongoDB database and PostgreSQL database: ${dbName}` });
});
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/products", productsRoutes);

// Define routes for PostgreSQL
app.use("/pg/products", PgProductRoutes);


// Set up the MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: "majority",
  })
  .then(() => {
    console.log(`MongoDB connected`);
  })
  .catch((error) => console.log(`${error} did not connect`));


const { Client } = pkg;
const pgUri = process.env.PG_URI;

if (pgUri) {
  const pgClient = new Client(pgUri);

  // Function to get the current database name
  const getCurrentDatabaseName = async () => {
    try {
      const result = await pgClient.query("SELECT current_database()");
      return result.rows[0].current_database;
    } catch (error) {
      console.error("Failed to get current database name:", error);
      return null;
    }
  })
  .catch((error) => console.error("Failed to connect to PostgreSQL:", error));


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
