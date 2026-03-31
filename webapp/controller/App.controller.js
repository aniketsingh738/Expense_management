sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.App", {

    onInit() {
      // Navigate to dashboard by default
     
      
    },

    onCollapseExpandPress() {
      const oSideNavigation = this.byId("sideNavigation"),
        bExpanded = oSideNavigation.getExpanded();

      oSideNavigation.setExpanded(!bExpanded);
    },

    onItemSelect(oEvent) {
      const sKey = oEvent.getParameter("item").getKey();
      console.log(sKey);
      // Navigate based on key
      this.getOwnerComponent().getRouter().navTo(sKey);
    },

    onAvatarPressed: function (oEvent) {
    const oView = this.getView();

    if (!this._oPopover) {
        this._oPopover = sap.ui.xmlfragment(
            oView.getId(),
            "com.expensemanagement.expensemanagement.fragments.ProfilePopup",
            this
        );

        oView.addDependent(this._oPopover);
    }

    this._oPopover.openBy(oEvent.getSource()); // 👈 opens near avatar
},
onClosePopover: function () {
    this._oPopover.close();
}
  });
});