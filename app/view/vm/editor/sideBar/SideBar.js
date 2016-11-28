Ext.define('VisualMonita.view.vm.editor.sideBar.SideBar', {
  extend: 'Ext.panel.Panel',
  requires: [
    'VisualMonita.view.vm.editor.sideBar.SideBarController',
    'VisualMonita.view.vm.editor.sideBar.property.vm-Property',
    'VisualMonita.view.vm.editor.sideBar.local_items.vm-LocalItems',
    'VisualMonita.view.vm.editor.sideBar.upload_items.vm-UploadItems',
    'VisualMonita.view.vm.editor.sideBar.upload_items.multipleUpload.MultipleUpload'
  ],
  xtype: 'vm-sideBar',
  controller: 'sidebar-controller',

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
    xtype: 'vm-uploadItems',
    title: 'Uploaded Items',
    listeners: {
      itemcontextmenu: 'onItemContextMenu'
    },
    tbar: [{
      text: 'Add',
      handler: 'onAddClick'
    }, {
      text: 'Refresh',
      handler: 'onRefreshClick'
    }]
  }]
});
