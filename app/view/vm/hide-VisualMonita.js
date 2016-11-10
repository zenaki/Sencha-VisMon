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
		'Sencha_Draw.view.vm.test.LockGridView',
		'Sencha_Draw.view.vm.test.dynamic.DynamicGridView',
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
      // html: '<h2>Visual Monita 1</h2>',
			xtype: 'container',
			layout: {
				type: 'border',
				align: 'stretch'
			},
			items: [{
				xtype: 'panel',
				region: 'center',
				html: '<h2>Visual Monita 1</h2>'
			}, {
				region: 'south',
				xtype: 'locking-grid',
				split: true,
				collapsible: true,
				collapsed: true,
				height: 300,
				title: 'Table Data Visual Monita',
				columns: [{
					xtype: 'rownumberer'
				}, {
					text     : 'Company Name',
					locked   : true,
					width    : 230,
					sortable : false,
					dataIndex: 'name'
				}, {
					text     : 'Price',
					lockable: false,
					width    : 80,
					sortable : true,
					formatter: 'usMoney',
					dataIndex: 'price'
				}, {
					text     : 'Tall<br>Header',
					hidden   : true,
					width    : 70,
					sortable : false,
					renderer : function(val) {
						return Math.round(val * 3.14 * 100) / 10;
					},
					dataIndex: 'change'
				}, {
					text     : 'Change',
					width    : 90,
					sortable : true,
					renderer : function(val) {
						if (val > 0) {
							return '<span style="color:green;">' + val + '</span>';
						} else if (val < 0) {
							return '<span style="color:red;">' + val + '</span>';
						}
						return val;
					},
					dataIndex: 'change'
				}, {
					text     : '% Change',
					width    : 105,
					sortable : true,
					renderer : function(val) {
						if (val > 0) {
							return '<span style="color:green;">' + val + '%</span>';
						} else if (val < 0) {
							return '<span style="color:red;">' + val + '%</span>';
						}
						return val;
					},
					dataIndex: 'pctChange'
				}, {
					text     : 'Last Updated',
					width    : 135,
					sortable : true,
					formatter: 'date("m/d/Y")',
					dataIndex: 'lastChange'
				}]
			}]
  	}, {
      title: 'Visual 2',
      // html: '<h2>Visual Monita 2</h2>'
			xtype: 'container',
			layout: {
				type: 'border',
				align: 'stretch'
			},
			items: [{
				xtype: 'panel',
				region: 'center',
				html: '<h2>Visual Monita 2</h2>'
			}, {
				region: 'south',
				xtype: 'grid',
				columnLines: true,
				split: true,
				collapsible: true,
				collapsed: true,
				height: 300,
		    title: 'Test Grid',
				fields: [{
          "name": "slave_id",
          "type": "string",
          "allowBlank": true,
          "defaultValue": null
        }, {
          "name": "test_col_1",
          "type": "string",
          "allowBlank": true,
          "defaultValue": null
        }, {
          "name": "test_col_2",
          "type": "string",
          "allowBlank": true,
          "defaultValue": null
        }, {
          "name": "test_col_3",
          "type": "string",
          "allowBlank": true,
          "defaultValue": null
        }, {
          "name": "test_col_4",
          "type": "string",
          "allowBlank": true,
          "defaultValue": null
        }, {
          "name": "test_col_5",
          "type": "string ",
          "allowBlank": true,
          "defaultValue": null
        }],
        columns: [{
          "header": "Slave ID",
          "dataIndex": "slave_id"
        }, {
          "header": "1001",
          "dataIndex": "test_col_1"
        }, {
          "header": "1003",
          "dataIndex": "test_col_2"
        }, {
          "header": "1005",
          "dataIndex": "test_col_3"
        }, {
          "header": "1007",
          "dataIndex": "test_col_4"
        }, {
          "header": "1009",
          "dataIndex": "test_col_5"
        }],
    		data: [{
          "slave_id": "1",
          "test_col_1": "123.456",
          "test_col_2": "12.3456",
          "test_col_3": "123.456",
          "test_col_4": "12.3456",
					"test_col_5": "12.3456"
        }, {
          "slave_id": "2",
          "test_col_1": "123.456",
          "test_col_2": "12.3456",
          "test_col_3": "123.456",
          "test_col_4": "12.3456",
					"test_col_5": "12.3456"
        }]
			}]
  	}]
  }]
});
