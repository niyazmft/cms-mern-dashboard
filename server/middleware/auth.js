export const verifyApiKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  const validApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ message: "Unauthorized: Invalid API Key" });
  }

  next();
};
