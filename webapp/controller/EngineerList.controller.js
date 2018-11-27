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

		dateFormatter: function(s){
			return new Date(s[0],s[1],s[2],s[3],s[4]);
		},

		handleAppointmentSelect: function(oEvent) {
			var oAppointment = oEvent.getParameter("appointment"),sSelected;
			if(oAppointment){
				//sSelected = oAppointment.getSelected() ? "selected" : "deselected";
				sap.m.MessageBox.information(
					"TASK: " + oAppointment.getTitle()
					+ "\n\n Start Time: " +oAppointment.getStartDate()
					+ "\n End Time: " +oAppointment.getEndDate()
					+"\n Engineer: "+oAppointment.getText()
					+"\n Team: "+oAppointment.getKey(),{
						icon: sap.m.MessageBox.Icon.INFORMATION,
          	title: "Task Details",
						actions: [sap.m.MessageBox.Action.DELETE,sap.m.MessageBox.Action.OK],

						onClose: function(sAction) {
							if(sAction == 'DELETE'){
								sap.m.MessageBox.alert("Delete this appointment?",{
									title: "Confirm Delete",
									actions:[sap.m.MessageBox.Action.NO, sap.m.MessageBox.Action.YES],
									onClose: function(oAction){
										if(oAction == 'YES'){

																			var email = oAppointment.getText();
																			var task = oAppointment.getTitle();
																			var team = oAppointment.getKey();
																			var startTime = oAppointment.getStartDate();
																			var endTime = oAppointment.getEndDate();



																			var startYear = startTime.getFullYear();
																			var startMonth = startTime.getUTCMonth();
																			var startDay = startTime.getUTCDate();

																			var endYear = endTime.getFullYear();
																			var endMonth = endTime.getUTCMonth();
																			var endDay = endTime.getUTCDate();

																				document.location.href="controller/deleteAppointment.php?email="+email
																				+"&task="+task
																				+"&team="+team

																				+"&startYear="+startTime.getFullYear()
																				+"&startMonth="+startTime.getUTCMonth()
																				+"&startDay="+startTime.getUTCDate()
																				+"&startHour="+startTime.getHours()
																				+"&startMinutes="+startTime.getMinutes()

																				+"&endYear="+endTime.getFullYear()
																				+"&endMonth="+endTime.getUTCMonth()
																				+"&endDay="+endTime.getUTCDate()
																				+"&endHour="+endTime.getHours()
																				+"&endMinutes="+endTime.getMinutes()
																			}
										}
									}
								);
								//sap.m.MessageToast.show(oAppointment.getStartDate());
							}
						}
					}
				);
			} else {
				var aAppointments = oEvent.getParameter("appointments");
				var sValue = aAppointments.length + " Appointments selected";
				sap.m.MessageBox.show(sValue);
			}
		}





	});
});
