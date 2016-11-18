Ext.define('Sencha_Draw.view.vm.uploaded_item.hmi-items-store', {
    // extend: 'Ext.data.ArrayStore',
    extend: 'Ext.data.Store',
    // storeId: 'hmi-store',
    model: 'Sencha_Draw.view.vm.uploaded_item.hmi-items-model',
    // data: [{
    //   onlocal: 'png/piping-ca-e1.png'
    // }, {
    //   onlocal: 'png/piping-ca-e2.png'
    // }, {
    //   onlocal: 'png/piping-ca-e3.png'
    // }, {
    //   onlocal: 'png/piping-ca-e4.png'
    // }, {
    //   onlocal: 'png/piping-ca-h.png'
    // }, {
    //   onlocal: 'png/piping-ca-t1.png'
    // }, {
    //   onlocal: 'png/piping-ca-t2.png'
    // }, {
    //   onlocal: 'png/piping-ca-t3.png'
    // }, {
    //   onlocal: 'png/piping-ca-t4.png'
    // }, {
    //   onlocal: 'png/piping-ca-v.png'
    // }],
    autoLoad: true,
    proxy: {
      type: 'ajax',
      url: 'Uploaded_Items.php',
      reader: {
        type: 'json',
        root: 'data'
      }
    }
});
