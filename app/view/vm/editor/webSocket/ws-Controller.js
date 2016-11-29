Ext.define('VisualMonita.view.vm.editor.webSocket.ws-Controller', {
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
            var visual = Ext.ComponentQuery.query('#visual')[0];
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
          me.task.stop();
        }
  		}
    });
    me.ws.close();

    var runner = new Ext.util.TaskRunner();
    me.task = runner.newTask({
      run: function() {
        me.CanvasFunction();
        me.VisualFunction();
      },
      interval: 100
    });
    // me.task.start();
    me.task.stop();
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
    me.task.start();
  },

  closeConnection: function() {
    var me = this;
    me.ws.close();
    me.task.stop();
  },

  CanvasFunction: function() {
    var canvas = Ext.ComponentQuery.query('#canvas')[0];
    var AllObject = Ext.ComponentQuery.query('#canvas > panel');
    for (var i = 0; i < Object.keys(AllObject).length; i++) {
      if (AllObject[i].getViewModel().get('x_type') == 'item_label') {
        if (canvas.getViewModel().get('VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur'))) {
          var value = canvas.getViewModel().get('VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur'));
          var ba_1 = AllObject[i].getViewModel().get('x_ba_1');
          var wba_1  = AllObject[i].getViewModel().get('x_wba_1');
          var ba_2 = AllObject[i].getViewModel().get('x_ba_2');
          var wba_2 = AllObject[i].getViewModel().get('x_wba_2');
          var bb_1 = AllObject[i].getViewModel().get('x_bb_1');
          var wbb_1 = AllObject[i].getViewModel().get('x_wbb_1');
          var bb_2 = AllObject[i].getViewModel().get('x_bb_2');
          var wbb_2 = AllObject[i].getViewModel().get('x_wbb_2');
          if (parseFloat(value) >= parseFloat(ba_1)) {
            if (parseFloat(value) >= parseFloat(ba_2)) {
              AllObject[i].setBind({title: '{x_title}', html: '<font face="{x_font}" color="{x_wba_2}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
            } else {
              AllObject[i].setBind({title: '{x_title}', html: '<font face="{x_font}" color="{x_wba_1}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
            }
          } else if (parseFloat(value) <= parseFloat(bb_1)) {
            if (parseFloat(value) <= parseFloat(bb_2)) {
              AllObject[i].setBind({title: '{x_title}', html: '<font face="{x_font}" color="{x_wbb_2}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
            } else {
              AllObject[i].setBind({title: '{x_title}', html: '<font face="{x_font}" color="{x_wbb_1}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
            }
          } else {
            AllObject[i].setBind({title: '{x_title}', html: '<font face="{x_font}" color="{x_color}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
          }
        }
      }
    }
  },

  VisualFunction: function() {
    var me = this;
    var visual = Ext.ComponentQuery.query('#visual')[0];
    var AllObject = Ext.ComponentQuery.query('#visual > panel');
    for (var i = 0; i < Object.keys(AllObject).length; i++) {
      if (AllObject[i].getViewModel().get('x_type') == 'item_label') {
        if (me.getViewModel().get('VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur'))) {
          var value = me.getViewModel().get('VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur'));
          var ba_1 = AllObject[i].getViewModel().get('x_ba_1');
          var wba_1  = AllObject[i].getViewModel().get('x_wba_1');
          var ba_2 = AllObject[i].getViewModel().get('x_ba_2');
          var wba_2 = AllObject[i].getViewModel().get('x_wba_2');
          var bb_1 = AllObject[i].getViewModel().get('x_bb_1');
          var wbb_1 = AllObject[i].getViewModel().get('x_wbb_1');
          var bb_2 = AllObject[i].getViewModel().get('x_bb_2');
          var wbb_2 = AllObject[i].getViewModel().get('x_wbb_2');
          console.log(
            'Value = ' + value +
            ' BA_1 = ' + ba_1 +
            ' WBA_1 = ' + wba_1 +
            ' BA_2 = ' + ba_2 +
            ' WBA_2 = ' + wba_2 +
            ' BB_1 = ' + bb_1 +
            ' WBB_1 = ' + wbb_1 +
            ' BB_2 = ' + bb_2 +
            ' WBB_2 = ' + wbb_2
          );
          if (parseFloat(value) >= parseFloat(ba_1)) {
            if (parseFloat(value) >= parseFloat(ba_2)) {
              AllObject[i].setBind({html: '<font face="{x_font}" color="{x_wba_2}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
            } else {
              AllObject[i].setBind({html: '<font face="{x_font}" color="{x_wba_1}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
            }
          } else if (parseFloat(value) <= parseFloat(bb_1)) {
            if (parseFloat(value) <= parseFloat(bb_2)) {
              AllObject[i].setBind({html: '<font face="{x_font}" color="{x_wbb_2}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
            } else {
              AllObject[i].setBind({html: '<font face="{x_font}" color="{x_wbb_1}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
            }
          } else {
            AllObject[i].setBind({html: '<font face="{x_font}" color="{x_color}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + AllObject[i].getViewModel().get('x_slave_id') + AllObject[i].getViewModel().get('x_titik_ukur') + '}</h1></font>'});
          }
        }
      }
    }
  }
});
