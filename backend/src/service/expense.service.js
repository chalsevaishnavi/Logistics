import ExpenseCategoryModel from "../model/expenseCaterory.model.js";
import ExpenseModel from "../model/expense.model.js";
import mongoose from "mongoose";

export class ExpenseServices {
  async addExpenseCategory(req) {
    try {
      const { expenseCategoryName, note, created_by } = req?.body;
      const addCategory = await ExpenseCategoryModel({
        name: expenseCategoryName,
        description: note,
        created_by: created_by,
      });
      console.log("addCategory =====>", addCategory);

      return await addCategory.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addExpense(req) {
    // console.log("expense category id ===>", req.params.id);

    try {
      const { category, name, note, date, amount, created_by } = req?.body;
      const addExpense = await ExpenseModel({
        name: name,
        note: note,
        date: date,
        amount: amount,
        expense_categoryId: category,
        created_by: created_by,
      });

      console.log("addExpense ====>", addExpense);
      return await addExpense.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllExpenses(req) {
    try {
      const result = await ExpenseModel.aggregate([
        {
          $match: {
            created_by: new mongoose.Types.ObjectId(req.params.id),
            deleted: false,
          },
        },
        {
          $lookup: {
            from: "expensecategories",
            localField: "expense_categoryId",
            foreignField: "_id",
            as: "expenseCategory",
          },
        },
        {
          $unwind: "$expenseCategory",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            note: 1,
            date: 1,
            amount: 1,
            "expenseCategory.name": 1,
          },
        },
      ]);
      console.log("result =============>", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllExpensesCategory(req) {
    try {
      const result = await ExpenseCategoryModel.find({
        created_by: req.params.id,
        deleted: false,
      });

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOneExpenseData(req) {
    try {
      const result = await ExpenseModel.findOne({
        _id: req.params.id,
        deleted: false,
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateExpenseData(req) {
    try {
      const result = await ExpenseModel.updateOne({
        _id: req.params.id,
      },{
        $set: {
          
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
