sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"productSupport/scheduler/controller/HelloDialog",
	"productSupport/scheduler/controller/AddUserDialog",
	"productSupport/scheduler/model/models"
], function (UIComponent, JSONModel, ResourceModel, HelloDialog, AddUserDialog, models) {

    "use strict";

    return UIComponent.extend("productSupport.scheduler.Component", {
      metadata: {
        manifest: "json"
      },

      init: function() {
        UIComponent.prototype.init.apply(this, arguments);

        var oData = {
          recipient: {
            name: ""
          }
        };

        var oModel = new JSONModel(oData);
        this.setModel(models.createDeviceModel(), "device");

        this._helloDialog = new HelloDialog(this.getRootControl());
        this._addUserDialog = new AddUserDialog(this.getRootControl());

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
      }

    });
});
