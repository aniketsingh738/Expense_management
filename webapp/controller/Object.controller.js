sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
   "com/expensemanagement/expensemanagement/utils/formatter",
    "sap/ui/core/routing/History"
], (Controller, MessageToast,formatter,History) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.Object", {
    formatter:formatter,
    onInit() {
  const oRouter = this.getOwnerComponent().getRouter();
  oRouter.getRoute("objectPage")
    .attachPatternMatched(this._onObjectMatched, this);
},

_onObjectMatched(oEvent) {
  const sPath = decodeURIComponent(oEvent.getParameter("arguments").path);

  this.getView().bindElement({
    path: sPath
  });
},

onNavBack() {
      const oHistory = History.getInstance();
      const sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        // ✅ Go back to previous page
        window.history.go(-1);
      } else {
        // ✅ Fallback (direct URL access case)
        this.getOwnerComponent().getRouter().navTo("requestStatus", {}, true);
      }
    }


  });
});