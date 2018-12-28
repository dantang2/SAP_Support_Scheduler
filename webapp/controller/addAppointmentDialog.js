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

			var oModel = new JSONModel(sap.ui.require.toUrl("productSupport.scheduler.Engineers"));
			this.getView().setModel(oModel);

		},

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
      var team = sap.ui.getCore().byFieldGroupId("team_input")[0].getSelectedKey();
      var startTime = sap.ui.getCore().byFieldGroupId("startTime")[0].getDateValue();
      var endTime = sap.ui.getCore().byFieldGroupId("endTime")[0].getDateValue();
      var startDate = new Date(sap.ui.getCore().byFieldGroupId("dateRange")[0].getDateValue());
      var endDate = new Date(sap.ui.getCore().byFieldGroupId("dateRange")[0].getSecondDateValue());



      var startYear = startDate.getFullYear();
      var startMonth = startDate.getUTCMonth();
      var startDay = startDate.getUTCDate();

      var endYear = endDate.getFullYear();
      var endMonth = endDate.getUTCMonth();
      var endDay = endDate.getUTCDate();

      var msPerDay = 86400000;
      var numOfDays = (endDate.getTime()-startDate.getTime())/msPerDay;



			  document.location.href="controller/addAppointment.php?eng_name="+eng_name
        +"&email="+email
        +"&task="+task
        +"&team="+team

        +"&startYear="+startDate.getFullYear()
        +"&startMonth="+startDate.getUTCMonth()
        +"&startDay="+startDate.getUTCDate()
        +"&startHour="+startTime.getHours()
        +"&startMinutes="+startTime.getMinutes()

        +"&endYear="+endDate.getFullYear()
        +"&endMonth="+endDate.getUTCMonth()
        +"&endDay="+endDate.getUTCDate()
        +"&endHour="+endTime.getHours()
        +"&endMinutes="+endTime.getMinutes()
        +"&numOfDays="+numOfDays;




		}

	});
});
