sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "com/expensemanagement/expensemanagement/utils/formatter"
], (Controller, Filter, FilterOperator, formatter) => {
  "use strict";

  return Controller.extend("com.expensemanagement.expensemanagement.controller.Finance", {
    formatter: formatter,
    onInit() {

      this._aFilters = [];
      this._sSearch = "";
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("viewRequest").attachPatternMatched(this._onRouteMatched, this);
      const oTable = this.byId("financeTable");

      oTable.attachEventOnce("updateFinished", () => {
        this._applyDefaultFilter();
      });
    }

    ,

    _onRouteMatched() {
      const oSideNav = this.getOwnerComponent()
        .getRootControl()
        .byId("sideNavigation");

      if (oSideNav) {
        oSideNav.setSelectedKey("viewRequest");
      }

    },


    _applyDefaultFilter: function () {
      const oTable = this.byId("financeTable");
      const oBinding = oTable.getBinding("items");

      const aFilters = [
        new Filter("status", FilterOperator.EQ, "Approved")
      ];

      oBinding.filter(aFilters);

    },

    onFilter: function () {
      const oTable = this.byId("financeTable");
      const oBinding = oTable.getBinding("items");

      const empId = this.byId("empIdInput").getValue();
      const amount = this.byId("amountInput").getValue();
      const oDateRange = this.byId("dateRange");

      const fromDate = oDateRange.getDateValue();
      const toDate = oDateRange.getSecondDateValue();

      let aFilters = [];

      // Always filter Approved
      aFilters.push(new Filter("status", FilterOperator.EQ, "Approved"));

      // Employee ID
      if (empId) {
        aFilters.push(new Filter("empId", FilterOperator.Contains, empId));
      }

      // Amount
      if (amount) {
        aFilters.push(new Filter("amount", FilterOperator.GE, parseFloat(amount)));
      }

      // Date Range (startDate)
      if (fromDate && toDate) {
        aFilters.push(new Filter({
          path: "startDate",
          operator: FilterOperator.BT,
          value1: this._formatDate(fromDate),
          value2: this._formatDate(toDate)
        }));
      }

      oBinding.filter(aFilters);
    },

    _formatDate: function (oDate) {
      const yyyy = oDate.getFullYear();
      const mm = String(oDate.getMonth() + 1).padStart(2, "0");
      const dd = String(oDate.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }

    ,
    onClearFilters() {
      const oView = this.getView();

      // 🔹 Clear inputs
      oView.byId("empIdInput").setValue("");
      oView.byId("amountInput").setValue("");
      oView.byId("dateRange").setDateValue(null);
      oView.byId("dateRange").setSecondDateValue(null);

      // 🔹 Reapply default filter (IMPORTANT)
      this._applyDefaultFilter();
    },

    onItemPress(oEvent) {
      const oContext = oEvent.getSource().getBindingContext();

      if (!oContext) return;

      const sPath = oContext.getPath(); // ✅ correct

      this.getOwnerComponent().getRouter().navTo("objectPage", {
        path: encodeURIComponent(sPath)
      });
    }

  });
});