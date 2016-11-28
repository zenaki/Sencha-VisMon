Ext.define('VisualMonita.view.vm.editor.canvas.label.LabelFormController', {
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
      viewModel: {
        data: {
          x_height: 10,
          x_width: 10,
          x_drag: false,
          x_type: 'item_label',
          x_title: label.getValue(),
          x_slave_id: slave_id.getValue(),
          x_titik_ukur: titik_ukur.getValue(),
          x_font: 'courier',
          x_size: '2em',
          x_color: 'red',
          x_align: 'center',
          x_margin: 0,
          x_ba_1: 0,
          x_wba_1: 'red',
          x_ba_2: 0,
          x_wba_2: 'red',
          x_bb_1: 0,
          x_wbb_1: 'red',
          x_bb_2: 0,
          x_wbb_2: 'red',
        }
      },
      bind: {
        title: '{x_title}',
        html: '<font face="{x_font}" color="{x_color}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + slave_id.getValue() + titik_ukur.getValue() + '}</h1></font>'
      },
      x: xpos,
      y: ypos
    });
  }
});
