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
            var result = Ext.ComponentQuery.query('#result')[0];
            result.setValue(data);
            if (me.isJSON(data)) {
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
          }
    		}
      });
      me.ws.close();
    },

    onSpecialKey: function (tf, evt) {
      if (evt.getKey () === evt.ENTER) {
        this.openConnection();
      }
    },

    openConnection: function() {
      var me = this;
  		var websocket_panel = me.lookupReference('p_webSocket');
      var value = websocket_panel.getForm().getValues();
      value = {url: value.URL};
      var url = value.url;

      me.ws.setConfig({url: url});

      me.ws.open();
    },

    closeConnection: function() {
      var me = this;
      me.ws.close();
    },

    onCanvasMouseMove: function(me, e, eOpts) {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      if (parent.getViewModel().get('x_object') != '') {
        var AllObject = Ext.ComponentQuery.query('#canvas > panel');
        for (var i = 0; i < Object.keys(AllObject).length; i++) {
          if (AllObject[i].getId() == parent.getViewModel().get('x_object')) {
            // AllObject[i].el.setStyle({backgroundImage: 'url(border-image.png)', backgroundRepeat: 'no-repeat'});
            AllObject[i].el.setStyle({backgroundColor: '#c1ddf1'});
          } else {
            // AllObject[i].el.setStyle({backgroundImage: 'url(border-image-null.png)'});
            AllObject[i].el.setStyle({backgroundColor: '#fff'});
          }
        }
        var object = Ext.getCmp(parent.getViewModel().get('x_object'));
        if (object.getViewModel().get('x_drag')) {
          if (object.getHeader()) {
            object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-20);
          } else {
            object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-(object.getHeight()/2));
          }

          var prop = Ext.ComponentQuery.query('#properties')[0];
          prop.getViewModel().set('x_ItemId', object.getItemId());
          prop.getViewModel().set('x_Height', object.getHeight());
          prop.getViewModel().set('x_Width', object.getWidth());
          prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
          prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
          prop.setDisabled(false);
        }
      }
    },

    onCanvasRightClick: function(view, e, element) {
      view.stopEvent();
      var me = this;
      Ext.create('Ext.menu.Menu', {
        width: 100,
        plain: true,
        floating: true,
        renderTo: Ext.getBody(),
        items: [{
          text: 'Add Label',
          handler: function() {
            me.onAddLabelFormClick(me, view);
          }
        }]
      }).showAt(view.getXY());
    },

    onBoxReady: function() {
      var canvas = Ext.ComponentQuery.query('#canvas')[0];
      this.CanvasDropTarget = new Ext.dd.DropTarget(canvas.body, {
        ddGroup: 'hmi-grid-to-panel',
        notifyEnter: function(ddSource, e, data) {
          canvas.body.stopAnimation();
          canvas.body.highlight();
        },
        notifyDrop: function(ddSource, e, data) {
          var canvas = Ext.ComponentQuery.query('#canvas')[0];
          var selectedRecord = ddSource.dragData.records[0];
          var posX = e.getX() - canvas.getX();
          var posY = e.getY() - canvas.getY(); // - 35;
          canvas.add({
    				xtype: 'panel',
    				viewModel: {
    					data: {
    						x_height: 10,
    						x_width: 10,
    						x_drag: false,
                x_path: selectedRecord.data.hasOwnProperty('onlocal') ? selectedRecord.data['onlocal'] : selectedRecord.data['uploaded-Items'],
                x_type: 'item_object'
    					}
    				},
    				resizable: {
    					dynamic: true,
    					pinned: true,
    					handles: 'all',
    					transparent: true
    				},
    				listeners: {
    					resize: 'onPanelResize',
    					render: 'onPanelObjectRender',
              el: {
      					mousemove: 'onPanelObjectMouseMove',
                contextmenu: 'onObjectRightClick'
      				}
    				},
    				height: 50,
    				width: 50,
            floating: true,
            shadow: false,
            renderTo: 'CanvasID',
            bodyStyle: 'background:transparent;',
    				x: posX,
    				y: posY,
    				bind: {
    					html: '<img src="{x_path}" height={x_height} width={x_width}/>'
    				}
    			});
          var AllObject = Ext.ComponentQuery.query('#canvas > panel');
          canvas.getViewModel().set('x_object', AllObject[Object.keys(AllObject).length-1].getId());
        }
      });
    },

    onPropertyChange: function(source, recordId, value, oldValue, eOpts) {
      console.log('source = '); console.log(source);
      console.log('recordId = ' + recordId + ' value = ' + value + ' oldValue = ' + oldValue);
      var object = Ext.getCmp(source.label_1);
      if (recordId == 'label_1') object = Ext.getCmp(oldValue);
      object.setPosition(source.label_4, source.label_5, true);
      object.setSize(source.label_3, source.label_2);
      object.setConfig('itemId', source.label_1);
    },

    onSaveVisualMonita: function() {
      Ext.Msg.show({
        title: 'Visual Monita',
        message: 'Download Visual Monita  From Editor ??',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function(btn) {
          if (btn === 'yes') {
            Ext.Msg.show({
              title: 'Download File ..',
              message: 'Download JSON File and add to your Visual Monita Path ..',
              buttons: Ext.Msg.OKCANCEL,
              fn: function(btn) {
                if (btn == 'ok') {
                  var parent = Ext.ComponentQuery.query('#canvas')[0];
                  var canvas = Ext.ComponentQuery.query('#canvas > panel');
                  var json = {items: []}, index_object = 0, index_label = 0;
                  Ext.Array.each(canvas, function(item) {
                    if (item.getViewModel().get('x_type') == 'item_object') {
                      index_object++;
                      json.items.push({
                        "xtype"     : "panel",
                        "id"        : "object_"+index_object,
                        "itemId"    : "object_"+index_object,
                        "viewModel" : {
              					  "data" : {
              						  "x_height" : item.getViewModel().get('x_height'),
              							"x_width"  : item.getViewModel().get('x_width'),
              							"x_drag"   : item.getViewModel().get('x_drag'),
                            "x_path"   : item.getViewModel().get('x_path'),
                            "x_type"   : "item_object"
              						}
              					},
                        "resizable" : {
              				    "dynamic"     : true,
              						"pinned"      : true,
              						"handles"     : "all",
              						"transparent" : true
              					},
                        "listeners" : {
              						"resize" : "onPanelResize",
              						"render" : "onPanelObjectRender",
                          "el"     : {
                					  "mousemove" : "onPanelObjectMouseMove"
                					}
              					},
                        "floating"  : true,
                        "shadow"    : false,
                        "renderTo"  : "CanvasID",
                        "bind"      : {
              					  "html" : "<img src=\"{x_path}\" height={x_height} width={x_width}/>"
              					},
                        "height"    : item.getHeight(),
                        "width"     : item.getWidth(),
                        "x"         : (item.getX()-parent.getX()),
                        "y"         : (item.getY()-parent.getY()),
                        "bodyStyle" : "background:transparent;"
                      });
                    } else if (item.getViewModel().get('x_type') == 'item_label') {
                      index_label++;
                      json.items.push({
                        "xtype"       : "panel",
                        "id"        : "object_"+index_label,
                        "itemId"      : "label_"+index_label,
                        "viewModel"   : {
                          "data" : {
                            "x_height"      : item.getViewModel().get('x_height'),
                            "x_width"       : item.getViewModel().get('x_width'),
                            "x_drag"        : item.getViewModel().get('x_drag'),
                            "x_type"        : "item_label",
                            "x_slave_id"    : item.getViewModel().get('x_slave_id'),
                            "x_titik_ukur"  : item.getViewModel().get('x_titik_ukur')
                          }
                        },
                        "title"       : this.getTitle(),
                        "split"       : true,
                        "collapsible" : true,
                        "collapsed"   : false,
                        "floatable"   : false,
                        "bodyBorder"  : true,
                        "border"      : 5,
                        "style"       : {
                          "borderStyle" : "solid"
                        },
                        "resizable"   : {
              				    "dynamic" : true,
              						"pinned"  : true,
              						"handles" : "all"
              					},
                        "listeners"   : {
                          "resize" : "onPanelResize",
                          "render" : "onPanelLabelRender",
                          "el"     : {
                            "mousemove" : "onPanelLabelMouseMove"
                          }
                        },
                        "floating"    : true,
                        "shadow"      : false,
                        "renderTo"    : "CanvasID",
                        "bind"        : {
                          "html" : "<font face=\"courier\" color=\"red\">><h1 style=\"height: 100%; width: 100%; text-align: center; margin: 0; font-size: 2em;\">{VAL_" + item.getViewModel().get('x_slave_id') + item.getViewModel().get('x_titik_ukur') + "}</h1></font>"
                        },
                        "height"      : item.getHeight(),
                        "width"       : item.getWidth(),
                        "x"           : (item.getX()-parent.getX()),
                        "y"           : (item.getY()-parent.getY()),
                        "bodyStyle"   : "background:transparent;"
                      });
                    }
                  });

                  var form = Ext.create('Ext.form.Panel', {
                    standardSubmit: true,
                    url: 'download.php',
                    method: 'POST'
                  });

                  form.submit({
                    // target: '_blank', // Avoids leaving the page.
                    params: {
                      data: Ext.encode(json)
                    }
                  });

                  // Clean-up the form after 100 milliseconds.
                  // Once the submit is called, the browser does not care anymore with the form object.
                  Ext.defer(function(){
                    form.close();
                    form.destroy();
                  }, 100);
                }
              }
            });
          }
        }
      });
    },

    onloadVisualMonitaEditor: function () {
      var win = Ext.widget({
        xtype: 'window',
        title: 'Files upload form',
        width: 350,
        autoShow: true,
        modal: true,
        items: {
          xtype: 'form',
          border: false,
          bodyStyle: {
            padding: '10px'
          },
          items: {
            xtype: 'filefield',
            name: 'visualFiles[]',
            hideLabel: true,
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Browse File(s)...',
            listeners: {
              render: function(cmp) {
                cmp.fileInputEl.set({
                  multiple: true,
                  accept: '.json'
                });
              }
            }
          }
        },
        buttons: [{
          text: 'Upload',
          handler: function() {
            var form = win.down('form').getForm();
            if (form.isValid()) {
              form.submit({
                url: 'load_visual_monita.php',
                waitMsg: 'Loading File(s)...',
                success: function(fp, o) {
                  Ext.Ajax.request({
                    url: 'visual_files/Visual_Monita.json',
                    success: function(response){
                      var JSON_Items = Ext.JSON.decode(response.responseText);
                      var canvas = Ext.ComponentQuery.query('#canvas')[0];
                      canvas.removeAll();
                      canvas.add(JSON_Items.items);
                    }
                  });
                  Ext.Msg.alert('Success', 'File "' + o.result.file + '" has been loaded.');
                  win.close();
                },
                failure: function(fp, o) {
                  Ext.Msg.alert('Failure', o.result.file || ' - server error', function () {
                    win.close();
                  });
                }
              });
            }
          }
        },{
          text: 'Cancel',
          handler: function () {
            win.close();
          }
        }]
      });
    },

    onloadVisualMonita: function() {
      var win = Ext.widget({
        xtype: 'window',
        title: 'Files upload form',
        width: 350,
        autoShow: true,
        modal: true,
        items: {
          xtype: 'form',
          border: false,
          bodyStyle: {
            padding: '10px'
          },
          items: {
            xtype: 'filefield',
            name: 'visualFiles[]',
            hideLabel: true,
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Browse File(s)...',
            listeners: {
              render: function(cmp) {
                cmp.fileInputEl.set({
                  multiple: true,
                  accept: '.json'
                });
              }
            }
          }
        },
        buttons: [{
          text: 'Upload',
          handler: function() {
            var form = win.down('form').getForm();
            if (form.isValid()) {
              form.submit({
                url: 'load_visual_monita.php',
                waitMsg: 'Loading File(s)...',
                success: function(fp, o) {
                  Ext.Ajax.request({
                    url: 'visual_files/Visual_Monita.json',
                    success: function(response){
                      var JSON_Items = Ext.JSON.decode(response.responseText);
                      var visual_monita = Ext.ComponentQuery.query('#visual_monita')[0];
                      visual_monita.removeAll();
                      for (var i = 0; i < Object.keys(JSON_Items.items).length; i++) {
                        delete JSON_Items.items[i].resizable;
                        delete JSON_Items.items[i].listeners;
                        // delete JSON_Items.items[i].bodyStyle;
                        // delete JSON_Items.items[i].floating;
                        // delete JSON_Items.items[i].shadow;
                        JSON_Items.items[i].renderTo = 'visual_monita';
                      }
                      visual_monita.add(JSON_Items.items);
                    }
                  });
                  Ext.Msg.alert('Success', 'File "' + o.result.file + '" has been loaded.');
                  win.close();
                },
                failure: function(fp, o) {
                  Ext.Msg.alert('Failure', o.result.file || ' - server error', function () {
                    win.close();
                  });
                }
              });
            }
          }
        },{
          text: 'Cancel',
          handler: function () {
            win.close();
          }
        }]
      });
    },

    onPanelResize: function(me, width, height, e, eOpts) {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      me.getViewModel().set('x_height', height);
      me.getViewModel().set('x_width', width);

      var prop = Ext.ComponentQuery.query('#properties')[0];
      prop.getViewModel().set('x_ItemId', me.getItemId());
      prop.getViewModel().set('x_Height', me.getHeight());
      prop.getViewModel().set('x_Width', me.getWidth());
      prop.getViewModel().set('x_POS_X', me.getX() - parent.getX());
      prop.getViewModel().set('X_POS_Y', me.getY() - parent.getY());
      prop.setDisabled(false);
    },

    onPanelObjectRender: function(panel) {
      panel.body.on('dblclick', function() {
        var parent = Ext.ComponentQuery.query('#canvas')[0];
        parent.getViewModel().set('x_object', panel.id);
        var object = Ext.getCmp(panel.id);
        if (!object.getViewModel().get('x_drag')) {
          object.getViewModel().set('x_drag', true);
        }

        var prop = Ext.ComponentQuery.query('#properties')[0];
        prop.getViewModel().set('x_ItemId', object.getItemId());
        prop.getViewModel().set('x_Height', object.getHeight());
        prop.getViewModel().set('x_Width', object.getWidth());
        prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
        prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
        prop.setDisabled(false);
      });

      panel.body.on('click', function() {
        var parent = Ext.ComponentQuery.query('#canvas')[0];
        parent.getViewModel().set('x_object', panel.id);
        var object = Ext.getCmp(panel.id);
        if (object.getViewModel().get('x_drag')) {
          object.getViewModel().set('x_drag', false);
        }

        var prop = Ext.ComponentQuery.query('#properties')[0];
        prop.getViewModel().set('x_ItemId', object.getItemId());
        prop.getViewModel().set('x_Height', object.getHeight());
        prop.getViewModel().set('x_Width', object.getWidth());
        prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
        prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
        prop.setDisabled(false);
      });
    },

    onPanelLabelRender: function(panel) {
      panel.body.on('dblclick', function() {
        var parent = Ext.ComponentQuery.query('#canvas')[0];
        parent.getViewModel().set('x_object', panel.id);
        var object = Ext.getCmp(panel.id);
        if (!object.getViewModel().get('x_drag')) {
          object.getViewModel().set('x_drag', true);
        }

        var prop = Ext.ComponentQuery.query('#properties')[0];
        prop.getViewModel().set('x_ItemId', object.getItemId());
        prop.getViewModel().set('x_Height', object.getHeight());
        prop.getViewModel().set('x_Width', object.getWidth());
        prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
        prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
        prop.setDisabled(false);
      });

      panel.body.on('click', function() {
        var parent = Ext.ComponentQuery.query('#canvas')[0];
        parent.getViewModel().set('x_object', panel.id);
        var object = Ext.getCmp(panel.id);
        if (object.getViewModel().get('x_drag')) {
          object.getViewModel().set('x_drag', false);
        }

        var prop = Ext.ComponentQuery.query('#properties')[0];
        prop.getViewModel().set('x_ItemId', object.getItemId());
        prop.getViewModel().set('x_Height', object.getHeight());
        prop.getViewModel().set('x_Width', object.getWidth());
        prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
        prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
        prop.setDisabled(false);
      });

      panel.header.on('dblclick', function() {
        var parent = Ext.ComponentQuery.query('#canvas')[0];
        parent.getViewModel().set('x_object', panel.id);
        var object = Ext.getCmp(panel.id);
        if (!object.getViewModel().get('x_drag')) {
          object.getViewModel().set('x_drag', true);
        }

        var prop = Ext.ComponentQuery.query('#properties')[0];
        prop.getViewModel().set('x_ItemId', object.getItemId());
        prop.getViewModel().set('x_Height', object.getHeight());
        prop.getViewModel().set('x_Width', object.getWidth());
        prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
        prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
        prop.setDisabled(false);
      });

      panel.header.on('click', function() {
        var parent = Ext.ComponentQuery.query('#canvas')[0];
        parent.getViewModel().set('x_object', panel.id);
        var object = Ext.getCmp(panel.id);
        if (object.getViewModel().get('x_drag')) {
          object.getViewModel().set('x_drag', false);
        }

        var prop = Ext.ComponentQuery.query('#properties')[0];
        prop.getViewModel().set('x_ItemId', object.getItemId());
        prop.getViewModel().set('x_Height', object.getHeight());
        prop.getViewModel().set('x_Width', object.getWidth());
        prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
        prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
        prop.setDisabled(false);
      });
    },

    // onPanelClickOrDblClick: function(panel_id, status) {
    //   var parent = Ext.ComponentQuery.query('#canvas')[0];
    //   parent.getViewModel().set('x_object', panel_id);
    //   var object = Ext.getCmp(panel_id);
    //   if (object.getViewModel().get('x_drag')) {
    //     object.getViewModel().set('x_drag', status);
    //   }
    // },

    onPanelObjectMouseMove: function(me, e, eOpts) {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      if (parent.getViewModel().get('x_object') != '') {
        var object = Ext.getCmp(parent.getViewModel().get('x_object'));
        if (object.getViewModel().get('x_drag')) {
          object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-(object.getHeight()/2)); // Center of Panel Body

          var prop = Ext.ComponentQuery.query('#properties')[0];
          prop.getViewModel().set('x_ItemId', object.getItemId());
          prop.getViewModel().set('x_Height', object.getHeight());
          prop.getViewModel().set('x_Width', object.getWidth());
          prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
          prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
          prop.setDisabled(false);
        }
      }
    },

    onPanelLabelMouseMove: function(me, e, eOpts) {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      if (parent.getViewModel().get('x_object') != '') {
        var object = Ext.getCmp(parent.getViewModel().get('x_object'));
        if (object.getViewModel().get('x_drag')) {
          object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-20); // Center of Header

          var prop = Ext.ComponentQuery.query('#properties')[0];
          prop.getViewModel().set('x_ItemId', object.getItemId());
          prop.getViewModel().set('x_Height', object.getHeight());
          prop.getViewModel().set('x_Width', object.getWidth());
          prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
          prop.getViewModel().set('X_POS_Y', object.getY() - parent.getY());
          prop.setDisabled(false);
        }
      }
    },

    onAddLabelFormClick: function(me, view) {
      var AddLableWindow = Ext.widget({
        xtype: 'window',
        title: 'Add Label',
        itemId: 'Addlabel',
        modal: true,
        width: 500,
        autoShow: true,
        items: {
          xtype: 'form',
          border: false,
          bodyStyle: {
            padding: '10px'
          },
          items: [{
            xtype: 'textfield',
            itemId: 'label_vismon',
            fieldLabel: 'Label',
            allowBlank: false
          }, {
            xtype: 'textfield',
            itemId: 'slave_id_vismon',
            fieldLabel: 'Slave ID',
            allowBlank: false
          }, {
            xtype: 'textfield',
            itemId: 'titik_ukur_vismon',
            fieldLabel: 'Titik Ukur',
            allowBlank: false
          }]
        },
        buttons: [{
          text: 'Add',
          handler: function() {
            var canvas = Ext.ComponentQuery.query('#canvas')[0];
            var label = Ext.ComponentQuery.query('#label_vismon')[0];
            var slave_id = Ext.ComponentQuery.query('#slave_id_vismon')[0];
            var titik_ukur = Ext.ComponentQuery.query('#titik_ukur_vismon')[0];
            me.onAddLabelClick(canvas, (view.getX()-canvas.getX()), (view.getY()-canvas.getY()), label, slave_id, titik_ukur);
            AddLableWindow.close();
          }
        }, {
          text: 'Cancel',
          handler: function () {
            AddLableWindow.close();
          }
        }]
      });
    },

    onAddLabelClick: function(canvas, xpos, ypos, label, slave_id, titik_ukur) {
      canvas.add({
        xtype: 'panel',
        title: label.getValue(),
        viewModel: {
          data: {
            x_height: 10,
            x_width: 10,
            x_drag: false,
            x_type: 'item_label',
            x_slave_id: slave_id.getValue(),
            x_titik_ukur: titik_ukur.getValue()
          }
        },
        split: true,
        collapsible: true,
        collapsed: false,
        floatable: false,
        bodyBorder: true,
        border: 5,
        style: {
          borderStyle: 'solid'
        },
        height: 100,
        width: 150,
        x: xpos,
        y: ypos,
        bodyStyle: 'background:transparent;',
        resizable: {
          dynamic: true,
          pinned: true,
          handles: 'all'
        },
        items: {
          xtype: 'label',
          itemId: 'VAL_' + slave_id.getValue() + titik_ukur.getValue(),
          margin: 0,
          padding: 0,
          bind: {
            html: '<font face="courier" color="red">><h1 style="height: 100%; width: 100%; text-align: center; margin: 0; font-size: 2em;">{VAL_' + slave_id.getValue() + titik_ukur.getValue() + '}</h1></font>'
          }
        },
        bind: {
          html: '<font face="courier" color="red">><h1 style="height: 100%; width: 100%; text-align: center; margin: 0; font-size: 2em;">{VAL_' + slave_id.getValue() + titik_ukur.getValue() + '}</h1></font>'
        },
        floating: true,
        renderTo: 'CanvasID',
        listeners: {
          resize: 'onPanelResize',
          render: 'onPanelLabelRender',
          el: {
            mousemove: 'onPanelLabelMouseMove',
            contextmenu: 'onObjectRightClick'
          }
        }
      });
    },

    onObjectRightClick: function(view, e, element) {
      // console.log('view.currentTarget = '); console.log(view.currentTarget.id);
      view.stopEvent();
      var me = this;
      Ext.create('Ext.menu.Menu', {
        width: 100,
        plain: true,
        floating: true,
        renderTo: Ext.getBody(),
        items: [{
          text: 'Delete Item',
          handler: function() {
            var canvas = Ext.ComponentQuery.query('#canvas')[0];
            var object = Ext.getCmp(view.currentTarget.id);
            Ext.Msg.show({
              title:'Delete Item',
              message: 'Delete item ??',
              buttons: Ext.Msg.YESNO,
              icon: Ext.Msg.QUESTION,
              fn: function(btn) {
                if (btn === 'yes') {
                  canvas.getViewModel().set('x_object', '');
                  canvas.remove(object);

                  var prop = Ext.ComponentQuery.query('#properties')[0];
                  prop.getViewModel().set('x_ItemId', '');
                  prop.getViewModel().set('x_Height', '');
                  prop.getViewModel().set('x_Width', '');
                  prop.getViewModel().set('x_POS_X', '');
                  prop.getViewModel().set('X_POS_Y', '');
                  prop.setDisabled(true);
                }
              }
            });
          }
        }]
      }).showAt(view.getXY());
    }
});
