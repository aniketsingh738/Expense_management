sap.ui.define([
  "sap/ui/core/util/MockServer"
], function (MockServer) {
  "use strict";

  return {
    init: function () {


       // ABSOLUTE URL
    const sServiceUrl = "/mock/odata/";  

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

      MockServer.config({
        autoRespond: true,
        autoRespondAfter: 500
      });

      oMockServer.start();

      
    }
  };
});