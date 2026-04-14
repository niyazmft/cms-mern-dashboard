import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const pgUri = process.env.PG_URI;

const pool = pgUri 
  ? new Pool({ connectionString: pgUri })
  : null;

// Helper to handle unconfigured database
const checkPool = (res) => {
  if (!pool) {
    res.status(503).json({ message: "PostgreSQL database not configured" });
    return false;
  }
  return true;
};

// Get all products with associated stats
export const getProducts = async (req, res) => {
  if (!checkPool(res)) return;
  try {
    const products = await pool.query("SELECT * FROM products");
    res.status(200).json(products.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a product by its ID
export const getProductById = async (req, res) => {
  if (!checkPool(res)) return;
  try {
    const productId = req.params.productId;

    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);

    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  if (!checkPool(res)) return;
  try {
    const {
      name,
      price,
      description,
      category,
      rating,
      supply,
      created_at,
      updated_at,
      image_url,
    } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (name, price, description, category, rating, supply, created_at, updated_at, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        name,
        price,
        description,
        category,
        rating,
        supply,
        created_at,
        updated_at,
        image_url,
      ]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a product by its ID
export const deleteProduct = async (req, res) => {
  if (!checkPool(res)) return;
  try {
    const productId = req.params.productId;

    const deletedProduct = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId]
    );

    if (deletedProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a product by its ID
export const updateProduct = async (req, res) => {
  if (!checkPool(res)) return;
  try {
    const productId = req.params.productId;
    const newImageUrls = req.body.image_url;

    if (!newImageUrls || newImageUrls.length === 0) {
      return res.status(400).json({ message: "No new image URLs provided" });
    }

    const queryString = `UPDATE products SET image_url = array_cat(image_url, $2::text[]) WHERE id = $1 RETURNING *`;
    console.log("Actual query:", queryString);

    const updatedProduct = await pool.query(queryString, [
      productId,
      newImageUrls,
    ]);

    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update all product details
export const updateProducts = async (req, res) => {
  if (!checkPool(res)) return;
  try {
    const newImageUrls = req.body.image_url; // Assuming you're sending an array of URLs

    if (!newImageUrls || newImageUrls.length === 0) {
      return res.status(400).json({ message: "No new image URLs provided" });
    }

    const updatedProducts = await pool.query(
      "UPDATE products SET image_url = array_cat(image_url, $1::text[])",
      [newImageUrls]
    );

    if (updatedProducts.rowCount === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res
      .status(200)
      .json({ message: "Image URLs added to all products" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
