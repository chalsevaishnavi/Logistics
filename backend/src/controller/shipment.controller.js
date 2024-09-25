import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { ShipmentServices } from "../service/shipment.service.js";

const shipmentservices = new ShipmentServices();

export class ShipmentController {
  async addShipment(req, res) {
    try {
      const result = await shipmentservices.addShipment(req);
      console.log("result ============>", result);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async addShipmentInsurance(req, res) {
    try {
      const result = await shipmentservices.addShipmentInsurance(req);
      console.log("result ============>", result);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async addShipmentPackages(req, res) {
    try {
      const result = await shipmentservices.addShipmentPackages(req);
      console.log("result===>", result);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
