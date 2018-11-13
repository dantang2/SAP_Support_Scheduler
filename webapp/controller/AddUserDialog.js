sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (ManagedObject, JSONModel, MessageToast) {
	"use strict";

	return ManagedObject.extend("productSupport.scheduler.controller.AddUserDialog", {

		onInit: function () {
			/*var oModel = new sap.ui.model.json.JSONModel("http:"+"//services.odata.org/V3/northwind/northwind.svc/Customers?$format=json");

			sap.ui.getCore().setModel(oModel,"eng");

			var oModel_2 = new sap.ui.model.json.JSONModel("Engineers.json");
			sap.ui.getCore().setModel(oModel_2,"engineers");*/

		},

		constructor: function (oView) {
			this._oView = oView;
		},

		/*exit: function () {
			delete this._oView;
		},*/

		open: function () {
			var oView = this._oView;
			var oDialog = oView.byId("addUserDialog");

			//create dialog lazily
			if (!oDialog) {
				var oFragmentController = {
					onCloseDialog: function () {

						var oModel = new JSONModel();
						oModel.loadData("./Engineers.json");

						var oEngineers = oModel.getProperty("/Engineers");

						var oNewEngineer = {
							"EngineerName": "dan",
							"Team" : "admin",
							"email": "test@email"
						};


						oModel.setProperty("/Engineers",oNewEngineer);



						MessageToast.show("Engineer Added");

						oDialog.close();
					}
				};

				//create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "productSupport.scheduler.view.AddUserDialog", oFragmentController);
				//connect dialog to the root view of this component (models, lifecycle)
				oView.addDependent(oDialog);
			}
			oDialog.open();
		}

	});
});
