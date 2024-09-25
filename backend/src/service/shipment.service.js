import ShipmentModel from "../model/shipment.model.js";
import ShipmentVendorDetailsModel from "../model/shipmentVendorDetails.model.js";
import ShipmentPackageModel from "../model/packages.model.js";
import ShipmentInsuranceModel from "../model/insurance.model.js";
export class ShipmentServices {
  async addShipment(req) {
    try {
      const {
        date,
        deliveryDate,
        senderId,
        receiverId,
        deliveryAddress,
        package_contact_person_name,
        package_contact_person_phone,
        package_transaction_type,
        package_pickup_address,
        transport_driver_name,
        transport_driver_phone,
        transport_driver_vehicledetails,
        usernote,
        charge_transportation,
        charge_handling,
        charge_halting,
        charge_cartage,
        charge_over_weight,
        charge_insurance,
        charge_odc,
        charge_tax_percent,
        charge_advance_paid,
        discount,
        total_tax,
        total_amount,
        total_balance,
        remarks,
        bill_to,
        bill_to_id,
        vendorId,
        memoNumber,
        commission,
        cash,
        total,
        advance,
      } = req?.body;
      console.log("req.body==========>", req?.body);

      const addNew = await ShipmentModel({
        date: date,
        deliveryDate: deliveryDate,
        senderId: senderId,
        receiverId: receiverId,
        deliveryAddress: deliveryAddress,
        package_contact_person_name: package_contact_person_name,
        package_contact_person_phone: package_contact_person_phone,
        package_transaction_type: package_transaction_type,
        package_pickup_address: package_pickup_address,
        transport_driver_name: transport_driver_name,
        transport_driver_phone: transport_driver_phone,
        transport_driver_vehicledetails: transport_driver_vehicledetails,
        usernote: usernote,
        charge_transportation: charge_transportation,
        charge_handling: charge_handling,
        charge_halting: charge_halting,
        charge_cartage: charge_cartage,
        charge_over_weight: charge_over_weight,
        charge_insurance: charge_insurance,
        charge_odc: charge_odc,
        charge_tax_percent: charge_tax_percent,
        charge_advance_paid: charge_advance_paid,
        discount: discount,
        total_tax: total_tax,
        total_amount: total_amount,
        total_balance: total_balance,
        remarks: remarks,
        bill_to: bill_to,
        bill_to_id: senderId,
      });
      console.log("addNew ==========>", addNew);

      const shipmentVendorDetails = await ShipmentVendorDetailsModel({
        shipmentId: addNew._id,
        vendorId: vendorId,
        memoNumber: memoNumber,
        commission: commission,
        cash: cash,
        total: total,
        advance: advance,
      });

      console.log("shipmentVendorDetails ==========>", shipmentVendorDetails);
      await shipmentVendorDetails.save();

      const data = await ShipmentPackageModel.find({ shipmentId: addNew._id });
      console.log("data =====>", data);

      const data1 = await ShipmentInsuranceModel.find({
        shipmentId: addNew._id,
      });
      console.log("data1 ====>", data1);

      if (data.length === 0 && data1.length === 0) {
        await ShipmentPackageModel.updateMany(
          { shipmentId: null },
          { $set: { shipmentId: addNew._id } }
        );

        await ShipmentInsuranceModel.updateMany(
          { shipmentId: null },
          { $set: { shipmentId: addNew._id } }
        );
      }
      console.log("data =====>", data);
      await addNew.save();

      return addNew;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addShipmentPackages(req) {
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

  async addShipmentInsurance(req) {
    try {
      const { eway_bill, insurance_no, insurance_agent } = req?.body;
      console.log("req?.body =====>", req?.body);

      const addNew = await ShipmentInsuranceModel({
        eway_bill: eway_bill,
        insurance_no: insurance_no,
        insurance_agent: insurance_agent,
      });
      console.log("addNew ====>", addNew);

      return await addNew.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
