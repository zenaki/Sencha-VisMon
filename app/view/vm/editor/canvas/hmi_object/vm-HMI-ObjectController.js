Ext.define('VisualMonita.view.vm.editor.canvas.hmi_object.vm-HMI-ObjectController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-hmi-controller',

  onPanelObjectResize: function(me, width, height, e, eOpts) {
    var parent = Ext.ComponentQuery.query('#canvas')[0];
    me.getViewModel().set('x_height', height);
    me.getViewModel().set('x_width', width);

    this.onSetPropertiesSource(me, parent);
  },

  onPanelObjectRender: function(panel) {
    panel.body.on('dblclick', function() {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      parent.getViewModel().set('x_object', panel.id);
      var object = Ext.getCmp(panel.id);
      if (!object.getViewModel().get('x_drag')) {
        object.getViewModel().set('x_drag', true);
      }

      object.getController().onSetPropertiesSource(object, parent);
    });

    panel.body.on('click', function() {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      parent.getViewModel().set('x_object', panel.id);
      var object = Ext.getCmp(panel.id);
      if (object.getViewModel().get('x_drag')) {
        object.getViewModel().set('x_drag', false);
      }

      object.getController().onSetPropertiesSource(object, parent);
    });
  },

  onPanelObjectMouseMove: function(me, e, eOpts) {
    var parent = Ext.ComponentQuery.query('#canvas')[0];
    if (parent.getViewModel().get('x_object') != '') {
      var object = Ext.getCmp(parent.getViewModel().get('x_object'));
      if (object.getViewModel().get('x_drag')) {
        object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-(object.getHeight()/2)); // Center of Panel Body

        this.onSetPropertiesSource(object, parent);
      }
    }
  },

  onPanelObjectRightClick: function(view, e, element) {
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
                prop.setBind({
                  source: {
                    label_01: '{x_ItemId}',
                    label_02: '{x_Height}',
                    label_03: '{x_Width}',
                    label_04: '{x_POS_X}',
                    label_05: '{x_POS_Y}'
                  }
                });
                prop.getViewModel().set('x_ItemId', '');
                prop.getViewModel().set('x_Height', '');
                prop.getViewModel().set('x_Width', '');
                prop.getViewModel().set('x_POS_X', '');
                prop.getViewModel().set('x_POS_Y', '');
                prop.setDisabled(true);
              }
            }
          });
        }
      }, {
        text: 'Add Label Point',
        handler: function() {
          this.AddLabelWindow = me.getView().add({xtype: 'label-form'});
          this.AddLabelWindow.getViewModel().set('x_POS_X', (view.getX()-me.getView().getX()));
          this.AddLabelWindow.getViewModel().set('x_POS_Y', (view.getY()-me.getView().getY()));
          this.AddLabelWindow.getViewModel().set('x_ItemId', view.currentTarget.id);
          this.AddLabelWindow.show();
        }
      }]
    }).showAt(view.getXY());
  },

  onSetPropertiesSource: function(me, parent) {
    var prop = Ext.ComponentQuery.query('#properties')[0];
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
    prop.setDisabled(false);
  }
});
