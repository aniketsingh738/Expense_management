/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["com/expensemanagement/expensemanagement/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
