sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "com/expensemanagement/expensemanagement/model/formatter",
  "sap/ui/core/routing/History"
], (Controller, MessageToast, formatter, History) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.Object", {
    formatter: formatter,
    onInit() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("objectPage")
        .attachPatternMatched(this._onObjectMatched, this);
    },

    // when route matched for object 
    _onObjectMatched(oEvent) {
      const sPath = decodeURIComponent(oEvent.getParameter("arguments").path);

      this.getView().bindElement({
        path: sPath
      });
    },

    // navigating back to parent
    onNavBack() {
      const oHistory = History.getInstance();
      const sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        
        window.history.go(-1);
      } else {
        
        const oRouter = this.getOwnerComponent().getRouter();
        const oUserModel = this.getOwnerComponent().getModel("userModel");
        const sRole = oUserModel.getProperty("/role");

        if (sRole === "FINANCE") {
            oRouter.navTo("viewRequest", {}, true);
        } else {
            oRouter.navTo("requestStatus", {}, true);
        }
      }
    }


  });
});