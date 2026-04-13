export const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  const validApiKey = process.env.API_KEY || 'super-secret-key';

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: "Access denied. Invalid or missing API key." });
  }

  next();
};
