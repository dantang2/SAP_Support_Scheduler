sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("productSupport.scheduler.controller.App", {
		onShowHello: function () {
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/thisEngineer/fname");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]); //Resource bundle values can contain parameters like {0}, {1}, {2}, (i18n, properties)

			sap.m.MessageToast.show(sMsg);

		},

		onOpenDialog : function() {
			this.getOwnerComponent().openHelloDialog();
		}
	});
});
