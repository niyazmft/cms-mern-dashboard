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

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000", "https://cms-mern-frontend.onrender.com"];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  optionsSuccessStatus: 200,
};

// Configure middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptions));

// Define routes
app.get("/", (request, response) => {
  response.json({ info: "You are connected to MongoDB database" });
});
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/products", productsRoutes);

// Set up the MongoDB connection
const PORT = process.env.MONGO_PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: "majority",
  })
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => console.error(`${error} did not connect`));

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

// Set up the PostgreSQL connection and routes
const postgresApp = express();
const postgresPort = process.env.PG_PORT || 9001;

// Middleware for PostgreSQL
postgresApp.use(cors(corsOptions));
postgresApp.use(express.json());
postgresApp.use(cors(corsOptions));

// Define routes for PostgreSQL
postgresApp.use("/pg/products", PgProductRoutes);
postgresApp.get("/", async (request, response) => {
  const dbName = await getCurrentDatabaseName();
  response.json({
    info: `Connected to PostgreSQL database: ${dbName}`,
  });
});

// Connect to PostgreSQL and log the connected database name
pgClient
  .connect()
  .then(() => {
    postgresApp.listen(postgresPort);
  })
  .catch((error) => console.error("Failed to connect to PostgreSQL:", error));
