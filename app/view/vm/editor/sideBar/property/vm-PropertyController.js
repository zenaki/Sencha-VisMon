Ext.define('VisualMonita.view.vm.editor.sideBar.property.vm-PropertyController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-property-controller',

  onPropertyChange: function(source, recordId, value, oldValue, eOpts) {
      // console.log('source = '); console.log(source);
      // console.log('recordId = ' + recordId + ' value = ' + value + ' oldValue = ' + oldValue);
      var object = Ext.getCmp(source.label_1);
      if (recordId == 'label_1') object = Ext.getCmp(oldValue);
      object.setPosition(source.label_4, source.label_5, true);
      object.setSize(source.label_3, source.label_2);
      object.setConfig('itemId', source.label_1);
    }
});
