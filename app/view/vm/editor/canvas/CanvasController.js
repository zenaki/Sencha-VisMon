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

        this.onSetPropertiesSource(object, parent);
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

  getChildMenu: function(me, item, ChildMenu) {
    item.getMenu().items.each(function(ChildItem) {
      if (ChildItem.getMenu()) {
        var ChildMenu2 = {menu: []};
        ChildMenu2 = me.getChildMenu(me, ChildItem, ChildMenu2);
        ChildMenu.menu.push({
          "text": ChildItem.text,
          "viewModel": {
            "data": {
              "x_path": ChildItem.getViewModel().get('x_path')
            }
          },
          "listeners": {
            "click": "onMenuObjectPush",
            "contextmenu": {
              "element": "el",
              "fn": "onMenuRightClick"
            }
          },
          "menu": ChildMenu2.menu
        });
      } else {
        ChildMenu.menu.push({
          "text": ChildItem.text,
          "viewModel": {
            "data": {
              "x_path": ChildItem.getViewModel().get('x_path')
            }
          },
          "listeners": {
            "click": "onMenuObjectPush",
            "contextmenu": {
              "element": "el",
              "fn": "onMenuRightClick"
            }
          }
        });
      }
    });
    return ChildMenu;
  },

  onSaveVisualMonita: function() {
    var me = this;
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
                var button = Ext.ComponentQuery.query('#SegButt > button');
                var json = {
                  items: [],
                  dockedItems: {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                      xtype: 'segmentedbutton',
                      allowToggle: false,
                      itemId: 'SegButt',
                      items: []
                    }, {
                      xtype: 'button',
                      icon: null,
                      glyph: 43,
                      tooltip: 'Add New',
                      handler: 'onAddNewToolBarButton'
                    }]
                  }
                }, index_object = 0, index_label = 0, index_button = 0;
                for (var i = 0; i < Object.keys(button).length; i++) {
                  index_button++;
                  if (button[i].getMenu()) {
                    var button_menu = {menu: []};
                    button[i].getMenu().items.each(function(item) {
                      if (item.getMenu()) {
                        var ChildMenu = {menu: []};
                        ChildMenu = me.getChildMenu(me, item, ChildMenu);
                        button_menu.menu.push({
                          "text": item.text,
                          "viewModel": {
                            "data": {
                              "x_path": item.getViewModel().get('x_path')
                            }
                          },
                          "listeners": {
                            "click": "onMenuObjectPush",
                            "contextmenu": {
                              "element": "el",
                              "fn": "onMenuRightClick"
                            }
                          },
                          "menu": ChildMenu.menu
                        });
                      } else {
                        button_menu.menu.push({
                          "text": item.text,
                          "viewModel": {
                            "data": {
                              "x_path": item.getViewModel().get('x_path')
                            }
                          },
                          "listeners": {
                            "click": "onMenuObjectPush",
                            "contextmenu": {
                              "element": "el",
                              "fn": "onMenuRightClick"
                            }
                          }
                        });
                      }
                    });
                    json.dockedItems.items[0].items.push({
                      "xtype"     : "vm-button-object",
                      "id"        : "button_"+index_button,
                      "itemId"    : "button_"+index_button,
                      "viewModel" : {
                        "data"  : {
                          "button"  : {
                            "x_text"  : button[i].getViewModel().get("button.x_text"),
                            "x_path"  : button[i].getViewModel().get("button.x_path")
                          },
                          "x_type"  : "button_object"
                        }
                      },
                      "menu": button_menu.menu
                    });
                  } else {
                    json.dockedItems.items[0].items.push({
                      "xtype"     : "vm-button-object",
                      "id"        : "button_"+index_button,
                      "itemId"    : "button_"+index_button,
                      "viewModel" : {
                        "data"  : {
                          "button"  : {
                            "x_text"  : button[i].getViewModel().get("button.x_text"),
                            "x_path"  : button[i].getViewModel().get("button.x_path")
                          },
                          "x_type"  : "button_object"
                        }
                      }
                    });
                  }
                }
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
                      "renderTo"  : "CanvasID",
                      "bind"      : {
            					  "html" : "<img src=\"{x_path}\" height={x_height} width={x_width}/>"
            					},
                      "height"    : item.getHeight(),
                      "width"     : item.getWidth(),
                      "x"         : (item.getX()-parent.getX()),
                      "y"         : (item.getY()-parent.getY())
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
                          "x_title"       : item.getViewModel().get('x_title'),
                          "x_slave_id"    : item.getViewModel().get('x_slave_id'),
                          "x_titik_ukur"  : item.getViewModel().get('x_titik_ukur'),
                          "x_font"        : item.getViewModel().get('x_font'),
                          "x_size"        : item.getViewModel().get('x_size'),
                          "x_color"       : item.getViewModel().get('x_color'),
                          "x_align"       : item.getViewModel().get('x_align'),
                          "x_margin"      : item.getViewModel().get('x_margin'),
                          "x_ba_1"        : item.getViewModel().get('x_ba_1'),
                          "x_wba_1"       : item.getViewModel().get('x_wba_1'),
                          "x_ba_2"        : item.getViewModel().get('x_ba_2'),
                          "x_wba_2"       : item.getViewModel().get('x_wba_2'),
                          "x_bb_1"        : item.getViewModel().get('x_bb_1'),
                          "x_wbb_1"       : item.getViewModel().get('x_wbb_1'),
                          "x_bb_2"        : item.getViewModel().get('x_bb_2'),
                          "x_wbb_2"       : item.getViewModel().get('x_wbb_2')
                        }
                      },
                      "renderTo"    : "CanvasID",
                      "bind": {
                        "title": "{x_title}",
                        "html": "<font face=\"{x_font}\" color=\"{x_color}\"><h1 style=\"height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};\">{VAL_" + item.getViewModel().get('x_slave_id') + item.getViewModel().get('x_titik_ukur') + "}</h1></font>"
                      },
                      "height"      : item.getHeight(),
                      "width"       : item.getWidth(),
                      "x"           : (item.getX()-parent.getX()),
                      "y"           : (item.getY()-parent.getY())
                    });
                  }
                });

                console.log('json = '); console.log(json);

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
  },

  onSetPropertiesSource: function(me, parent) {
    var prop = Ext.ComponentQuery.query('#properties')[0];
    if (me.getViewModel().get('x_type') == 'item_object') {
      prop.setBind({
        source: {
          label_01: '{x_ItemId}',
          label_02: '{x_Height}',
          label_03: '{x_Width}',
          label_04: '{x_POS_X}',
          label_05: '{x_POS_Y}'
        }
      });
      prop.getViewModel().set('x_ItemId', me.getItemId());
      prop.getViewModel().set('x_Height', me.getHeight());
      prop.getViewModel().set('x_Width', me.getWidth());
      prop.getViewModel().set('x_POS_X', me.getX() - parent.getX());
      prop.getViewModel().set('x_POS_Y', me.getY() - parent.getY());
    } else if (me.getViewModel().get('x_type') == 'item_label') {
      prop.setBind({
        source: {
          label_01: '{x_ItemId}',
          label_02: '{x_Height}',
          label_03: '{x_Width}',
          label_04: '{x_POS_X}',
          label_05: '{x_POS_Y}',
          label_06: '{x_Title}',
          label_07: '{x_Slave_ID}',
          label_08: '{x_Titik_Ukur}',
          label_09: '{x_Font}',
          label_10: '{x_Font_Size}',
          label_11: '{x_Color}',
          label_12: '{x_Align}',
          label_13: '{x_Margin}',
          label_14: '{x_Batas_Atas_2}',
          label_15: '{x_Warna_Batas_Atas_2}',
          label_16: '{x_Batas_Atas_1}',
          label_17: '{x_Warna_Batas_Atas_1}',
          label_18: '{x_Batas_Bawah_1}',
          label_19: '{x_Warna_Batas_Bawah_1}',
          label_20: '{x_Batas_Bawah_2}',
          label_21: '{x_Warna_Batas_Bawah_2}'
        }
      });
      prop.getViewModel().set('x_ItemId', me.getItemId());
      prop.getViewModel().set('x_Height', me.getHeight());
      prop.getViewModel().set('x_Width', me.getWidth());
      prop.getViewModel().set('x_POS_X', me.getX() - parent.getX());
      prop.getViewModel().set('x_POS_Y', me.getY() - parent.getY());
      prop.getViewModel().set('x_Title', me.getViewModel().get('x_title'));
      prop.getViewModel().set('x_Slave_ID', me.getViewModel().get('x_slave_id'));
      prop.getViewModel().set('x_Titik_Ukur', me.getViewModel().get('x_titik_ukur'));
      prop.getViewModel().set('x_Font', me.getViewModel().get('x_font'));
      prop.getViewModel().set('x_Font_Size', me.getViewModel().get('x_size'));
      prop.getViewModel().set('x_Color', me.getViewModel().get('x_color'));
      prop.getViewModel().set('x_Align', me.getViewModel().get('x_align'));
      prop.getViewModel().set('x_Margin', me.getViewModel().get('x_margin'));
      prop.getViewModel().set('x_Batas_Atas_2', me.getViewModel().get('x_ba_2'));
      prop.getViewModel().set('x_Warna_Batas_Atas_2', me.getViewModel().get('x_wba_2'));
      prop.getViewModel().set('x_Batas_Atas_1', me.getViewModel().get('x_ba_1'));
      prop.getViewModel().set('x_Warna_Batas_Atas_1', me.getViewModel().get('x_wba_1'));
      prop.getViewModel().set('x_Batas_Bawah_1', me.getViewModel().get('x_bb_1'));
      prop.getViewModel().set('x_Warna_Batas_Bawah_1', me.getViewModel().get('x_wbb_1'));
      prop.getViewModel().set('x_Batas_Bawah_2', me.getViewModel().get('x_bb_2'));
      prop.getViewModel().set('x_Warna_Batas_Bawah_2', me.getViewModel().get('x_wbb_2'));
    }
    prop.setDisabled(false);
  },

  onAddNewToolBarButton: function() {
    this.AddButtonWindow = this.getView().add({xtype: 'button-form'});
    this.AddButtonWindow.getViewModel().set('x_itemID', '');
    this.AddButtonWindow.show();
  }
});
