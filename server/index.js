import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// Import MongoDB routes
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import productsRoutes from "./routes/product.js";

// Import PostgreSQL routes
import PgProductRoutes from "./routes/postgresRoutes/pgProduct.js";

// Import data models
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";

// Import data
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

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
app.use(cors());

// Define routes
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
    console.log(`MongoDB connected and Server Port: ${PORT}`);

    // Insert initial data if needed
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser)
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => console.log(`${error} did not connect`));

// Set up the PostgreSQL connection and routes
const postgresApp = express();
const postgresPort = process.env.POSTGRES_PORT || 3000;

// Middleware for parsing JSON
postgresApp.use(express.json());

// Define routes for PostgreSQL
postgresApp.use("/pg/products", PgProductRoutes);

// Listen on the designated port for PostgreSQL
postgresApp.listen(postgresPort, () => {
  console.log(`PostgreSQL Server is running on port ${postgresPort}`);
});
