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

    const query = {
      $or: [
        { cost: { $regex: new RegExp(safeSearch, "i") } },
        { userId: { $regex: new RegExp(safeSearch, "i") } },
      ],
    };

    // Optimize: parallelize find and countDocuments queries using Promise.all
    const [transactions, total] = await Promise.all([
      Transaction.find(query).sort(sortFormatted).skip((parsedPage - 1) * parsedPageSize).limit(parsedPageSize),
      Transaction.countDocuments(query)
    ]);

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
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
