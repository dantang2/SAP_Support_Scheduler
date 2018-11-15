sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"productSupport/scheduler/controller/HelloDialog",
	"productSupport/scheduler/controller/AddUserDialog",
	"productSupport/scheduler/controller/EditUserDialog",
	"productSupport/scheduler/model/models"
], function (UIComponent, JSONModel, ResourceModel, HelloDialog, AddUserDialog, EditUserDialog, models) {

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
        this._addUserDialog = new AddUserDialog(this.getRootControl());
				this._editUserDialog = new EditUserDialog(this.getRootControl());

      },

      exit : function() {
        this._helloDialog.destroy();
        delete this._helloDialog;
      },

      openHelloDialog: function() {
        this._helloDialog.open();
      },

      openAddUserDialog: function() {
        this._addUserDialog.open();
      },

			openEditUserDialog: function() {
				this._editUserDialog.open();
			}

    });
});
