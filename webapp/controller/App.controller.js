sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("productSupport.scheduler.controller.App", {
		onOpenDialog: function () {
			this.getOwnerComponent().openAddEngineerDialog();
		},

		onOpenEditDialog: function () {
			this.getOwnerComponent().openEditEngineerDialog();
		},

		onOpenAppointmentDialog: function() {
			this.getOwnerComponent().openAddAppointmentDialog();
		}



	});
});
