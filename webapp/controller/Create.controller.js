sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.Create", {
    onInit() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("createReq").attachPatternMatched(this._onRouteMatched, this);
      const oUserModel = this.getOwnerComponent().getModel("userModel");
      const oNewRequest = {
        "empId": "",
        "travelType": "",
        "startDate": "",
        "endDate": "",
        "destination": "",
        "amount": "",
        "purpose": ""
      };
      const newModel = new JSONModel(oNewRequest);
      this.getView().setModel(newModel);
      // Set Employee ID automatically
      const empId = oUserModel.getProperty("/empId") || "EMP001";


      this.getView().getModel().setProperty("/empId", empId);
    },
    _onRouteMatched() {
      const oSideNav = this.getOwnerComponent()
        .getRootControl()
        .byId("sideNavigation");

      if (oSideNav) {
        oSideNav.setSelectedKey("createReq");
      }
    }
    ,
    onSubmit() {
      const oModel = this.getOwnerComponent().getModel();

      const oViewModel = this.getView().getModel();

      const oNewRequest = oViewModel.getData();
      console.log(oNewRequest);
      // Validation
      if (!oNewRequest.travelType ||
        !oNewRequest.startDate ||
        !oNewRequest.endDate ||
        !oNewRequest.destination ||
        !oNewRequest.amount ||
        !oNewRequest.purpose) {

        MessageToast.show("Please fill all mandatory fields");
        return;
      }

      const startDate = new Date(oNewRequest.startDate);
      const endDate = new Date(oNewRequest.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Invalid date check
      if (isNaN(startDate) || isNaN(endDate)) {
        MessageToast.show("Please enter valid dates");
        return;
      }

      // End date > start date
      if (endDate < startDate) {
        MessageToast.show("End Date must be after Start Date");
        return;
      }

      

      const amount = parseFloat(oNewRequest.amount);

      if (isNaN(amount) || amount <= 0) {
        MessageToast.show("Enter a valid amount greater than 0");
        return;
      }


      // Add status
      oNewRequest.status = "Draft";
      oNewRequest.id = crypto.randomUUID();

      // // Push into requests array
      // const aRequests = oExpenseModel.getProperty("/data/requests");

      // aRequests.push({ ...oNewRequest });

      // oExpenseModel.setProperty("/requests", aRequests);

      // // ✅ Reset form (correct way)
      // oViewModel.setData({
      //     empId: oNewRequest.empId,
      //     travelType: "",
      //     startDate: "",
      //     endDate: "",
      //     destination: "",
      //     amount: "",
      //     purpose: ""
      // });

      // MessageToast.show("Request Created Successfully!");

      // ✅ CREATE (MockServer call)
      oModel.create("/Requests", oNewRequest, {
        success: () => {
          sap.m.MessageToast.show("Request Created Successfully!");
          // refresh UI bindings
          oModel.updateBindings(true);
          // ✅ Reset form
          oViewModel.setData({
            empId: oNewRequest.empId,
            travelType: "",
            startDate: "",
            endDate: "",
            destination: "",
            amount: "",
            purpose: ""
          });
        },
        error: (oError) => {
          let msg = "Create failed";

          try {
            const response = JSON.parse(oError.responseText);
            msg = response.error.message;
          } catch (e) { }

          MessageToast.show(msg);
        }
      });
    }
  });
});