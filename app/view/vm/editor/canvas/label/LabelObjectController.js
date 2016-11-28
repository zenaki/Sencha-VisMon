Ext.define('VisualMonita.view.vm.editor.canvas.label.LabelObjectController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.lbl-obj-controller',

  onPanelResize: function(me, width, height, e, eOpts) {
    var parent = Ext.ComponentQuery.query('#canvas')[0];
    me.getViewModel().set('x_height', height);
    me.getViewModel().set('x_width', width);

    this.onSetPropertiesSource(me, parent);
  },

  onPanelLabelRender: function(panel) {
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

    panel.header.on('dblclick', function() {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      parent.getViewModel().set('x_object', panel.id);
      var object = Ext.getCmp(panel.id);
      if (!object.getViewModel().get('x_drag')) {
        object.getViewModel().set('x_drag', true);
      }

      object.getController().onSetPropertiesSource(object, parent);
    });

    panel.header.on('click', function() {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      parent.getViewModel().set('x_object', panel.id);
      var object = Ext.getCmp(panel.id);
      if (object.getViewModel().get('x_drag')) {
        object.getViewModel().set('x_drag', false);
      }

      object.getController().onSetPropertiesSource(object, parent);
    });
  },

  onPanelLabelMouseMove: function(me, e, eOpts) {
    var parent = Ext.ComponentQuery.query('#canvas')[0];
    if (parent.getViewModel().get('x_object') != '') {
      var object = Ext.getCmp(parent.getViewModel().get('x_object'));
      if (object.getViewModel().get('x_drag')) {
        object.setPagePosition(me.getX()-(object.getWidth()/2), me.getY()-20); // Center of Header

        this.onSetPropertiesSource(object, parent);
      }
    }
  },

  onLabelRightClick: function(view, e, element) {
    // console.log('view.currentTarget = '); console.log(view.currentTarget.id);
    view.stopEvent();
    var me = this;
    Ext.create('Ext.menu.Menu', {
      width: 100,
      plain: true,
      floating: true,
      renderTo: Ext.getBody(),
      items: [{
        text: 'Delete Label',
        handler: function() {
          var canvas = Ext.ComponentQuery.query('#canvas')[0];
          var object = Ext.getCmp(view.currentTarget.id);
          Ext.Msg.show({
            title:'Delete Label',
            message: 'Delete Label ??',
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
                    label_05: '{x_POS_Y}',
                    label_06: '{x_Title}',
                    label_07: '{x_Slave_ID}',
                    label_08: '{x_Titik_Ukur}',
                    label_09: '{x_Font}',
                    label_10: '{x_Font_Size}',
                    label_11: '{x_Color}',
                    label_12: '{x_Align}',
                    label_13: '{x_Margin}'
                  }
                });
                prop.getViewModel().set('x_ItemId', 'N/A');
                prop.getViewModel().set('x_Height', 0);
                prop.getViewModel().set('x_Width', 0);
                prop.getViewModel().set('x_POS_X', 0);
                prop.getViewModel().set('x_POS_Y', 0);
                prop.getViewModel().set('x_Title', 'N/A');
                prop.getViewModel().set('x_Slave_ID', 0);
                prop.getViewModel().set('x_Titik_Ukur', 0);
                prop.getViewModel().set('x_Font', 'N/A');
                prop.getViewModel().set('x_Font_Size', 'N/A');
                prop.getViewModel().set('x_Color', 'N/A');
                prop.getViewModel().set('x_Align', 'N/A');
                prop.getViewModel().set('x_Margin', 0);
                prop.setDisabled(true);
              }
            }
          });
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
        label_05: '{x_POS_Y}',
        label_06: '{x_Title}',
        label_07: '{x_Slave_ID}',
        label_08: '{x_Titik_Ukur}',
        label_09: '{x_Font}',
        label_10: '{x_Font_Size}',
        label_11: '{x_Color}',
        label_12: '{x_Align}',
        label_13: '{x_Margin}'
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
    prop.setDisabled(false);
  }
});
