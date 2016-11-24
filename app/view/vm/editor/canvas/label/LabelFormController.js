Ext.define('VisualMoita.view.vm.editor.canvas.label.LabelFormController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.lbl-controller',

  onAddFormClick: function() {
    var me = this;
    var canvas = Ext.ComponentQuery.query('#canvas')[0];
    var label = Ext.ComponentQuery.query('#label_vismon')[0];
    var slave_id = Ext.ComponentQuery.query('#slave_id_vismon')[0];
    var titik_ukur = Ext.ComponentQuery.query('#titik_ukur_vismon')[0];
    var xpos = me.getView().getViewModel().get('x_POS_X');
    var ypos = me.getView().getViewModel().get('x_POS_Y');
    me.onAddLabelClick(canvas, xpos, ypos, label, slave_id, titik_ukur);
    me.getView().close();
  },

  onCancelFormClick: function () {
    var me = this;
    me.getView().close();
  },

  onAddLabelClick: function(canvas, xpos, ypos, label, slave_id, titik_ukur) {
    canvas.add({
      xtype: 'vm-label-object',
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
      x: xpos,
      y: ypos
    });
  }
});
