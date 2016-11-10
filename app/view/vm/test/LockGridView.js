Ext.define('Sencha_Draw.view.vm.test.LockGridView', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer'
    ],
    xtype: 'locking-grid',
    store: 'Sencha_Draw.view.vm.test.LockGridStore',
    columnLines: true,
    // listeners: {
    //   afterender: 'onRender'
    // },
    // onRender: function() {
    //   console.log('masuk grid');
    //   console.log(this);
    //   console.log(this.getStore().getData());
    // }
    // height: 350,
    // width: 600,
    // title: 'Locking Grid',
    //
    //
    // initComponent: function () {
    //     this.columns = [{
    //             xtype: 'rownumberer'
    //         }, {
    //             text     : 'Company Name',
    //             locked   : true,
    //             width    : 230,
    //             sortable : false,
    //             dataIndex: 'name'
    //         }, {
    //             text     : 'Price',
    //             lockable: false,
    //             width    : 80,
    //             sortable : true,
    //             formatter: 'usMoney',
    //             dataIndex: 'price'
    //         }, {
    //             text     : 'Tall<br>Header',
    //             hidden   : true,
    //             width    : 70,
    //             sortable : false,
    //             renderer : function(val) {
    //                 return Math.round(val * 3.14 * 100) / 10;
    //             },
    //             dataIndex: 'change'
    //         }, {
    //             text     : 'Change',
    //             width    : 90,
    //             sortable : true,
    //             renderer : function(val) {
    //                 if (val > 0) {
    //                     return '<span style="color:green;">' + val + '</span>';
    //                 } else if (val < 0) {
    //                     return '<span style="color:red;">' + val + '</span>';
    //                 }
    //                 return val;
    //             },
    //             dataIndex: 'change'
    //         }, {
    //             text     : '% Change',
    //             width    : 105,
    //             sortable : true,
    //             renderer : function(val) {
    //                 if (val > 0) {
    //                     return '<span style="color:green;">' + val + '%</span>';
    //                 } else if (val < 0) {
    //                     return '<span style="color:red;">' + val + '%</span>';
    //                 }
    //                 return val;
    //             },
    //             dataIndex: 'pctChange'
    //         }, {
    //             text     : 'Last Updated',
    //             width    : 135,
    //             sortable : true,
    //             formatter: 'date("m/d/Y")',
    //             dataIndex: 'lastChange'
    //         }];
    //
    //     this.callParent();
    // }
});
