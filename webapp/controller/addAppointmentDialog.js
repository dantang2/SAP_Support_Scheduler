sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment'
], function (ManagedObject, JSONModel, MessageToast, Controller, Fragment) {
	"use strict";

	return Controller.extend("productSupport.scheduler.controller.AddAppointmentDialog", {

		onInit: function () {
			/*var oModel = new sap.ui.model.json.JSONModel("http:"+"//services.odata.org/V3/northwind/northwind.svc/Customers?$format=json");

			sap.ui.getCore().setModel(oModel,"eng");

			var oModel_2 = new sap.ui.model.json.JSONModel("Appointments.json");
			sap.ui.getCore().setModel(oModel_2,"Appointments");*/

			var oModel = new JSONModel(sap.ui.require.toUrl("productSupport.scheduler.Engineers"));
			this.getView().setModel(oModel);

		},


		/*exit: function () {
			delete this._oView;
		},*/

		open: function () {
			if (!this._oDialog){
				this._oDialog = sap.ui.xmlfragment("productSupport.scheduler.view.AddAppointmentDialog", this);
				this._oDialog.setModel(sap.ui.getCore().byId("addAppointmentDialog").getModel());
			}
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},

		onCloseDialog: function () {
			this._oDialog.close();
		},

		onAddAppointment: function (oEvent) {
			//var test = oEvent.getSource();
			var eng_name = sap.ui.getCore().byFieldGroupId("engineer_input")[0].getValue();
			var email = sap.ui.getCore().byFieldGroupId("email_input")[0].getValue();
			var task = sap.ui.getCore().byFieldGroupId("task_input")[0].getSelectedKey();
      var startTime = sap.ui.getCore().byFieldGroupId("startTime")[0].getValue();
      var endTime = sap.ui.getCore().byFieldGroupId("endTime")[0].getValue();
      var dateRange = sap.ui.getCore().byFieldGroupId("dateRange")[0].getValue();

      
			//document.location.href="controller/addAppointment.php?fname="+fname+"&lname="+lname+"&email="+email+"&team="+team;
			MessageToast.show(dateRange);
		}

	});
});
