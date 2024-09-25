import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { VendorExpenseServices } from "../service/vendorExpense.service.js";

const vendorexpense = new VendorExpenseServices();

export class VendorExpenseController {
  async addVendorExpense(req, res) {
    try {
      const result = await vendorexpense.addVendorExpense(req);
      console.log("result ===========>", result);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllVendorExpense(req, res) {
    try {
      const result = await vendorexpense.getAllVendorExpense(req);
      console.log("result ===========>", result);

      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
