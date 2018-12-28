sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"productSupport/scheduler/controller/AddTaskDialog",
	"productSupport/scheduler/controller/EditEngineerDialog",
	"productSupport/scheduler/controller/AddAppointmentDialog",
	"productSupport/scheduler/model/models"
], function (UIComponent, JSONModel, ResourceModel, AddTaskDialog, EditEngineerDialog, AddAppointmentDialog, models) {

    "use strict";

    return UIComponent.extend("productSupport.scheduler.Component", {
      metadata: {
        manifest: "json"
      },

      init: function() {
        UIComponent.prototype.init.apply(this, arguments);

        var oData = {
          thisEngineer: {
            fname: "",
						lname: "",
						email: ""
          }
        };

        var oModel = new JSONModel(oData);
				this.setModel(oModel);
        //this.setModel(models.createDeviceModel(), "device");

        this._addTaskDialog = new AddTaskDialog(this.getRootControl());
				this._editEngineerDialog = new EditEngineerDialog(this.getRootControl());
				this._addAppointmentDialog = new AddAppointmentDialog(this.getRootControl());

      },


      openAddTaskDialog: function() {
        this._addTaskDialog.open();
      },

			openEditEngineerDialog: function() {
				this._editEngineerDialog.open();
			},

			openAddAppointmentDialog: function() {
				this._addAppointmentDialog.open();
			}

    });
});
