sap.ui.define([
  "sap/ui/core/util/MockServer"
], function (MockServer) {
  "use strict";

  return {
    init: function () {


       // ✅ ABSOLUTE URL (CRITICAL FIX)
    const sServiceUrl = "/mock/odata/";  // ✅ CHANGE THIS

const oMockServer = new MockServer({
  rootUri: sServiceUrl
});
      const sRootPath = sap.ui.require.toUrl(
  "com/expensemanagement/expensemanagement/localService"
);

oMockServer.simulate(sRootPath + "/metadata.xml", {
  sMockdataBaseUrl: sRootPath + "/mockdata",
  bGenerateMissingMockData: true
});

      // ✅ FORCE intercept
      MockServer.config({
        autoRespond: true,
        autoRespondAfter: 500
      });

      oMockServer.start();

      console.log("✅ MockServer started with root:", "/odata/service/");
    }
  };
});