Ext.define('VisualMonita.view.vm.visual.VisualController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-visual-controller',

  onVisualRightClick: function(view, e, element) {
    view.stopEvent();
    var me = this;
    Ext.create('Ext.menu.Menu', {
      width: 100,
      plain: true,
      floating: true,
      items: [{
        text: 'Load Visual Monita',
        handler: function() {
          me.onLoadVisualMonita();
        }
      }]
    }).showAt(view.getXY());
  },

  onLoadVisualMonita: function() {
    var view = this.getView();
    this.UploadWindow = view.add({xtype: 'vm-visual-multipleUpload'});
    this.UploadWindow.show();
  }
});
