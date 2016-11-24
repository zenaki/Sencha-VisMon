Ext.define('VisualMoita.view.vm.editor.webSocket.ws-Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.ws-controller',
  
  isJSON: function(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },

  init: function(view) {
      var me = this;
      me.ws = Ext.create('Ext.ux.WebSocket', {
        url: 'ws://localhost:1234',
        listeners: {
    			open: function (ws) {
            var result = Ext.ComponentQuery.query('#result')[0];
            result.setValue("Connection Success ..");
    			},
    			message: function (ws, data) {
            var result = Ext.ComponentQuery.query('#result')[0];
            result.setValue(data);
            if (me.isJSON(data)) {
              var table = Ext.ComponentQuery.query('#tableVisMon')[0];
              var json = JSON.parse(data);
              var monita_fields, monita_columns, monita_data, monita_viewModel;
              monita_fields = "{\"name\": \"slave_id\", \"type\": \"int\", \"allowBlank\": true, \"defaultValue\": null}";
              monita_columns = "{\"header\": \"Slave ID\", \"locked\": true, \"width\": 100, \"dataIndex\": \"slave_id\"}";
              monita_viewModel = "{";
              for (var i = 0; i < Object.keys(json.monita).length; i++) {
                // console.log('slave_id: '+json.monita[i].slave_id);
                if (i > 0) {
                  monita_data = monita_data + ",{\"slave_id\": " + json.monita[i].slave_id;
                } else {
                  monita_data = "{\"slave_id\": " + json.monita[i].slave_id;
                }
                for (var j = 0; j < Object.keys(json.monita[i].data).length; j++) {
                  // console.log('titik_ukur: '+json.monita[i].data[j].titik_ukur);
                  if (monita_fields.indexOf(json.monita[i].data[j].titik_ukur) <= 0) {
                    monita_fields = monita_fields + ",{\"name\": \"" + json.monita[i].data[j].titik_ukur + "\", \"type\": \"string\", \"allowBlank\": true, \"defaultValue\": null}";
                  }
                  if (monita_columns.indexOf(json.monita[i].data[j].titik_ukur) <= 0) {
                    monita_columns = monita_columns + ",{\"header\": \"" + json.monita[i].data[j].titik_ukur + "\", \"locked\": false, \"width\": 100, \"dataIndex\": \"" + json.monita[i].data[j].titik_ukur + "\"}";
                  }
                  // console.log('value:'+json.monita[i].data[j].value);
                  monita_data = monita_data + ", \"" + json.monita[i].data[j].titik_ukur + "\":" +json.monita[i].data[j].value;
                  if (monita_viewModel.indexOf("VAL_") > 0) {
                    monita_viewModel = monita_viewModel + ",\"VAL_" + json.monita[i].slave_id + json.monita[i].data[j].titik_ukur + "\": \"" + json.monita[i].data[j].value + "\"";
                  } else {
                    monita_viewModel = monita_viewModel + "\"VAL_" + json.monita[i].slave_id + json.monita[i].data[j].titik_ukur + "\": \"" + json.monita[i].data[j].value + "\"";
                  }
                }
                monita_data = monita_data + "}";
              }
              monita_fields = "\"fields\": [ " + monita_fields + " ]";
              monita_columns = "\"columns\": [ " + monita_columns + " ]";
              monita_data = "\"data\": [ " + monita_data + " ]";
              monita_viewModel = monita_viewModel + "}";
              data = "{ " + monita_fields + ", " + monita_columns + ", " + monita_data + " }";
              json = JSON.parse(data);
              // ---------------------------------------------------------------//
              table.getStore().setFields(json.fields);
              table.reconfigure(table.getStore(), json.columns);
              table.getStore().setData(json.data);

              json = JSON.parse(monita_viewModel);
              me.getViewModel().setData(json);
              // ---------------------------------------------------------------//
            } else {
              console.log("\"" + data + "\" is not a JSON ..");
            }
    			},
          error: function (ws) {
            var result = Ext.ComponentQuery.query('#result')[0];
            result.setValue("Connection Fail !!");
          }
    		}
      });
      me.ws.close();
    },

    onSpecialKey: function (tf, evt) {
      if (evt.getKey () === evt.ENTER) {
        this.openConnection();
      }
    },

    openConnection: function() {
      var me = this;
      var form = Ext.ComponentQuery.query('#p_webSocket')[0];
      var value = form.getForm().getValues();
      value = {url: value.URL};
      var url = value.url;

      me.ws.setConfig({url: url});
      me.ws.open();
    },

    closeConnection: function() {
      var me = this;
      me.ws.close();
    }
});
