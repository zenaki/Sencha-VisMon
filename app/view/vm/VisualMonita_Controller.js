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

              // console.log('JSON Columns = '); console.log(json.columns);
              // console.log('Table Columns = '); console.log(table.getColumns());
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
      // console.log('Tombol Add Label dipencet ..');
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
        viewModel: {
          data: {
            x_height: 10,
            x_width: 10,
            x_drag: false
          }
        },
        split: true,
        collapsible: true,
        collapsed: true,
        floatable: false,
        bodyBorder: true,
        height: 100,
        width: 150,
        tools: [{
          type: 'close',
          tooltip: 'Delete Label',
          handler: function(event, toolEl, panelHeader) {
            // console.log('event = '); console.log(event);
            // console.log('toolEl = '); console.log(toolEl);
            // console.log('paelHeader = '); console.log(panelHeader);
            var canvas = Ext.ComponentQuery.query('#canvas')[0];
            var object = Ext.getCmp(canvas.getViewModel().get('x_object'));
            Ext.Msg.show({
              title:'Delete Item',
              message: 'Delete last click item ??',
              buttons: Ext.Msg.YESNO,
              icon: Ext.Msg.QUESTION,
              fn: function(btn) {
                if (btn === 'yes') {
                  canvas.getViewModel().set('x_object', '');
                  console.log(canvas.remove(object));
                }
              }
            });
          }
        }],
        resizable: {
          dynamic: true,
          pinned: true,
          handles: 'all'
        },
        // draggable: true,
        items: {
          xtype: 'label',
          itemId: 'VAL_' + slave_id.getValue() + titik_ukur.getValue(),
          margin: 0,
          padding: 0,
          bind: {
            // html: '{value_VisMon}'
            html: '<font face="courier" color="red">><h1 style="height: 100%; width: 100%; text-align: center; margin: 0; font-size: 2em;">{VAL_' + slave_id.getValue() + titik_ukur.getValue() + '}</h1></font>'
          }
        },
        floating: true,
        renderTo: Ext.getBody(),
        listeners: {
          resize: function(me, width, height, e, eOpts) {
            me.getViewModel().set('x_height', height);
            me.getViewModel().set('x_width', width);
          },
          render: function(panel) {
            panel.body.on('dblclick', function() {
              // console.log('click');
              var parent = Ext.ComponentQuery.query('#canvas')[0];
              // console.log('panel = '); console.log(panel);
              // console.log('panel.itemId = '); console.log(panel.id);
              parent.getViewModel().set('x_object', panel.id);
              var object = Ext.getCmp(panel.id);
              if (!object.getViewModel().get('x_drag')) {
                object.getViewModel().set('x_drag', true);
              }
            });
            panel.body.on('click', function() {
              // console.log('click');
              var parent = Ext.ComponentQuery.query('#canvas')[0];
              // console.log('panel = '); console.log(panel);
              // console.log('panel.itemId = '); console.log(panel.id);
              parent.getViewModel().set('x_object', panel.id);
              var object = Ext.getCmp(panel.id);
              if (object.getViewModel().get('x_drag')) {
                object.getViewModel().set('x_drag', false);
              }
            });
            panel.header.on('dblclick', function() {
              // console.log('click');
              var parent = Ext.ComponentQuery.query('#canvas')[0];
              // console.log('panel = '); console.log(panel);
              // console.log('panel.itemId = '); console.log(panel.id);
              parent.getViewModel().set('x_object', panel.id);
              var object = Ext.getCmp(panel.id);
              if (!object.getViewModel().get('x_drag')) {
                object.getViewModel().set('x_drag', true);
              }
            });
            panel.header.on('click', function() {
              // console.log('click');
              var parent = Ext.ComponentQuery.query('#canvas')[0];
              // console.log('panel = '); console.log(panel);
              // console.log('panel.itemId = '); console.log(panel.id);
              parent.getViewModel().set('x_object', panel.id);
              var object = Ext.getCmp(panel.id);
              if (object.getViewModel().get('x_drag')) {
                object.getViewModel().set('x_drag', false);
              }
            });
          },
          el: {
            mousemove: function(me, e, eOpts) {
              var parent = Ext.ComponentQuery.query('#canvas')[0];
              if (parent.getViewModel().get('x_object') != '') {
                var object = Ext.getCmp(parent.getViewModel().get('x_object'));
                if (object.getViewModel().get('x_drag')) {
                  object.setPagePosition(me.getX()-10, me.getY()-10);
                }
              }
            }
          }
        }
      });
      // var item = Ext.ComponentQuery.query('#test_visual')[0];
      // var data_bind = "{\"value\": \"{VAL_" + slave_id.getValue() + titik_ukur.getValue() + "}\" }";
      // json = JSON.parse(data_bind);
      // item.setFieldLabel(label.getValue());
      // item.setBind(json);
    },

    onBoxReady: function() {
      var canvas = Ext.ComponentQuery.query('#canvas')[0];
      // var trash = Ext.ComponentQuery.query('#trash')[0];

        this.CanvasDropTarget = new Ext.dd.DropTarget(canvas.body, {
          ddGroup: 'hmi-grid-to-panel',
          notifyEnter: function(ddSource, e, data) {
            canvas.body.stopAnimation();
            canvas.body.highlight();
          },
          notifyDrop: function(ddSource, e, data) {
            var canvas = Ext.ComponentQuery.query('#canvas')[0];
            var selectedRecord = ddSource.dragData.records[0];
            // console.log(selectedRecord.data['onlocal']);
            // console.log('mouse X = ' + me.getX() + ' canvas X = ' + parent.getX() + ' realX = ' + (me.getX() - parent.getX()));
            // console.log('mouse Y = ' + me.getY() + ' canvas Y = ' + parent.getY() + ' realY = ' + (me.getY() - parent.getY()));
            var posX = e.getX() - canvas.getX();
            var posY = e.getY() - canvas.getY() - 35;
            posX = e.getX();
            posY = e.getY();
            // console.log('dropX = ' + posX);
            // console.log('dropY = ' + posY);
            canvas.add({
    					xtype: 'panel',
    					viewModel: {
    						data: {
    							x_height: 10,
    							x_width: 10,
    							x_drag: false,
                  x_path: selectedRecord.data['onlocal']
    						}
    					},
    					resizable: {
    						dynamic: true,
    						pinned: true,
    						handles: 'all',
    						transparent: true
    					},
    					listeners: {
    						resize: function(me, width, height, e, eOpts) {
    							me.getViewModel().set('x_height', height);
    							me.getViewModel().set('x_width', width);

                  var o_posX = Ext.ComponentQuery.query('#object_posx')[0]; o_posX.setValue(me.getX());
                  var o_posY = Ext.ComponentQuery.query('#object_posy')[0]; o_posY.setValue(me.getY());
                  var o_height = Ext.ComponentQuery.query('#object_height')[0]; o_height.setValue(me.getHeight());
                  var o_width = Ext.ComponentQuery.query('#object_width')[0]; o_width.setValue(me.getWidth());
    						},
    						render: function(panel) {
    				    	panel.body.on('dblclick', function() {
    				      	// console.log('click');
                    var parent = Ext.ComponentQuery.query('#canvas')[0];
                    // console.log('panel = '); console.log(panel);
                    // console.log('panel.itemId = '); console.log(panel.id);
                    parent.getViewModel().set('x_object', panel.id);
                    var object = Ext.getCmp(panel.id);
    								if (!object.getViewModel().get('x_drag')) {
    									object.getViewModel().set('x_drag', true);
    								}

                    var o_posX = Ext.ComponentQuery.query('#object_posx')[0]; o_posX.setValue(object.getX());
                    var o_posY = Ext.ComponentQuery.query('#object_posy')[0]; o_posY.setValue(object.getY());
                    var o_height = Ext.ComponentQuery.query('#object_height')[0]; o_height.setValue(object.getHeight());
                    var o_width = Ext.ComponentQuery.query('#object_width')[0]; o_width.setValue(object.getWidth());
    				      });
                  panel.body.on('click', function() {
    				      	// console.log('click');
                    var parent = Ext.ComponentQuery.query('#canvas')[0];
                    // console.log('panel = '); console.log(panel);
                    // console.log('panel.itemId = '); console.log(panel.id);
                    parent.getViewModel().set('x_object', panel.id);
    								var object = Ext.getCmp(panel.id);
    								if (object.getViewModel().get('x_drag')) {
    									object.getViewModel().set('x_drag', false);
    								}

                    var o_posX = Ext.ComponentQuery.query('#object_posx')[0]; o_posX.setValue(object.getX());
                    var o_posY = Ext.ComponentQuery.query('#object_posy')[0]; o_posY.setValue(object.getY());
                    var o_height = Ext.ComponentQuery.query('#object_height')[0]; o_height.setValue(object.getHeight());
                    var o_width = Ext.ComponentQuery.query('#object_width')[0]; o_width.setValue(object.getWidth());
    				      });
    				    },
                el: {
      						mousemove: function(me, e, eOpts) {
                    var parent = Ext.ComponentQuery.query('#canvas')[0];
                    if (parent.getViewModel().get('x_object') != '') {
                      var object = Ext.getCmp(parent.getViewModel().get('x_object'));
        							if (object.getViewModel().get('x_drag')) {
        								object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-(object.getHeight()/2));
                        var o_posX = Ext.ComponentQuery.query('#object_posx')[0]; o_posX.setValue(object.getX());
                        var o_posY = Ext.ComponentQuery.query('#object_posy')[0]; o_posY.setValue(object.getY());
                        var o_height = Ext.ComponentQuery.query('#object_height')[0]; o_height.setValue(object.getHeight());
                        var o_width = Ext.ComponentQuery.query('#object_width')[0]; o_width.setValue(object.getWidth());
        							}
                    }
      						}
      					}
    					},
    					height: 50,
    					width: 50,
              floating: {
                shadow: false
              },
              renderTo: Ext.getBody(),
    					x: posX,
    					y: posY,
    					bind: {
    						html: '<img src="{x_path}" height={x_height} width={x_width}/>'
    					}
    				});
          }
        });
    },

    onTrashClick: function() {
      var canvas = Ext.ComponentQuery.query('#canvas')[0];
      var object = Ext.getCmp(canvas.getViewModel().get('x_object'));
      Ext.Msg.show({
        title:'Delete Item',
        message: 'Delete last click item ??',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function(btn) {
          if (btn === 'yes') {
            canvas.getViewModel().set('x_object', '');
            // console.log(canvas.remove(object));
            canvas.remove(object);
            Ext.ComponentQuery.query('#object_posx')[0].setValue('');
            Ext.ComponentQuery.query('#object_posy')[0].setValue('');
            Ext.ComponentQuery.query('#object_height')[0].setValue('');
            Ext.ComponentQuery.query('#object_width')[0].setValue('');
          }
        }
      });
    },

    onToolbarObjectValueChange: function(field, e) {
      if (e.getKey() == e.ENTER) {
        var canvas = Ext.ComponentQuery.query('#canvas')[0];
        var object = Ext.getCmp(canvas.getViewModel().get('x_object'));
        var o_posX = Ext.ComponentQuery.query('#object_posx')[0];
        var o_posY = Ext.ComponentQuery.query('#object_posy')[0];
        var o_height = Ext.ComponentQuery.query('#object_height')[0];
        var o_width = Ext.ComponentQuery.query('#object_width')[0];

        // object.setPagePosition(o_posX.getValue(), o_posY.getValue(), true);
        object.setPosition(o_posX.getValue(), o_posY.getValue(), true);
        object.setSize(o_width.getValue(), o_height.getValue());

        // console.log('object = '); console.log(object);
        // console.log('o_posX = ' + o_posX.getValue() + ' o_posY = ' + o_posY.getValue() + ' o_height = ' + o_height.getValue() + ' o_width = ' + o_width.getValue());
      }
    }
});
