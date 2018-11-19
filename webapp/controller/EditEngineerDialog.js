sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment'
], function (ManagedObject, JSONModel, MessageToast, Controller, Fragment) {
	"use strict";

	return Controller.extend("productSupport.scheduler.controller.EditEngineerDialog", {

		onInit: function () {
			/*var oModel = new sap.ui.model.json.JSONModel("http:"+"//services.odata.org/V3/northwind/northwind.svc/Customers?$format=json");

			sap.ui.getCore().setModel(oModel,"eng");

			var oModel_2 = new sap.ui.model.json.JSONModel("Engineers.json");
			sap.ui.getCore().setModel(oModel_2,"engineers");*/

			var oModel = new JSONModel(sap.ui.require.toUrl("productSupport.scheduler.Engineers"));
			this.getView().setModel(oModel);

		},


		/*exit: function () {
			delete this._oView;
		},*/

		open: function () {
			if (!this._oDialog){
				this._oDialog = sap.ui.xmlfragment("productSupport.scheduler.view.EditEngineerDialog", this);
				this._oDialog.setModel(sap.ui.getCore().byId("editEngineerDialog").getModel());
			}
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},

		onCloseDialog: function () {
			this._oDialog.close();
		},

		onEditEngineer: function (oEvent) {
			//var test = oEvent.getSource();
			var fname = sap.ui.getCore().byFieldGroupId("fname_input")[0].getValue();
			var lname = sap.ui.getCore().byFieldGroupId("lname_input")[0].getValue();
			var email = sap.ui.getCore().byFieldGroupId("email_input")[0].getValue();
			var team = sap.ui.getCore().byFieldGroupId("team_input")[0].getSelectedKey();
			//document.location.href="controller/editEngineer.php?fname="+fname+"&lname="+lname+"&email="+email+"&team="+team;
			MessageToast.show("do nothing");
      this._oDialog.close();
		}

	});
});
