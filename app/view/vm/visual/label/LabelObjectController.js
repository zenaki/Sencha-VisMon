Ext.define('VisualMonita.view.vm.visual.label.LabelObjectController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.visual-lbl-obj-controller',

  onChartOpen: function() {
    // console.log('this.getView().up(\'panel\').getId() = '); console.log(this.getView().up('panel').getId());
    // if (!this.Chart) {
      this.Chart = this.getView().add({xtype: 'vm-highChart'/*, renderTo: this.getView().up('panel').getId()*/});
      this.Chart.show();

      var parent = this.getView();
      var chart = parent.down('highchart');
      chart.store.load({
        params: {
          "slave_id": parent.getViewModel().get('x_slave_id'),
          "titik_ukur": parent.getViewModel().get('x_titik_ukur')
        }
      });
    // }
  }
});
