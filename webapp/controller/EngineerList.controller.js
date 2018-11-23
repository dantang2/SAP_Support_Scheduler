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

				var oCarousel = this.byId("calendarCarousel");
				oCarousel.setArrowsPlacement(sap.m.CarouselArrowsPlacement.PageIndicator);
				oCarousel.setPageIndicatorPlacement(sap.m.PlacementType.Top);
		},

		onSelected: function(){
			MessageToast.show("test");
		},

		dateFormatter: function(s){
			return new Date(s[0], s[1], s[2], s[3], s[4]);
		},

		handleAppointmentSelect: function(oEvent) {
			var oAppointment = oEvent.getParameter("appointment"),sSelected;
		}



	});
});
