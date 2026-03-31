sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], (Controller, MessageToast) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.Pending", {
    onInit() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("pendingApproval")
        .attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched() {
      this._applyPendingFilter();

      const oSideNav = this.getOwnerComponent()
        .getRootControl()
        .byId("sideNavigation");

      if (oSideNav) {
        oSideNav.setSelectedKey("pendingApproval");
      }
    }


    ,
    _applyPendingFilter() {
      const oTable = this.byId("pendingTable");
      const oBinding = oTable.getBinding("items");

      if (!oBinding) return;

      const oUserModel = this.getOwnerComponent().getModel("userModel");
      const sRole = oUserModel.getProperty("/role");
      const sEmpId = oUserModel.getProperty("/empId");

      let aFilters = [
        new sap.ui.model.Filter("status", "EQ", "Pending")
      ];

      // ✅ Apply empId filter ONLY for Employee
      if (sRole === "EMPLOYEE") {
        aFilters.push(
          new sap.ui.model.Filter("empId", "EQ", sEmpId)
        );
      }

      oBinding.filter(aFilters);
    },
    // ✅ Approve
    // onApprove(oEvent) {

    //   const oContext = oEvent.getSource().getBindingContext();
    //   const oData=oContext.getObject();
    //   const sId=oData.id;
    //   const sPath = `/Requests('${sId}')`;

    //   const oModel = this.getOwnerComponent().getModel();

    //   oModel.setProperty(sPath + "/status", "Approved");

    //   this._applyPendingFilter();
    //   MessageToast.show("Request Approved");


    // },

    // // ❌ Reject
    // onReject(oEvent) {
    //   const oContext = oEvent.getSource().getBindingContext("expenseModel");
    //   const oTable = this.byId("pendingTable");
    //   const sPath = oContext.getPath();

    //   const oModel = this.getOwnerComponent().getModel("expenseModel");
    //   console.log(sPath + "/status");
    //   oModel.setProperty(sPath + "/status", "Rejected");
    //   this._applyPendingFilter();
    //   MessageToast.show("Request Rejected");
    // },
    onApprove(oEvent) {
      this._openReasonDialog("Approve", oEvent);
    },
    onReject(oEvent) {
      this._openReasonDialog("Reject", oEvent);
    },
    _openReasonDialog(sAction, oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      this._sAction = sAction;
      this._oData = oContext.getObject();
      const sId = this._oData.id;
      this._sPath = `/Requests('${sId}')`; // OR use ID if you're using UUID

      const oReasonModel = new sap.ui.model.json.JSONModel({
        title: `${sAction} Request`,
        reason: ""
      });

      this.getView().setModel(oReasonModel, "reasonModel");

      if (!this._oReasonDialog) {
        this._oReasonDialog = sap.ui.xmlfragment(
          "com.expensemanagement.expensemanagement.fragments.ReasonDialog",
          this
        );
        this.getView().addDependent(this._oReasonDialog);
      }

      this._oReasonDialog.open();
    },
    onReasonSubmit() {
      const oModel = this.getOwnerComponent().getModel();
      const oData = this.getView().getModel("reasonModel").getData();

      // ✅ Validation
      if (!oData.reason || oData.reason.trim() === "") {
        sap.m.MessageToast.show("Reason is required");
        return;
      }

      // Get original object
      const oContext = this.getView().getBindingContext();



      // Prepare payload
      const oUpdateData = {
        ...this._oData,
        status: this._sAction === "Approve" ? "Approved" : "Rejected",
        reason: oData.reason
      };


      console.log(oUpdateData);
      oModel.update(this._sPath, oUpdateData, {
        success: () => {
          sap.m.MessageToast.show(`${this._sAction} successful`);
          this._oReasonDialog.close();
        },
        error: () => {
          sap.m.MessageToast.show("Action failed");
        }
      });
    },
    onReasonCancel() {
      this._oReasonDialog.close();
    }

  });
});