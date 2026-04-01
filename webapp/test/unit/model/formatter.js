sap.ui.define([
	"com/expensemanagement/expensemanagement/model/formatter"
], function (formatter) {
	"use strict";

	QUnit.module("Formatter Test");
     QUnit.test("Should return correct status text", function (assert) {
        assert.strictEqual(formatter.statusText("Approved"), "Success", "Approved case works");
        assert.strictEqual(formatter.statusText("Rejected"), "Error", "Rejected case works");
        
        assert.strictEqual(formatter.statusText("XYZ"), "None", "Default case works");
    });

	
});
