Ext.define('VisualMonita.view.vm.editor.canvas.label.LabelObject', {
  extend: 'Ext.panel.Panel',
  requires: [
    'VisualMonita.view.vm.editor.canvas.label.LabelObjectController',
    'Ext.Chart.ux.Highcharts'
  ],
  xtype: 'vm-label-object',
  controller: 'lbl-obj-controller',

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
  bodyStyle: 'background:transparent;',
  // header: {
  //   titlePosition: 0,
  //   items:[{
  //     xtype:'button',
  //     text: 'Chart',
  //     handler: 'onChartOpen'
  //   }]
  // },
  resizable: {
    dynamic: true,
    pinned: true,
    handles: 'all'
  },
  floating: true,
  renderTo: 'CanvasID',
  listeners: {
    resize: 'onPanelResize',
    render: 'onPanelLabelRender',
    mousemove: {
      element: 'el',
      fn: 'onPanelLabelMouseMove'
    },
    contextmenu: {
      element: 'el',
      fn: 'onLabelRightClick'
    }
  }
});
