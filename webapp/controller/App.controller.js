sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("productSupport.scheduler.controller.App", {
		onInit: function(){
			this.getView().getModel();
		},

		onOpenDialog: function () {
			this.getOwnerComponent().openAddEngineerDialog();
		},

		onOpenEditDialog: function () {
			this.getOwnerComponent().openEditEngineerDialog();
		},

		onOpenAppointmentDialog: function() {
			this.getOwnerComponent().openAddAppointmentDialog();
		},

		onTest: function(oEvent) {
			var team = sap.ui.getCore().byFieldGroupId("select")[0].getSelectedKey();
			sap.m.MessageToast.show(team);
		}

	});
});
