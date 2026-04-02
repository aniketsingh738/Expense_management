sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/expensemanagement/expensemanagement/model/formatter"

], (Controller, Filter, FilterOperator, formatter) => {
    "use strict";

    return Controller.extend("com.expensemanagement.expensemanagement.controller.List", {
        formatter: formatter,
        onInit() {
            this._aFilters = [];
            this._sSearch = "";
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("requestStatus").attachPatternMatched(this._onRouteMatched, this);

        },

        // route matched fn
        _onRouteMatched() {

            //authorization check
            const sRole = this.getOwnerComponent()
                .getModel("userModel")
                .getProperty("/role");
            if (sRole === "FINANCE") {
                this.getOwnerComponent().getRouter().navTo("notAuthorized");
            }
            const oView = this.getView();

            const oSelect = oView.byId("statusSelect");
            const sKey = oSelect ? oSelect.getSelectedKey() : "ALL";

            const oSearch = oView.byId("searchField");
            const sSearch = oSearch ? oSearch.getValue() : "";

            this._sSearch = sSearch;

            // base filters
            this._aFilters = this._buildBaseFilters(sKey);

            this._applyFilters();

            // Side nav
            const oSideNav = this.getOwnerComponent()
                .getRootControl()
                .byId("sideNavigation");

            if (oSideNav) {
                oSideNav.setSelectedKey("requestStatus");
            }
        }
        ,
        // base filters
        _buildBaseFilters: function (sKey) {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            const sRole = oUserModel.getProperty("/role");
            const sEmpId = oUserModel.getProperty("/empId");

            let aFilters = [];

            // Status filter
            if (sKey === "ALL") {
                aFilters.push(
                    new Filter({
                        filters: [
                            new Filter("status", FilterOperator.NE, "Draft"),
                            new Filter("status", FilterOperator.NE, "Pending")
                        ],
                        and: true
                    })
                );
            } else {
                aFilters.push(new Filter("status", FilterOperator.EQ, sKey));
            }

            // Role filter
            if (sRole === "EMPLOYEE") {
                aFilters.push(new Filter("empId", FilterOperator.EQ, sEmpId));
            }

            return aFilters;
        },

        // Search
        onSearch(oEvent) {
            this._sSearch = oEvent.getParameter("newValue");
            this._applyFilters();
        },

        // Dropdown filter
        onFilterChange(oEvent) {
            const sKey = oEvent.getSource().getSelectedKey();


            this._aFilters = this._buildBaseFilters(sKey);

            this._applyFilters();
        },

        // Combine search + filter
        _applyFilters() {
            const oTable = this.byId("statusTable");
            const oBinding = oTable.getBinding("items");

            let aFinalFilters = [];

            // Status filter
            if (this._aFilters.length) {
                aFinalFilters = aFinalFilters.concat(this._aFilters);
            }

            // Search filter
            if (this._sSearch) {
                const oSearchFilter = new Filter({
                    filters: [
                        new Filter("destination", FilterOperator.Contains, this._sSearch),
                        new Filter("purpose", FilterOperator.Contains, this._sSearch)
                    ],
                    and: false
                });

                aFinalFilters.push(oSearchFilter);
            }

            oTable.setBusy(true);


            oBinding.attachEventOnce("dataReceived", () => {
                oTable.setBusy(false);
            });
            oBinding.filter(aFinalFilters);
        }
        ,

        //  Navigation to Object Page
        onItemPress(oEvent) {
            const oContext = oEvent.getSource().getBindingContext();

            if (!oContext) return;

            const sPath = oContext.getPath();

            this.getOwnerComponent().getRouter().navTo("objectPage", {
                path: encodeURIComponent(sPath)
            });
        }


    });
});