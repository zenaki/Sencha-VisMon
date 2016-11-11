Ext.define('Sencha_Draw.view.vm.VisualMonita_ContextMenu', {
  extends: 'Ext.menu.Menu',
  xtype: 'vm_context_menu',
  items: [{
    text: 'Add',
    handler: function() {console.log("Add");}
  }, {
    text: 'Delete',
    handler: function() {console.log("Delete");}
  }]
});
