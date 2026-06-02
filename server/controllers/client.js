import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
import escapeRegExp from "../utils/escapeRegExp.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    let { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      try {
        if (typeof sort !== "string") return {};
        const sortParsed = JSON.parse(sort);
        if (typeof sortParsed !== "object" || sortParsed === null || Array.isArray(sortParsed)) return {};
        if (typeof sortParsed.field !== "string" || typeof sortParsed.sort !== "string") return {};

        const sortFormatted = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };
        return sortFormatted;
      } catch (e) {
        return {};
      }
    };

    const parsedPage = Math.max(1, parseInt(page));
    const parsedPageSize = Math.max(1, parseInt(pageSize));

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // Ensure search is a string to prevent NoSQL injection via object
    if (typeof search !== "string") {
      search = String(search);
    }
    const safeSearch = escapeRegExp(search);

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: safeSearch, $options: "i" } },
        { userId: { $regex: safeSearch, $options: "i" } },
      ],
    })
      .sort(sortFormatted)
      .skip((parsedPage - 1) * parsedPageSize)
      .limit(parsedPageSize);

    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: safeSearch, $options: "i" } },
        { userId: { $regex: safeSearch, $options: "i" } },
      ],
    });

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    // Optimize: offload grouping to MongoDB to avoid O(N) memory complexity
    const countryCounts = await User.aggregate([
      {
        $match: {
          country: { $nin: [null, ""] }
        }
      },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
    ]);

    if (!countryCounts || !countryCounts.length) {
      return res.status(404).json({ message: "No geographical data found" });
    }

    const mappedLocations = countryCounts.reduce((acc, { _id, count }) => {
      const countryISO3 = getCountryIso3(_id);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3] += count;
      return acc;
    }, {});
    const formattedLoaction = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formattedLoaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
