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
      object.setConfig('itemId', source.label_1);
    }
});
