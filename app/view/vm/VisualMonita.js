Ext.Loader.setConfig ({
	enabled: true,
	paths: {
		'Ext.ux.WebSocket': 'WebSocket/WebSocket.js' ,
		'Ext.ux.WebSocketManager': 'WebSocket/WebSocketManager.js'
	}
});

Ext.define('Sencha_Draw.view.vm.VisualMonita', {
  extend: 'Ext.container.Container',

  requires: [
    'Sencha_Draw.view.vm.VisualMonita_Controller',
    'Sencha_Draw.view.vm.VisualMonita_Model',
    'Ext.ux.WebSocket',
    'Ext.ux.WebSocketManager'
  ],

  xtype: 'visual-monita',

  controller: 'vm',
  viewModel: {
      type: 'vm'
  },

  layout: {
      type: 'border'
  },

  items: [{
      xtype: 'panel',
      title: '<h2>Visual Monita</h2>',
      region: 'north'
  }, {
      xtype: 'form',
      reference: 'p_webSocket',
      title: 'JSON Data from WebSocket',
      region: 'west',
      width: 450,
      split: true,
      collapsible: true,
      bodyPadding: 10,
      items:[{
        xtype: 'fieldcontainer',
        layout: 'hbox',
        anchor: '100%',
        items: [{
          xtype: 'textfield',
          name: 'URL',
          flex: 1,
      		fieldLabel: 'WebSocket URL',
      		// labelAlign: 'top',
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
  }, {
      region: 'center',
      xtype: 'tabpanel',
      items:[{
          title: 'Visual 1',
          html: '<h2>Visual Monita 1</h2>'
      }, {
          title: 'Visual 2',
          html: '<h2>Visual Monita 2</h2>'
      }]
  }]
});
