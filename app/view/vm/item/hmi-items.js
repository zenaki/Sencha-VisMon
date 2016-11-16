Ext.define('Sencha_Draw.view.vm.item.hmi-items', {
    extend: 'Ext.grid.Panel',
    xtype: 'hmi-grid',
    store: 'Sencha_Draw.view.vm.item.hmi-items-store',
    // store: Ext.create('Sencha_Draw.view.vm.item.hmi-items-store'),
    title: 'HMI Items',
    hideHeaders: true,
    viewConfig: {
      plugins: {
        ddGroup: 'hmi-grid-to-panel',
        ptype: 'gridviewdragdrop',
        enableDrop: false
      },
      // listeners: {
      //   drop: function(node, data, dropRec, dropPosition) {
      //     // var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
      //     // Ext.example.msg('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
      //     console.log('success drop');
      //   }
      // }
    },
    columns: [{
      // header: 'On Local',
      dataIndex: 'onlocal',
      renderer: function(value){
        return '<img src="' + value + '" height="100" width="100" />';
      },
      // text     : 'On Local',
      flex     : 1,
      sortable: false,
      menuDisabled: true
    }]
});
