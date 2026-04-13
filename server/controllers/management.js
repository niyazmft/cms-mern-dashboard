import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
      {
        $lookup: {
          from: "transactions",
          localField: "affiliateStats.affiliateSales",
          foreignField: "_id",
          as: "saleTransactions",
        },
      },
    ]);

    const { saleTransactions, ...user } = userWithStats[0];

    res.status(200).json({ user, sales: saleTransactions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
