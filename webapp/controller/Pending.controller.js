sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
   "com/expensemanagement/expensemanagement/utils/formatter"
], (Controller, MessageToast,formatter) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.Pending", {
    formatter:formatter,
    onInit() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("pendingApproval")
        .attachPatternMatched(this._onRouteMatched, this);
    },

// on Route matched
    _onRouteMatched() {
      

      const oSideNav = this.getOwnerComponent()
        .getRootControl()
        .byId("sideNavigation");

      if (oSideNav) {
        oSideNav.setSelectedKey("pendingApproval");
      }
      this._applyPendingFilter();
    }


    ,

    // apply Pending Filters
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

      // Apply empId filter ONLY for Employee
      if (sRole === "EMPLOYEE") {
        aFilters.push(
          new sap.ui.model.Filter("empId", "EQ", sEmpId)
        );
      }

      oBinding.filter(aFilters);
    },
    
    // when approve is clicked
    onApprove(oEvent) {
      this._openReasonDialog("Approve", oEvent);
    },

    //when reject is clicked
    onReject(oEvent) {
      this._openReasonDialog("Reject", oEvent);
    },

    // open dialog to enter reason
    _openReasonDialog(sAction, oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      this._sAction = sAction;
      this._oData = oContext.getObject();
      const sId = this._oData.id;
      this._sPath = `/Requests('${sId}')`; 

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

    // when submit btn of dialog is clicked
    onReasonSubmit() {
      const oModel = this.getOwnerComponent().getModel();
      const oData = this.getView().getModel("reasonModel").getData();

      // Validation
      if (!oData.reason || oData.reason.trim() === "") {
        sap.m.MessageToast.show("Reason is required");
        return;
      }

      const oUpdateData = {
        ...this._oData,
        status: this._sAction === "Approve" ? "Approved" : "Rejected",
        reason: oData.reason
      };

      //update call
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

    // when cancel btn is clicked to close
    onReasonCancel() {
      this._oReasonDialog.close();
    }

  });
});