sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.expensemanagement.expensemanagement.controller.View1", {
        onInit() {
              const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("dashboard").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched(){
             const oSideNav = this.getOwnerComponent()
    .getRootControl()
    .byId("sideNavigation");

  if (oSideNav) {
    oSideNav.setSelectedKey("dashboard");
  }
        }
        
    });
});