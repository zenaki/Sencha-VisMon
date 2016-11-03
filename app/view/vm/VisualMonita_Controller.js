Ext.define('Sencha_Draw.view.vm.VisualMonita_Controller', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.vm',

    init: function(view) {
      var me = this;
      me.ws = Ext.create('Ext.ux.WebSocket', {
        url: 'ws://localhost',
        listeners: {
    			open: function (ws) {
            var result = Ext.ComponentQuery.query('#result')[0];
            result.setValue("Connection Success ..");
    			},
    			message: function (ws, data) {
    				// Ext.get(ws.url).dom.innerHTML += '> ' + data + '<br/>';
    				// Ext.get(ws.url).dom.innerHTML = data;
            var result = Ext.ComponentQuery.query('#result')[0];
            // console.log(data);
            result.setValue(data);
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
    }
});
