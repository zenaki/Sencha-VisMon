Ext.define('VisualMonita.view.vm.editor.sideBar.SideBarController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.sidebar-controller',

  onItemContextMenu: function(me, record, item, index, e, eOpts) {
    var item =  record.getData()['uploaded'];
    e.stopEvent();
    Ext.create('Ext.menu.Menu', {
      width: 100,
      plain: true,
      floating: true,
      renderTo: Ext.getBody(),
      items: [{
        text: 'Delete Item',
        handler: function() {
          Ext.Msg.show({
            title:'Delete Item',
            message: 'Delete this item ??',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
              if (btn === 'yes') {
                Ext.Ajax.request({
                  url: 'resources/vm/php/delete.php',
                  params: {
                    data: item
                  },
                  success: function(response) {
                    var grid = Ext.ComponentQuery.query('#uploadedGrid')[0];
                    grid.getStore().reload();
                  }
                });
              }
            }
          });
        }
      }]
    }).showAt(e.getXY());
  },

  onAddClick: function () {
    var view = this.getView();
    this.UploadWindow = view.add({xtype: 'vm-multipleUpload'});
    this.UploadWindow.show();
  },

  onRefreshClick: function() {
    var grid = Ext.ComponentQuery.query('#uploadedGrid')[0];
    grid.getStore().reload();
  }
});
