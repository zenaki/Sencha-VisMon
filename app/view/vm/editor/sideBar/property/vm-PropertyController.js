Ext.define('VisualMonita.view.vm.editor.sideBar.property.vm-PropertyController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-property-controller',

  onPropertyChange: function(source, recordId, value, oldValue, eOpts) {
      // console.log('source = '); console.log(source);
      // console.log('recordId = ' + recordId + ' value = ' + value + ' oldValue = ' + oldValue);
      var object = Ext.ComponentQuery.query('#'+source.label_1)[0];
      if (recordId == 'label_1') object = object = Ext.ComponentQuery.query('#'+oldValue)[0];
      object.setPosition(source.label_4, source.label_5, true);
      object.setSize(source.label_3, source.label_2);
      if (object.getViewModel().get('x_type') == 'item_object') {

      } else if (object.getViewModel().get('x_type') == 'item_label') {
        object.getViewModel().set('x_title', source.label_6);
        object.getViewModel().set('x_slave_id', source.label_7);
        object.getViewModel().set('x_titik_ukur', source.label_8);
        object.getViewModel().set('x_font', source.label_9);
        object.getViewModel().set('x_size', source.label_10);
        object.getViewModel().set('x_color', source.label_11);
        object.getViewModel().set('x_align', source.label_12);
        object.getViewModel().set('x_margin', source.label_13);
        object.setBind({
          title: '{x_title}',
          html: '<font face="{x_font}" color="{x_color}"><h1 style="height: 100%; width: 100%; text-align: {x_align}; margin: {x_margin}; font-size: {x_size};">{VAL_' + source.label_7 + source.label_8 + '}</h1></font>'
        });
      }
      // object.setConfig('itemId', source.label_1);
    }
});
