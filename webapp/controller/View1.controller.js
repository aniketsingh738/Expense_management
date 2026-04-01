sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.View1", {
    onInit() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("dashboard").attachPatternMatched(this._onRouteMatched, this);

      // model for tile counts
      const oViewModel = new sap.ui.model.json.JSONModel({
        totalCount: 0,
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0
      });

      this.getView().setModel(oViewModel);
    },

    // on route matched
    _onRouteMatched() {
      const oSideNav = this.getOwnerComponent()
        .getRootControl()
        .byId("sideNavigation");

      if (oSideNav) {
        oSideNav.setSelectedKey("dashboard");
      }

      this._loadDashboardData();
    },

    // calculate counts
    _calculateCounts: function (aRequests, sRole) {

      let counts = {
        totalCount: 0,
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0
      };

      //role based total req count
      if (sRole === "EMPLOYEE") {
        counts.totalCount = aRequests.filter(r => r.status === "Draft").length;
      } else {
        counts.totalCount = aRequests.filter(r => r.status !== "Draft").length;
      }

      //Pending , Approved and Rejected counts
      aRequests.forEach((req) => {
        switch (req.status) {
          case "Pending":
            counts.pendingCount++;
            break;
          case "Approved":
            counts.approvedCount++;
            break;
          case "Rejected":
            counts.rejectedCount++;
            break;
        }
      });

      return counts; 
    },

    //loading expense data and filling the values
    _loadDashboardData: function () {
      const oModel = this.getOwnerComponent().getModel();
      const oUserModel = this.getView().getModel("userModel");

      const sRole = oUserModel.getProperty("/role");
      const sEmpId = oUserModel.getProperty("/empId");

      let aFilters = [];

      if (sRole === "EMPLOYEE") {
        aFilters.push(
          new sap.ui.model.Filter("empId", sap.ui.model.FilterOperator.EQ, sEmpId)
        );
      }

      oModel.read("/Requests", {
        filters: aFilters,

        success: (oData) => {
          const aRequests = oData.results;

          
          const counts = this._calculateCounts(aRequests, sRole);

          this.getView().getModel().setData(counts);
        },

        error: (err) => {
          console.error("Error loading data", err);
        }
      });
    }
  });
});