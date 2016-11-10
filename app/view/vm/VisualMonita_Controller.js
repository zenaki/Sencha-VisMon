Ext.define('Sencha_Draw.view.vm.VisualMonita_Controller', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.vm',
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
    				// Ext.get(ws.url).dom.innerHTML += '> ' + data + '<br/>';
    				// Ext.get(ws.url).dom.innerHTML = data;
            var result = Ext.ComponentQuery.query('#result')[0];
            result.setValue(data);
            if (me.isJSON(data)) {
              var table = Ext.ComponentQuery.query('#tableVisMon')[0];
              var json = JSON.parse(data);
              // console.log('data = '); console.log(data);
              // console.log('json = '); console.log(json);
              // ---------------------------------------------------------------//
              // console.log('json = ');
              // console.log(json);
              // for (var i = 0; i < Object.keys(json.monita).length; i++) {
              //   console.log('slave_id: '+json.monita[i].slave_id);
              //   for (var j = 0; j < Object.keys(json.monita[i].data).length; j++) {
              //     console.log('titik_ukur: '+json.monita[i].data[j].titik_ukur);
              //     console.log('value:'+json.monita[i].data[j].value);
              //   }
              // }
              // ---------------------------------------------------------------//
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
              // console.log('monita_fields = '); console.log(monita_fields);
              // console.log('monita_columns = '); console.log(monita_columns);
              // console.log('monita_data = '); console.log(monita_data);
              data = "{ " + monita_fields + ", " + monita_columns + ", " + monita_data + " }";
              // console.log('data = '); console.log(data);
              json = JSON.parse(data);
              // console.log('json = '); console.log(json);
              // ---------------------------------------------------------------//
              table.getStore().setFields(json.fields);
              table.reconfigure(table.getStore(), json.columns);
              table.getStore().setData(json.data);

              // console.log('monita_viewModel = '); console.log(monita_viewModel);
              json = JSON.parse(monita_viewModel);
              // console.log('json = '); console.log(json);
              me.getViewModel().setData(json);
              // console.log(json.fields);
              // console.log(json.columns);
              // console.log(json.data);
              // console.log(table);
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

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onSpecialKey: function (tf, evt) {
      if (evt.getKey () === evt.ENTER) {
        this.openConnection();
      }
    },

    openConnection: function() {
      var me = this;
  		var websocket_panel = me.lookupReference('p_webSocket');
      // console.log(websocket_panel);
      var value = websocket_panel.getForm().getValues();
      // console.log(value);
      value = {
        url: value.URL
      };
      var url = value.url;
      // console.log(value);

      me.ws.setConfig({
        url: url
      });

      me.ws.open();
    },

    closeConnection: function() {
      var me = this;
      me.ws.close();
    },

    onAddLabelClick: function() {
      var me = this;
      console.log('Tombol Add Label dipencet ..');
      var label = Ext.ComponentQuery.query('#label_vismon')[0];
      var slave_id = Ext.ComponentQuery.query('#slave_id_vismon')[0];
      var titik_ukur = Ext.ComponentQuery.query('#titik_ukur_vismon')[0];
      // console.log('label = '); console.log(label.getValue());
      // console.log('slave_id = '); console.log(slave_id.getValue());
      // console.log('titik_ukur = '); console.log(titik_ukur.getValue());

      var canvas = Ext.ComponentQuery.query('#canvas')[0];
      // console.log(canvas.getBind());
      // var data_viewModel = "{ \"test_bind\": \"<h1>Test Binding</h1>\" }";
      // var json = JSON.parse(data_viewModel);
      // console.log('json = '); console.log(json);
      // me.getViewModel().setData(json);
      // var data_bind = "{ \"html\": \"{test_bind}\" }";
      // json = JSON.parse(data_bind);
      // console.log('json = '); console.log(json);
      // canvas.setBind(json);

      // console.log(me.getViewModel());
      // console.log(canvas.getBind());

      // console.log(me.getViewModel().data);
      canvas.add({
        xtype: 'panel',
        title: label.getValue(),
        split: true,
        collapsible: true,
        collapsed: true,
        bodyBorder: true,
        height: 100,
        width: 150,
        resizable: {
          dynamic: true,
          pinned: true,
          handles: 'all'
        },
        draggable: true,
        items: {
          xtype: 'label',
          itemId: 'VAL_' + slave_id.getValue() + titik_ukur.getValue(),
          margin: 0,
          padding: 0,
          bind: {
            // html: '{value_VisMon}'
            html: '<font face="courier" color="red">><h1 style="height: 100%; width: 100%; text-align: center; margin: 0; font-size: 2em;">{VAL_' + slave_id.getValue() + titik_ukur.getValue() + '}</h1></font>'
          }
        }
      });
      // var item = Ext.ComponentQuery.query('#test_visual')[0];
      // var data_bind = "{\"value\": \"{VAL_" + slave_id.getValue() + titik_ukur.getValue() + "}\" }";
      // json = JSON.parse(data_bind);
      // item.setFieldLabel(label.getValue());
      // item.setBind(json);
    }
});
