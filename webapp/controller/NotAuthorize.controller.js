sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.expensemanagement.expensemanagement.controller.NotAuthorize", {

        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("dashboard");

        }

    });
});