sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/expensemanagement/expensemanagement/utils/formatter"

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
        _onRouteMatched() {
    const oView = this.getView();

    // ✅ Get current UI state
    const oSelect = oView.byId("statusSelect"); // give ID in XML
    const sKey = oSelect ? oSelect.getSelectedKey() : "ALL";

    const oSearch = oView.byId("searchField");
    const sSearch = oSearch ? oSearch.getValue() : "";

    this._sSearch = sSearch;

    // ✅ Rebuild filters based on UI
    if (sKey === "ALL") {
        this._aFilters = [
            new Filter({
                filters: [
                    new Filter("status", FilterOperator.NE, "Draft"),
                    new Filter("status", FilterOperator.NE, "Pending")
                ],
                and: true
            })
        ];
    } else {
        this._aFilters = [
            new Filter("status", FilterOperator.EQ, sKey)
        ];
    }

    // ✅ Apply again
    this._applyFilters();

    // Side nav
    const oSideNav = this.getOwnerComponent()
        .getRootControl()
        .byId("sideNavigation");

    if (oSideNav) {
        oSideNav.setSelectedKey("requestStatus");
    }
},
        _applyStatusFilter() {
            const oTable = this.byId("statusTable");
            const oBinding = oTable.getBinding("items");

            if (!oBinding) return;

            const oUserModel = this.getOwnerComponent().getModel("userModel");
            const sRole = oUserModel.getProperty("/role");
            const sEmpId = oUserModel.getProperty("/empId");

            // ✅ Status filter: NOT Draft AND NOT Pending
            const oStatusFilter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("status", "NE", "Draft"),
                    new sap.ui.model.Filter("status", "NE", "Pending")
                ],
                and: true
            });

            // ✅ Final filters array
            let aFilters = [oStatusFilter];

            // ✅ Apply empId only for employee
            if (sRole === "EMPLOYEE") {
                aFilters.push(
                    new sap.ui.model.Filter("empId", "EQ", sEmpId)
                );
            }

            oBinding.filter(aFilters);
        },

        // 🔍 Search
        onSearch(oEvent) {
            this._sSearch = oEvent.getParameter("newValue");
            this._applyFilters();
        },

        // 🎯 Dropdown filter
        onFilterChange(oEvent) {
            const sKey = oEvent.getSource().getSelectedKey();

            if (sKey === "ALL") {
                this._aFilters = [
                    new Filter({
                        filters: [
                            new Filter("status", FilterOperator.NE, "Draft"),
                            new Filter("status", FilterOperator.NE, "Pending")
                        ],
                        and: true
                    })
                ];
            } else {
                this._aFilters = [
                    new Filter("status", FilterOperator.EQ, sKey)
                ];
            }

            this._applyFilters();
        },

        // 🔥 Combine search + filter
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

            oBinding.filter(aFinalFilters);
        }
        ,

        // 🚀 Navigation to Object Page
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