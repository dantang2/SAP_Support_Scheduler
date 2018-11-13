sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function (Controller, JSONModel, MessageToast, MessageBox, Sorter, Filter, FilterOperator, FilterType) {
	"use strict";

	return Controller.extend("productSupport.scheduler.EngineerList", {
		onInit: function () {
				var oJSONData = {
					busy : false,
					order : 0
				};

				var oModel = new JSONModel(oJSONData);
				this.getView().setModel(oModel,"app");
		},

		onRefresh: function () {
			var oBinding = this.byId("engineerList").getBinding("rows");


			oBinding.refresh();
			sap.m.MessageToast.show(this._getText("refreshSuccessMessage"));
		},

		onSearch : function () {
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = [new sap.ui.model.Filter("EngineerName", sap.ui.model.FilterOperator.Contains, sValue)];

				oView.byId("engineerList").getBinding("items").filter(oFilter, FilterType.Application);
		},

		onSort : function () {
			var oView = this.getView(),
				aStates = [undefined, "asc", "desc"],
				aStateTextIds = ["sortNone", "sortAscendng", "sortDescending"],
				sMessage,
				iOrder = oView.getModel("app").getProperty("/order");

				iOrder = (iOrder+1) % aStates.length;
				var sOrder = aStates[iOrder];

				oView.getModel("app").setProperty("/order", iOrder);
				oView.byId("engineerList").getBinding("items").sort(sOrder && new Sorter("EngineerName", sOrder === "desc"));

				sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])]);
				sap.m.MessageToast.show(sMessage);
		},

		_getText: function (sTextId, aArgs){
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId, aArgs);
		}
	});
});
