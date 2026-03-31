sap.ui.define([], () => {
	"use strict";

	return {
		statusText(sStatus) {
			switch (sStatus) {
				case "Approved":
					return "Success";   
				case "Rejected":
					return "Error";
				default:
					return "None";
			}
		}
	};
});