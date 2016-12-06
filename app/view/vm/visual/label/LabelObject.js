Ext.define('VisualMonita.view.vm.visual.label.LabelObject', {
  extend: 'Ext.panel.Panel',
  requires: [
    'VisualMonita.view.vm.visual.label.LabelObjectController',
    'Ext.Chart.ux.Highcharts'
  ],
  xtype: 'visual-label-object',
  controller: 'visual-lbl-obj-controller',

  split: true,
  collapsible: true,
  collapsed: false,
  floatable: false,
  bodyBorder: true,
  border: 5,
  style: {
    borderStyle: 'solid'
  },
  height: 100,
  width: 200,
  // bodyStyle: 'background:transparent;',
  // header: {
  //   titlePosition: 0,
  //   items:[{
  //     xtype:'button',
  //     text: 'Chart',
  //     handler: 'onChartOpen'
  //   }]
  // },
  floating: true,
  renderTo: 'VisualID'
});
