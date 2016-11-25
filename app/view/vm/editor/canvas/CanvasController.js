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
      renderTo: Ext.getBody(),
      items: [{
        text: 'Add Label',
        handler: function() {
          me.onAddLabelFormClick(me, view);
        }
      }, {
        text: 'Save Visual Monita'
      }, {
        text: 'Load Visual Monita'
      }]
    }).showAt(view.getXY());
  },

  onAddLabelFormClick: function(me, view) {
    this.AddLabelWindow = me.getView().add({xtype: 'label-form'});
    this.AddLabelWindow.getViewModel().set('x_POS_X', (view.getX()-me.getView().getX()));
    this.AddLabelWindow.getViewModel().set('x_POS_Y', (view.getY()-me.getView().getY()));
    this.AddLabelWindow.show();
  }
});
