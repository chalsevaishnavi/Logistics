import mongoose from "mongoose";
import QuoteModel from "../model/quotes.model.js";
import QuoteDetailsModel from "../model/quotesDetails.model.js";

export class QuotesServices {
  async addQuote(req) {
    try {
      const { customerId, date, remarks, status } = req?.body;

      const timestamp = Date.now(); // Current time in milliseconds
      const quotationNo = `GLQ${String(timestamp).slice(-4)}`;
      console.log("timestamp ========>", timestamp);
      console.log("quotationNo ========>", quotationNo);

      const addNew = await QuoteModel({
        customerId: new mongoose.Types.ObjectId(customerId),
        date: date,
        remarks: remarks,
        status: status,
        quotationNo: quotationNo,
      });
      console.log("addNew ==========>", addNew);

      return await addNew.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addQuoteDetails(req) {
    try {
      const {
        quoteId,
        from,
        to,
        description,
        size,
        weight,
        ETA,
        rate,
        advance,
      } = req?.body;

      const addNewDetails = await QuoteDetailsModel({
        quoteId: new mongoose.Types.ObjectId(quoteId),
        from: from,
        to: to,
        description: description,
        size: size,
        weight: weight,
        ETA: ETA,
        rate: rate,
        advance: advance,
      });
      console.log("addNewDetails ==========>", addNewDetails);

      return await addNewDetails.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllQuotes(req) {
    try {
      const result = await QuoteModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "customerId",
            foreignField: "_id",
            as: "customerdata",
          },
        },
        {
          $unwind: "$customerdata",
        },
        {
          $lookup: {
            from: "quotesdetails",
            localField: "_id",
            foreignField: "quoteId",
            as: "quotedata",
          },
        },
        {
          $unwind: "$quotedata",
        },
        {
          $project: {
            status: 1,
            quotationNo: 1,
            "customerdata.name": 1,
            "quotedata.from": 1,
            "quotedata.to": 1,
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
