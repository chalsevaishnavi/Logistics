import { HelperModules } from "../core/common/helper.modules.js";
import { generateToken } from "../core/common/auth.js";
import { commonResponse } from "../core/constant/enum.js";
import UserModel from "../model/user.model.js";

export class userServices extends HelperModules {
  async addUser(req) {
    try {
      console.log("req.body data =======>", req.body);

      const {
        email,
        password,
        name,
        companyname,
        gstno,
        phoneno,
        address,
        usernote,
        showrates,
        role,
        created_by,
      } = req?.body;
      const hashpassword = await this.encrypt(password);

      console.log("hashpassword =======>", hashpassword);

      const user = await UserModel({
        email: email,
        password: hashpassword,
        name: name,
        companyname: companyname,
        gstno: gstno,
        phoneno: phoneno,
        address: address,
        usernote: usernote,
        showrates: showrates,
        role: role,
        created_by: created_by,
      });
      console.log("user ========>", user);
      return await user.save();
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }

  async getAllUsers(req) {
    try {
      return await UserModel.find({
        created_by: req.params.id,
        deleted: false,
      });
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }

  async loginUser(req) {
    try {
      const { email, password } = req?.body;
      console.log("req?.body =====>", req?.body);

      const user = await UserModel.findOne({ email: email });
      console.log("user ===>", user);

      if (!user) {
        throw new Error(commonResponse.UserNotFound);
      }

      const isPasswordCorrect = await this.decrypt(password, user.password);
      console.log("isPasswordCorrect ===>", isPasswordCorrect);

      if (!isPasswordCorrect) {
        throw new Error(commonResponse.InvalidCredential);
      }

      const Token = await generateToken(user);
      console.log("token ==>", Token);

      return { user: user, token: Token };
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }

  async updateUser(req) {
    try {
      console.log("req.params.id ==>", req.params.id);

      const result = await UserModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            phoneno: req.body.phoneno,
            companyname: req.body.companyname,
            address: req.body.address,
          },
        }
      );
      return result;
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }

  async getUserDataById(req) {
    try {
      console.log("req.params.id ==>", req.params.id);
      const result = await UserModel.findById({ _id: req.params.id });
      console.log("result ==>", result);
      return result;
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }

  async deleteUser(req) {
    try {
      console.log("req.params.id ==>", req.params.id);
      const result = await UserModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: { deleted: true },
        }
      );
      console.log("result ==>", result);
      return result;
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }
}
