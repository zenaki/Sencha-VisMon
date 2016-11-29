Ext.define('VisualMonita.view.vm.editor.sideBar.property.vm-PropertyController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-property-controller',

  onPropertyChange: function(source, recordId, value, oldValue, eOpts) {
      var object = Ext.ComponentQuery.query('#'+source.label_01)[0];
      if (recordId == 'label_01') object = object = Ext.ComponentQuery.query('#'+oldValue)[0];
      object.setPosition(source.label_04, source.label_05, true);
      object.setSize(source.label_03, source.label_02);
      if (object.getViewModel().get('x_type') == 'item_object') {

      } else if (object.getViewModel().get('x_type') == 'item_label') {
        object.getViewModel().set('x_title', source.label_06);
        object.getViewModel().set('x_slave_id', source.label_07);
        object.getViewModel().set('x_titik_ukur', source.label_08);
        object.getViewModel().set('x_font', source.label_09);
        object.getViewModel().set('x_size', source.label_10);
        object.getViewModel().set('x_color', source.label_11);
        object.getViewModel().set('x_align', source.label_12);
        object.getViewModel().set('x_margin', source.label_13);
        object.getViewModel().set('x_ba_2', source.label_14);
        object.getViewModel().set('x_wba_2', source.label_15);
        object.getViewModel().set('x_ba_1', source.label_16);
        object.getViewModel().set('x_wba_1', source.label_17);
        object.getViewModel().set('x_bb_1', source.label_18);
        object.getViewModel().set('x_wbb_1', source.label_19);
        object.getViewModel().set('x_bb_2', source.label_20);
        object.getViewModel().set('x_wbb_2', source.label_21);
        // object.setBind({
        //   title: '{x_title}',
        //   html: '<font face="{x_font}" color="{x_color}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + source.label_07 + source.label_08 + '}</h1></font>'
        // });
      }
      // object.setConfig('itemId', source.label_1);
    }
});
