/*global QUnit*/

sap.ui.define([
    "com/expensemanagement/expensemanagement/controller/View1.controller"
], function (Controller) {
    "use strict";

    QUnit.module("View1 Controller");

  QUnit.test("Calculate counts for EMPLOYEE", function (assert) {
    const oController = new Controller();

    const mockData = [
        { status: "Draft" },
        { status: "Pending" },
        { status: "Approved" },
        { status: "Rejected" },
        { status: "Draft" }
    ];

    const result = oController._calculateCounts(mockData, "EMPLOYEE");

    assert.strictEqual(result.totalCount, 2, "Only Draft counted for employee");
    assert.strictEqual(result.pendingCount, 1, "Pending correct");
    assert.strictEqual(result.approvedCount, 1, "Approved correct");
    assert.strictEqual(result.rejectedCount, 1, "Rejected correct");
});
       
       
});