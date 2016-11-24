Ext.define('VisualMoita.view.vm.editor.webSocket.ws-Form', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.ux.WebSocket',
    'Ext.ux.WebSocketManager',
    'VisualMoita.view.vm.editor.webSocket.ws-Controller'
  ],
  xtype: 'webSocket-form',
  itemId: 'p_webSocket',
  controller: 'ws-controller',
  title: 'WebSocket',
  width: 450,
  split: true,
  collapsible: true,
  collapsed: true,
  bodyPadding: 10,
  floatable: false,
  items: [{
      xtype: 'fieldcontainer',
      layout: 'hbox',
      anchor: '100%',
      items: [{
        xtype: 'textfield',
        name: 'URL',
        value: 'ws://119.18.154.235:1234',
        flex: 1,
    		fieldLabel: 'WebSocket URL',
    		listeners: {
    			specialKey: 'onSpecialKey'
    		}
      }, {
        xtype: 'button',
        text: 'Connect',
        listeners: {
          click: 'openConnection'
        }
      }, {
        xtype: 'button',
        text: 'Disconnect',
        listeners: {
          click: 'closeConnection'
        }
      }]
  	}, {
      xtype: 'textarea',
      itemId: 'result',
      anchor: '100%',
      height: '100%',
      width: '100%',
      fieldLabel: 'Respone From WebSocket',
      labelAlign: 'top'
    }]
});
