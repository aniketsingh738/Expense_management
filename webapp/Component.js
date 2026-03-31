sap.ui.define([
  "sap/ui/core/UIComponent",
   "sap/ui/model/odata/v2/ODataModel",
  "com/expensemanagement/expensemanagement/model/models"
], (UIComponent,ODataModel,models) => {
  "use strict";

  return UIComponent.extend("com.expensemanagement.expensemanagement.Component", {
    metadata: {
      manifest: "json",
      interfaces: [
        "sap.ui.core.IAsyncContentCreation"
      ]
    },

    init() {
    
     // ✅ 1. Start MockServer FIRST
      const MockServer = sap.ui.requireSync(
        "com/expensemanagement/expensemanagement/localService/mockserver"
      );
      MockServer.init();

      console.log("✅ MockServer initialized BEFORE model");

      // ✅ 2. Call base init
      UIComponent.prototype.init.apply(this, arguments);

      // ✅ 3. NOW create ODataModel (IMPORTANT)
      const oModel = new ODataModel("/mock/odata/", {
        defaultBindingMode: "TwoWay",
        useBatch: false
      });

      this.setModel(oModel);

      // device model
      this.setModel(models.createDeviceModel(), "device");
      const role=["FINANCE","EMPLOYEE","APPROVER"];
      // user model
      const oUserModel = this.getModel("userModel");
      oUserModel.setData({
        role: role[1],
        empId: "EMP001",
        name: "Aniket",
        isLoggedIn: true
      });

      this.getRouter().initialize();
    }
  });
});