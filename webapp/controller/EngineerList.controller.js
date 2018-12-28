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
			console.log(oAppointment.getKey());
			if(oAppointment){
				//sSelected = oAppointment.getSelected() ? "selected" : "deselected";
				sap.m.MessageBox.information(
					"Start Time: " +oAppointment.getStartDate()
					+ "\n End Time: " +oAppointment.getEndDate()
					+"\n Engineer: "+oAppointment.getText(),{
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
											var str = oAppointment.getKey().split(" ");
											var task = str[1];
											var team = str[0];
											var startTime = oAppointment.getStartDate();
											var endTime = oAppointment.getEndDate();


												document.location.href="controller/deleteAppointment.php?email="+email
												+"&task="+task
												+"&team="+team

												+"&startYear="+startTime.getFullYear()
												+"&startMonth="+startTime.getUTCMonth()
												+"&startDay="+startTime.getDate()
												+"&startHour="+startTime.getHours()
												+"&startMinutes="+startTime.getMinutes()

												+"&endYear="+endTime.getFullYear()
												+"&endMonth="+endTime.getUTCMonth()
												+"&endDay="+endTime.getDate()
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
		},

		handleAppointmentDrop: function (oEvent){
			var oAppointment = oEvent.getParameter("appointment"),
				oStartDate = oEvent.getParameter("startDate"),
				oEndDate = oEvent.getParameter("endDate"),
				oCalendarRow = oEvent.getParameter("calendarRow"),
				bCopy = oEvent.getParameter("copy"),
				oModel = this.getView().getModel(),
				oAppBindingContext = oAppointment.getBindingContext(),
				oRowBindingContext = oCalendarRow.getBindingContext(),
				handleAppointmentDropBetweenRows = function () {
					var aPath = oAppBindingContext.getPath().split("/"),
						iIndex = aPath.pop(),
						sRowAppointmentsPath = aPath.join("/");

					oRowBindingContext.getObject().appointments.push(
						oModel.getProperty(oAppBindingContext.getPath())
					);

					oModel.getProperty(sRowAppointmentsPath).splice(iIndex, 1);
				};

			if (bCopy) { // "copy" appointment
				var oProps = jQuery.extend({}, oModel.getProperty(oAppointment.getBindingContext().getPath()));
				oProps.start = oStartDate;
				oProps.end = oEndDate;

				oRowBindingContext.getObject().appointments.push(oProps);
			} else { // "move" appointment
				oModel.setProperty("start", oStartDate, oAppBindingContext);
				oModel.setProperty("end", oEndDate, oAppBindingContext);

				if (oAppointment.getParent() !== oCalendarRow) {
					handleAppointmentDropBetweenRows();
				}
			}

			oModel.refresh(true);

			sap.m.MessageToast.show(oCalendarRow.getTitle() + "'s '" + "Appointment '" + oAppointment.getTitle() + "' now starts at \n" + oStartDate + "\n and end at \n" + oEndDate + ".");
		}


	});
});
