import mongoose from "mongoose";
import VendorExpenseModel from "../model/vendorExpense.model.js";

export class VendorExpenseServices {
  async addVendorExpense(req) {
    try {
      const { name, amount, note, vendorId } = req?.body;

      const addNew = await VendorExpenseModel({
        name: name,
        amount: amount,
        note: note,
        vendorId: new mongoose.Types.ObjectId(vendorId),
      });
      console.log("addNew ==========>", addNew);

      return await addNew.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllVendorExpense(req) {
    try {
      const result = await VendorExpenseModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendordata",
          },
        },
        {
          $unwind: "$vendordata",
        },
        {
          $project: {
            name: 1,
            amount: 1,
            note: 1,
            created_at: 1,
            "vendordata.name": 1,
          },
        },
      ]);
      console.log("result ============>", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
