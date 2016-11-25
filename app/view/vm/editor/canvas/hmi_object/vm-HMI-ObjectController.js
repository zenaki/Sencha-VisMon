Ext.define('VisualMonita.view.vm.editor.canvas.hmi_object.vm-HMI-ObjectController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-hmi-controller',

  onPanelObjectResize: function(me, width, height, e, eOpts) {
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
