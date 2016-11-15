// Ext.Loader.setConfig ({
// 	enabled: true,
// 	paths: {
// 		'Ext.ux.WebSocket': 'WebSocket/WebSocket.js' ,
// 		'Ext.ux.WebSocketManager': 'WebSocket/WebSocketManager.js'
// 	}
// });

Ext.define('Sencha_Draw.view.vm.VisualMonita', {
  extend: 'Ext.container.Container',

  requires: [
    'Sencha_Draw.view.vm.VisualMonita_Controller',
		'Sencha_Draw.view.vm.test.LockGridView',
    'Sencha_Draw.view.vm.item.hmi-items',
    'Ext.ux.WebSocket',
    'Ext.ux.WebSocketManager'
  ],

  xtype: 'visual-monita',
	itemId: 'parent',
  controller: 'vm',
  viewModel: {
		data: {
			// htmlVisMon: '<table><tr><th>Company</th><th>Contact</th><th>Country</th></tr><tr><td>Alfreds Futterkiste</td><td>Maria Anders</td><td>Germany</td></tr><tr><td>Centro comercial Moctezuma</td><td>Francisco Chang</td><td>Mexico</td></tr><tr><td>Ernst Handel</td><td>Roland Mendel</td><td>Austria</td></tr><tr><td>Island Trading</td><td>Helen Bennett</td><td>UK</td></tr><tr><td>Laughing Bacchus Winecellars</td><td>Yoshi Tannamuri</td><td>Canada</td></tr><tr><td>Magazzini Alimentari Riuniti</td><td>Giovanni Rovelli</td><td>Italy</td></tr</table>',
			// value_VisMon: '<font face="courier" color="red">><h1 style="height: 100%; width: 100%; text-align: center; margin: 0; font-size: 5em;">N/A</h1></font>',
			// val: 'N/A'
		}
  },

  layout: {
    type: 'border'
  },

  listeners: {
    boxReady: 'onBoxReady'
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
    collapsed: true,
    bodyPadding: 10,
    floatable: false,
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
				itemId: 'canvas',
				region: 'center',
        id: 'CanvasID',
        dockedItems: [{
          xtype: 'toolbar',
          dock: 'top',
          items: [{
            xtype: 'button',
            // itemId: 'trash',
            text: 'Delete Item',
            listeners: {
              click: 'onTrashClick'
            }
          }, {
  					xtype: 'textfield',
  					itemId: 'label_vismon',
          	fieldLabel: 'Label'
  				}, {
  					xtype: 'textfield',
  					itemId: 'slave_id_vismon',
          	fieldLabel: 'Slave ID'
  				}, {
  					xtype: 'textfield',
  					itemId: 'titik_ukur_vismon',
          	fieldLabel: 'Titik Ukur'
  				}, {
            xtype: 'button',
          	text: 'Add Label',
          	listeners: {
              click: 'onAddLabelClick'
          	}
      		}]
        }],
        viewModel: {
          data: {
            x_object: ''
          }
        },
				listeners: {
					el: {
						mousemove: function(me, e, eOpts) {
              var parent = Ext.ComponentQuery.query('#canvas')[0];
              // console.log('canvas.getX() = ' + (me.getX() - parent.getX()));
              // console.log('canvas.getY() = ' + (me.getY() - parent.getY()));
              // console.log('mouse X = ' + me.getX() + ' canvas X = ' + parent.getX() + ' realX = ' + (me.getX() - parent.getX()));
              // console.log('mouse Y = ' + me.getY() + ' canvas Y = ' + parent.getY() + ' realY = ' + (me.getY() - parent.getY()));
              if (parent.getViewModel().get('x_object') != '') {
                // console.log(parent.getViewModel().get('x_object'));
                // var object = Ext.ComponentQuery.query('#vm_object')[0];
                // var object = Ext.ComponentQuery.query('#' + parent.getViewModel().get('x_object'))[0];
                var object = Ext.getCmp(parent.getViewModel().get('x_object'));
  							// console.log('Page X = '); console.log(e.getX());
  							// console.log('Page Y = '); console.log(e.getY());
  							if (object.getViewModel().get('x_drag')) {
  								// console.log('Move Object X = ' + object.getX() + ' Y = ' + object.getY() + ' to X = ' + e.getX() + ' Y = ' + e.getY());
  								// var data = object.getViewModel().getData();
  								// object.el.setX(e.getX);
  								// object.el.setY(e.getY);
  								object.setPagePosition(me.getX()-10, me.getY()-10);
  							} else {
  								// console.log('NOT Move Object X = ' + object.getX() + ' Y = ' + object.getY() + ' to X = ' + e.getX() + ' Y = ' + e.getY());
  							}
              }
						}
					}
				}
			}, {
        region: 'east',
        xtype: 'panel',
        title: 'HMI Items',
        layout: 'accordion',
				split: true,
				collapsible: true,
				collapsed: false,
        floatable: false,
				width: 150,
				// autoLoad: true,
				// autoRender: true,
				// autoShow: true
        items: [{
          xtype: 'hmi-grid',
          title: 'On Local'
        }, {
          title: 'Uploaded',
          html: 'Empty'
        }]
      }, {
				region: 'south',
				xtype: 'locking-grid',
				itemId: 'tableVisMon',
				split: true,
				collapsible: true,
				collapsed: true,
        floatable: false,
				height: 300,
				title: 'Table Data Visual Monita',
				autoLoad: true,
				autoRender: true,
				autoShow: true
			}]
  	}, {
			xtype: 'panel',
			title: 'Visal Monita 2',
			// html: '<h2>Visual Monita 2</h2>'
  	}]
  }]
});
