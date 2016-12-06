Ext.define('VisualMonita.view.vm.highChart.HighChart', {
  extend: 'Ext.window.Window',
  requires: [
    'Ext.Chart.ux.Highcharts',
    'Ext.Chart.ux.Highcharts.SplineSerie'
  ],
  xtype: 'vm-highChart',
  viewModel: {
    data: {
      x_title: 'test'
    }
  },

  title: 'Chart',
  modal: false,
  autoShow: true,
  height: 450,
  width: 500,
  x: 5,
  y: 5,
  floating: true,
  layout: 'fit',
  draggable: true,
  resizable: {
    dynamic: true,
    pinned: true,
    handles: 'all'
  },
  // renderTo: Ext.getBody(),
  items: [{
    xtype: 'highchart',
    series:[{
      dashStyle: 'DashDot',
      dataIndex: 'value'
    }],
    xField: 'time',
    store: 'VisualMonita.store.vm.highChart.HighChart-Store',
    lineShift: true,
    chartConfig: {
      chart: {
        type: 'spline',
        zoomType: 'x'
      },
      title: {
        text: 'Chart'
      },
      xAxis: [{
        title: {
          text: 'Time',
          margin: 20
        },
        labels: {
          rotation: 315,
          y: 35,
          formatter: function() {
            // console.log('labels value = '); console.log(this.value);
            // var dt: Ext.Date.parse(parseInt(this.value) / 1000, 'U');
            // if (dt) {
            //   return Ext.Date.format(dt, 'H:i:s');
            // }
            return this.value;
          }
        }
      }],
      yAxis: [{
        title: {
          text: 'Value'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      }],
      tooltip: {
        formatter: function () {
          // var dt = Ext.Date.parse (parseInt (this.x) / 1000, "U");
          // return 'Value : <b>' + this.y + '</b><br/>Time : <b>' + Ext.Date.format (dt, 'H:i:s') + '</b>';
          return 'Value : <b>' + this.y + '</b><br/>Time : <b>' + this.x + '</b>';
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 100,
        borderWidth: 0
      },
      credits: {
        text: 'PT. Daun Biru Engineering',
        href: 'http://www.daunbiru.com',
        style: {
          cursor: 'pointer',
          color: '#707070',
          fontSize: '12px'
        }
      }
    }
  }]
});
