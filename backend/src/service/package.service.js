import ShipmentPackageModel from "../model/packages.model.js";

export class ShipmentPackageServices {
  async addPackages(req) {
    try {
      const { description, invoiceNumber, size, weight, quantity, value } =
        req?.body;

      const addNew = await ShipmentPackageModel({
        description: description,
        invoiceNumber: invoiceNumber,
        size: size,
        weight: weight,
        quantity: quantity,
        value: value,
      });

      console.log("addNew =====>", addNew);

      return await addNew.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

 
}
