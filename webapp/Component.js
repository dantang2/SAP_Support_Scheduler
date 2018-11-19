sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"productSupport/scheduler/controller/HelloDialog",
	"productSupport/scheduler/controller/AddEngineerDialog",
	"productSupport/scheduler/controller/EditEngineerDialog",
	"productSupport/scheduler/controller/AddAppointmentDialog",
	"productSupport/scheduler/model/models"
], function (UIComponent, JSONModel, ResourceModel, HelloDialog, AddEngineerDialog, EditEngineerDialog, AddAppointmentDialog, models) {

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

        this._helloDialog = new HelloDialog(this.getRootControl());
        this._addEngineerDialog = new AddEngineerDialog(this.getRootControl());
				this._editEngineerDialog = new EditEngineerDialog(this.getRootControl());
				this._addAppointmentDialog = new AddAppointmentDialog(this.getRootControl());

      },

      exit : function() {
        this._helloDialog.destroy();
        delete this._helloDialog;
      },

      openHelloDialog: function() {
        this._helloDialog.open();
      },

      openAddEngineerDialog: function() {
        this._addEngineerDialog.open();
      },

			openEditEngineerDialog: function() {
				this._editEngineerDialog.open();
			},

			openAddAppointmentDialog: function() {
				this._addAppointmentDialog.open();
			}

    });
});
