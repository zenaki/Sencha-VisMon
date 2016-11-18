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
    'Sencha_Draw.view.vm.uploaded_item.hmi-items',
    // 'Sencha_Draw.view.vm.json_grid.json_grid',
    'Ext.ux.WebSocket',
    'Ext.ux.WebSocketManager',
    'Ext.ux.upload.*'
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
        value: 'ws://119.18.154.235:1234',
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
      title: 'Editor',
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
            text: 'Save Visual Monita',
            listeners: {
              click: 'onSaveVisualMonita'
            }
          }, {
            xtype: 'button',
            text: 'Load Visual Monita',
            listeners: {
              click: 'onloadVisualMonitaEditor'
            }
          }, {
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
        }, {
          xtype: 'toolbar',
          dock: 'bottom',
          items: [{
  					xtype: 'textfield',
  					itemId: 'object_posx',
          	fieldLabel: 'X',
            listeners: {
              specialKey: 'onToolbarObjectValueChange'
            }
  				}, {
  					xtype: 'textfield',
  					itemId: 'object_posy',
          	fieldLabel: 'Y',
            listeners: {
              specialKey: 'onToolbarObjectValueChange'
            }
  				}, {
  					xtype: 'textfield',
  					itemId: 'object_height',
          	fieldLabel: 'Height',
            listeners: {
              specialKey: 'onToolbarObjectValueChange'
            }
  				}, {
            xtype: 'textfield',
  					itemId: 'object_width',
          	fieldLabel: 'Width',
            listeners: {
              specialKey: 'onToolbarObjectValueChange'
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
                var AllObject = Ext.ComponentQuery.query('#canvas > panel');
                // console.log('AllObject = '); console.log(AllObject);
                for (var i = 0; i < Object.keys(AllObject).length; i++) {
                  if (AllObject[i].getId() == parent.getViewModel().get('x_object')) {
                    AllObject[i].el.setStyle({backgroundImage: 'url(border-image.png)'});
                  } else {
                    AllObject[i].el.setStyle({backgroundImage: 'url(border-image-null.png)'});
                  }
                }
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
                  // console.log(object.getHeader());
                  if (object.getHeader()) {
                    object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-20);
                  } else {
                    object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-(object.getHeight()/2));
                  }

                  var o_posX = Ext.ComponentQuery.query('#object_posx')[0]; o_posX.setValue(object.getX());
                  var o_posY = Ext.ComponentQuery.query('#object_posy')[0]; o_posY.setValue(object.getY());
                  var o_height = Ext.ComponentQuery.query('#object_height')[0]; o_height.setValue(object.getHeight());
                  var o_width = Ext.ComponentQuery.query('#object_width')[0]; o_width.setValue(object.getWidth());
  							} else {
  								// console.log('NOT Move Object X = ' + object.getX() + ' Y = ' + object.getY() + ' to X = ' + e.getX() + ' Y = ' + e.getY());

  							}
              }
						},
            contextmenu: function() {
              console.log('Right Clicked on Canvas');
            }
					}
				},
        scrollable: true
			}, {
        region: 'east',
        xtype: 'panel',
        title: 'HMI Items',
        layout: 'accordion',
				split: true,
				collapsible: true,
				collapsed: false,
        floatable: false,
				width: 250,
				// autoLoad: true,
				// autoRender: true,
				// autoShow: true
        items: [{
          xtype: 'hmi-grid',
          title: 'On Local'
        }, {
          xtype: 'panel',
          title: 'Upload Item',
          items: [{
            xtype: 'form',
            // title: 'Upload a Photo',
            bodyPadding: 10,
            items: [{
              xtype: 'filefield',
              name: 'new_item',
              // buttonOnly: true,
              hideLabel: true,
              allowBlank: false,
              anchor: '100%',
              buttonText: 'Browse Items...'
            }],
            buttons: [{
              text: 'Upload',
              handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                  form.submit({
                    url: 'test_upload.php',
                    waitMsg: 'Uploading your photo...',
                    success: function(fp, o) {
                      Ext.Msg.alert('Success', 'Item "' + o.result.file + '" has been uploaded.');
                      var grid = Ext.ComponentQuery.query('#uploadedGrid')[0];
                      grid.getStore().reload();
                    }
                  });
                }
              }
            }, {
              text: 'Refresh',
              handler: function() {
                var grid = Ext.ComponentQuery.query('#uploadedGrid')[0];
                grid.getStore().reload();
              }
            }]
          }, {
            xtype: 'hmi-uploaded-grid',
            itemId: 'uploadedGrid'
          }]
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
			title: 'Visal Monita',
      id: 'visual_monita',
      itemId: 'visual_monita',
      scrollable: true,
			// html: '<h2>Visual Monita 2</h2>'
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
          xtype: 'button',
          text: 'Load Visual Monita',
          listeners: {
            click: 'onloadVisualMonita'
          }
        }]
      }],
  	}]
  }]
});
