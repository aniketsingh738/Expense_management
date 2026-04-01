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
		},
		formatDate(sDate) {
			if (!sDate) {
				return "";
			}

			
			const oDate = new Date(sDate);

			
			if (isNaN(oDate)) {
				return sDate;
			}

	
			const options = {
				day: "numeric",
				month: "long",
				year: "numeric"
			};

			
			return oDate.toLocaleDateString("en-GB", options);
		}
	};
});