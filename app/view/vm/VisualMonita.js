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
    'Sencha_Draw.view.vm.VisualMonita_Model',
		'Sencha_Draw.view.vm.test.LockGridView',
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
			listeners: {
				containercontextmenu: function(grid, e) {
        	// var position = e.getXY();
          // e.stopEvent();
          // menu_grid.showAt(position);
					console.log("Right Click Container Context Menu");
        }
      },
			items: [{
				xtype: 'panel',
				itemId: 'canvas',
				region: 'center',
				tbar: [{
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
        	text: 'Add Label',
        	listeners: {
            click: 'onAddLabelClick'
        	}
    		}],
				listeners: {
					el: {
						mousemove: function(e) {
							var object = Ext.ComponentQuery.query('#vm_object')[0];
							// console.log('Page X = '); console.log(e.getX());
							// console.log('Page Y = '); console.log(e.getY());
							if (object.getViewModel().get('x_drag')) {
								// console.log('Move Object X = ' + object.getX() + ' Y = ' + object.getY() + ' to X = ' + e.getX() + ' Y = ' + e.getY());
								// var data = object.getViewModel().getData();
								// object.el.setX(e.getX);
								// object.el.setY(e.getY);
								object.setPagePosition(e.getX()-10, e.getY()-10);
							} else {
								// console.log('NOT Move Object X = ' + object.getX() + ' Y = ' + object.getY() + ' to X = ' + e.getX() + ' Y = ' + e.getY());
							}
						}
					}
				},
				// bind: {
				// 	html: '{htmlVisMon}'
				// }
				items: [{
					xtype: 'panel',
					// id: 'imagePipe',
					itemId: 'vm_object',
					viewModel: {
						data: {
							x_height: 10,
							x_width: 10,
							x_drag: false
						}
					},
					resizable: {
						dynamic: true,
						pinned: true,
						handles: 'all',
						transparent: true,
						// listeners: {
						// 	resize: function(me, width, height, e, eOpts) {
						// 		// var parent = Ext.ComponentQuery.query('#parent')[0];
						// 		me.getViewModel().set('x_height', height);
						// 		me.getViewModel().set('x_width', width);
						// 	}
						// }
					},
					// draggable: {
					// 	delegate: 'img'
					// },
					listeners: {
						resize: function(me, width, height, e, eOpts) {
							// var parent = Ext.ComponentQuery.query('#parent')[0];
							me.getViewModel().set('x_height', height);
							me.getViewModel().set('x_width', width);
						},
						// move: function(me, x, y, eOpts) {
						// 		console.log(me);
						// 		console.log(x);
						// 		console.log(y);
						// 		console.log(eOpts);
						// }
						render: function(panel) {
				    	panel.body.on('click', function() {
				      	// console.log('click');
								var object = Ext.ComponentQuery.query('#vm_object')[0];
								if (object.getViewModel().get('x_drag')) {
									object.getViewModel().set('x_drag', false);
								} else {
									object.getViewModel().set('x_drag', true);
								}
				      });
				    },
						el: {
							// mousedown: function() {
							// 	var object = Ext.ComponentQuery.query('#vm_object')[0];
							// 	console.log('Mouse Down', arguments);
							// 	object.getViewModel().set('x_drag', true);
							// },
							// mouseup: function() {
							// 	var object = Ext.ComponentQuery.query('#vm_object')[0];
							// 	console.log('Mouse Up', arguments);
							// 	object.getViewModel().set('x_drag', false);
							// },
        		}
					},
					height: 100,
					width: 100,
					x: 100,
					y: 100,
					bind: {
						html: '<img src="png/piping-ca-h.png" height={x_height} width={x_width}/>'
					}
				}]
			}, {
				region: 'south',
				xtype: 'locking-grid',
				itemId: 'tableVisMon',
				split: true,
				collapsible: true,
				collapsed: true,
				height: 300,
				title: 'Table Data Visual Monita',
				autoLoad: true,
				autoRender: true,
				autoShow: true
				// columns: [{text: 'Slave ID', dataIndex: 'slave_id'}]
				// bind: {columns: {columnsVisMon}}
			}]
  	}, {
			xtype: 'panel',
			title: 'Visal Monita 2',
			// html: '<h2>Visual Monita 2</h2>'
  	}]
  }]
});
