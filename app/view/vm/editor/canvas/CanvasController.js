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
        canvas.add({
  				xtype: 'vm-hmi-object',
  				viewModel: {
  					data: {
  						x_height: 10,
  						x_width: 10,
  						x_drag: false,
              x_path: selectedRecord.data.hasOwnProperty('onlocal') ? selectedRecord.data['onlocal'] : selectedRecord.data['uploaded-Items'],
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
        text: 'Save Visual Monita'
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

  onLoadVisualMonita: function() {
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
              url: 'resources/vm/php/load_visual_monita.php',
              waitMsg: 'Loading File(s)...',
              success: function(fp, o) {
                Ext.Ajax.request({
                  url: 'resources/vm/Visual_Items/Visual_Monita.json',
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
  }
});
