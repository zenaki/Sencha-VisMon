Ext.define('VisualMonita.view.vm.editor.canvas.CanvasController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.cvs-controller',

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
        var path = selectedRecord.data.hasOwnProperty('onlocal') ? selectedRecord.data['onlocal'] : selectedRecord.data['uploaded'];
        canvas.add({
  				xtype: 'vm-hmi-object',
  				viewModel: {
  					data: {
  						x_height: 10,
  						x_width: 10,
  						x_drag: false,
              x_path: path,
              x_type: 'item_object'
  					}
  				},
  				bind: {
  					html: '<img src="resources/vm/Local_Items/{x_path}" height={x_height} width={x_width}/>'
  				},
          x: posX,
          y: posY
  			});
        var AllObject = Ext.ComponentQuery.query('#canvas > panel');
        canvas.getViewModel().set('x_object', AllObject[Object.keys(AllObject).length-1].getId());
      }
    });
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
      items: [{
        text: 'Add Label',
        handler: function() {
          me.onAddLabelFormClick(me, view);
        }
      }, {
        text: 'Save Visual Monita',
        handler: function() {
          me.onSaveVisualMonita();
        }
      }, {
        text: 'Load Visual Monita',
        handler: function() {
          me.onLoadVisualMonita();
        }
      }]
    }).showAt(view.getXY());
  },

  onAddLabelFormClick: function(me, view) {
    this.AddLabelWindow = me.getView().add({xtype: 'label-form'});
    this.AddLabelWindow.getViewModel().set('x_POS_X', (view.getX()-me.getView().getX()));
    this.AddLabelWindow.getViewModel().set('x_POS_Y', (view.getY()-me.getView().getY()));
    this.AddLabelWindow.show();
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
                      "xtype"     : "vm-hmi-object",
                      "id"        : "object_"+index_object,
                      "itemId"    : "object_"+index_object,
                      "viewModel" : {
            					  "data" : {
            						  "x_height" : item.getViewModel().get('x_height'),
            							"x_width"  : item.getViewModel().get('x_width'),
            							"x_drag"   : item.getViewModel().get('x_drag'),
                          "x_path"   : item.getViewModel().get('x_path').replace('../', 'resources/vm/'),
                          "x_type"   : "item_object"
            						}
            					},
                      // "resizable" : {
            				  //   "dynamic"     : true,
            					// 	"pinned"      : true,
            					// 	"handles"     : "all",
            					// 	"transparent" : true
            					// },
                      // "listeners" : {
            					// 	"resize" : "onPanelResize",
            					// 	"render" : "onPanelObjectRender",
                      //   "el"     : {
              				// 	  "mousemove" : "onPanelObjectMouseMove"
              				// 	}
            					// },
                      // "floating"  : true,
                      // "shadow"    : false,
                      "renderTo"  : "CanvasID",
                      "bind"      : {
            					  "html" : "<img src=\"{x_path}\" height={x_height} width={x_width}/>"
            					},
                      "height"    : item.getHeight(),
                      "width"     : item.getWidth(),
                      "x"         : (item.getX()-parent.getX()),
                      "y"         : (item.getY()-parent.getY())
                      // "bodyStyle" : "background:transparent;"
                    });
                  } else if (item.getViewModel().get('x_type') == 'item_label') {
                    index_label++;
                    json.items.push({
                      "xtype"       : "vm-label-object",
                      "id"          : "label_"+index_label,
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
                      // "split"       : true,
                      // "collapsible" : true,
                      // "collapsed"   : false,
                      // "floatable"   : false,
                      // "bodyBorder"  : true,
                      // "border"      : 5,
                      // "style"       : {
                      //   "borderStyle" : "solid"
                      // },
                      // "resizable"   : {
            				  //   "dynamic" : true,
            					// 	"pinned"  : true,
            					// 	"handles" : "all"
            					// },
                      // "listeners"   : {
                      //   "resize" : "onPanelResize",
                      //   "render" : "onPanelLabelRender",
                      //   "el"     : {
                      //     "mousemove" : "onPanelLabelMouseMove"
                      //   }
                      // },
                      // "floating"    : true,
                      // "shadow"      : false,
                      "renderTo"    : "CanvasID",
                      "bind"        : {
                        "html" : "<font face=\"courier\" color=\"red\">><h1 style=\"height: 100%; width: 100%; text-align: center; margin: 0; font-size: 2em;\">{VAL_" + item.getViewModel().get('x_slave_id') + item.getViewModel().get('x_titik_ukur') + "}</h1></font>"
                      },
                      "height"      : item.getHeight(),
                      "width"       : item.getWidth(),
                      "x"           : (item.getX()-parent.getX()),
                      "y"           : (item.getY()-parent.getY())
                      // "bodyStyle"   : "background:transparent;"
                    });
                  }
                });

                var form = Ext.create('Ext.form.Panel', {
                  standardSubmit: true,
                  url: 'resources/vm/php/download.php',
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

  onLoadVisualMonita: function() {
    var view = this.getView();
    this.UploadWindow = view.add({xtype: 'vm-canvas-multipleUpload'});
    this.UploadWindow.show();
  }
});
