sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], (Controller, MessageToast, MessageBox) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.Draft", {
    onInit() {
      const oModel = this.getOwnerComponent().getModel();
      console.log("FULL MODEL DATA:", oModel.getData());
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("draftRequest").attachPatternMatched(this._onRouteMatched, this);
    }
    ,

    _onRouteMatched() {
     const oView = this.getView();
  const oTable = oView.byId("draftTable");

  const oUserModel = this.getOwnerComponent().getModel("userModel");
  const sEmpId = oUserModel.getProperty("/empId");
      console.log(sEmpId);
  const oBinding = oTable.getBinding("items");

  const aFilters = [
    new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.EQ, "Draft"),
    new sap.ui.model.Filter("empId", sap.ui.model.FilterOperator.EQ, sEmpId)
  ];

  oBinding.filter(aFilters);

  // Side nav selection (your existing code)
  const oSideNav = this.getOwnerComponent()
    .getRootControl()
    .byId("sideNavigation");

  if (oSideNav) {
    oSideNav.setSelectedKey("draftRequest");
  }
    }
    ,
    onEdit(oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      const oData = oContext.getObject();
      const sId=oData.id;
      // Store path (important for update)
      this._sEditPath = `/Requests('${sId}')`;;
      console.log(this._sEditPath);
      // Create edit model (clone data)
      const oEditModel = new sap.ui.model.json.JSONModel({ ...oData });
      this.getView().setModel(oEditModel, "editModel");

      // Load fragment (lazy loading)
      if (!this._oDialog) {
        this._oDialog = sap.ui.xmlfragment(
          "com.expensemanagement.expensemanagement.fragments.EditDialog",
          this
        );
        this.getView().addDependent(this._oDialog);
      }

      this._oDialog.open();
    },

    onDelete(oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
     const oData=oContext.getObject();
      const oModel = this.getOwnerComponent().getModel();

      const sId=oData.id;
      const sPath=`/Requests('${sId}')`;
      
      

      MessageBox.confirm(
        "Do you want to delete this request?",
        {
          title: "Confirm Deletion",
          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
          emphasizedAction: sap.m.MessageBox.Action.OK,

          onClose: (sAction) => {
            if (sAction === sap.m.MessageBox.Action.OK) {

              oModel.remove(sPath, {
                success: () => {
                  sap.m.MessageToast.show("Deleted successfully");
                },
                error: () => {
                  sap.m.MessageToast.show("Delete failed");
                }
              });

            }
          }
        }
      );


    },
    onSaveEdit() {
      const oModel = this.getOwnerComponent().getModel();
      const oEditData = this.getView().getModel("editModel").getData();
      if (!oEditData.travelType ||
        !oEditData.startDate ||
        !oEditData.endDate ||
        !oEditData.destination ||
        !oEditData.amount ||
        !oEditData.purpose) {

        MessageToast.show("All fields are required");
        return;
      }

      const startDate = new Date(oEditData.startDate);
      const endDate = new Date(oEditData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(startDate) || isNaN(endDate)) {
        MessageToast.show("Invalid date");
        return;
      }

      if (endDate < startDate) {
        MessageToast.show("End Date must be after Start Date");
        return;
      }

     

      const amount = parseFloat(oEditData.amount);

      if (isNaN(amount) || amount <= 0) {
        MessageToast.show("Enter valid amount");
        return;
      }

      // Update original data using stored path
      oModel.update(this._sEditPath, oEditData, {
        success: () => {
          sap.m.MessageToast.show("Updated successfully");

          this._oDialog.close();

        },
        error: (oError) => {
          let msg = "Update failed";

          try {
            const response = JSON.parse(oError.responseText);
            msg = response.error.message;
          } catch (e) { }

          MessageToast.show(msg);
        }
      });
      this._oDialog.close();
    },
    onCancelEdit() {
      this._oDialog.close();
    },

    onSubmit(oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      
      const oModel = this.getOwnerComponent().getModel();
     

      const oData = oContext.getObject();
      const sId=oData.id;
       const sPath = `/Requests('${sId}')`;

      // ✅ Prevent re-submit
      if (oData.status === "Pending") {
        sap.m.MessageToast.show("Already submitted");
        return;
      }

      // ✅ Optional validation before submit
      if (!oData.purpose || !oData.destination) {
        sap.m.MessageToast.show("Fill required fields before submitting");
        return;
      }

      // ✅ Update status
      const oUpdatedData = {
        ...oData,
        status: "Pending"
      };

      oModel.update(sPath, oUpdatedData, {
        success: () => {
          sap.m.MessageToast.show("Request submitted successfully");

          // Optional refresh
          oModel.updateBindings(true);
        },
        error: (oError) => {
          let msg = "Submit failed";

          try {
            const response = JSON.parse(oError.responseText);
            msg = response.error.message;
          } catch (e) { }

          sap.m.MessageToast.show(msg);
        }
      });
    }

  });
});