Ext.define('VisualMonita.view.vm.editor.sideBar.SideBar', {
  extend: 'Ext.panel.Panel',
  requires: [
    'VisualMonita.view.vm.editor.sideBar.property.vm-Property',
    'VisualMonita.view.vm.editor.sideBar.local_items.vm-LocalItems'
  ],
  xtype: 'vm-sideBar',

  layout: 'accordion',
  split: true,
  collapsible: true,
  collapsed: false,
  floatable: false,
  width: 250,
  title: 'Side Bar',
  items: [{
    xtype: 'vm-property',
    title: 'Properties'
  }, {
    xtype: 'vm-localItems',
    title: 'Local Items'
  }, {
    title: 'HMI-GRID-UPLOAD'
  }]
});
