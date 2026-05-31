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
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };

    const parsedPage = Math.max(1, parseInt(page));
    const parsedPageSize = Math.max(1, parseInt(pageSize));

    const sortFormatted = Boolean(sort) ? generateSort() : {};
    const safeSearch = escapeRegExp(search);

    const searchConditions = {
      $or: [
        { cost: { $regex: new RegExp(safeSearch, "i") } },
        { userId: { $regex: new RegExp(safeSearch, "i") } },
      ],
    };

    // ⚡ Bolt: Execute data fetch and count queries in parallel to halve response time
    const [transactions, total] = await Promise.all([
      Transaction.find(searchConditions)
        .sort(sortFormatted)
        .skip((parsedPage - 1) * parsedPageSize)
        .limit(parsedPageSize),
      Transaction.countDocuments(searchConditions)
    ]);

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    // ⚡ Bolt: Push grouping to the database instead of loading all users into Node.js memory
    // Reduces memory complexity from O(N) to O(C) where N=users and C=countries
    const groupedCountries = await User.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 }
        }
      }
    ]);

    const mappedLocations = groupedCountries.reduce((acc, { _id: country, count }) => {
      if (!country) return acc;
      const countryISO3 = getCountryIso3(country);
      if (!countryISO3) return acc;
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
