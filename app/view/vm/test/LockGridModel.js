Ext.define('Sencha_Draw.view.vm.test.LockGridModel', {
    extend: 'Ext.data.Model',
    schema: {
        namespace: 'Sencha_Draw.view.vm.test'
    },
    fields: [
        {name: 'slave_id', type: 'int', allowBlank: true, defaultValue: null}
        // {name: 'test_col_1', type: 'int', allowBlank: true, defaultValue: null}
        // {name: 'slave_id', type: 'int', allowBlank: true, defaultValue: null},
        // {name: '1001', type: 'float', allowBlank: true, defaultValue: null}
        // {name: '1003', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1005', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1007', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1009', type: 'float', allowBlank: true, defaultValue: null}
        // {name: '1011', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1013', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1015', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1017', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1019', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1021', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1023', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1025', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1027', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1029', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1031', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1033', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1035', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1037', type: 'float', allowBlank: true, defaultValue: null},
        // {name: '1039', type: 'float', allowBlank: true, defaultValue: null}
        // // Trend begins with the cerrent price. Changes get pushed onto the end
        // {
        //     name: 'trend',
        //     convert: function(value, record) {
        //         // Record creation call with no trend there: start with current price
        //         if (value === null) {
        //             return [record.get('price')];
        //         }
        //         return Ext.isArray(value) ? value : [ value ];
        //     }
        // },
        // // Rating dependent upon performance 0 = best, 2 = worst
        // {
        //     name: 'rating',
        //     type: 'int',
        //     convert: function(value, record) {
        //         var pct = record.get('pctChange');
        //         if (pct < 0)
        //             return 2;
        //         if (pct < 1)
        //             return 1;
        //         return 0;
        //     }
        // }
    ],

    // bind: {fields: '{fieldsVisMon}'}

    // // Override to keep the last 10 prices in the trend field
    // set: function(fieldName, value) {
    //     if (fieldName === 'price') {
    //         this.callParent([{
    //             price: value,
    //             trend: this.addToTrend(fieldName.price)
    //         }]);
    //     }
    //     else {
    //         if (typeof fieldName !== 'string' && 'price' in fieldName) {
    //             fieldName.trend = this.addToTrend(fieldName.price);
    //         }
    //         this.callParent(arguments);
    //     }
    // },
    //
    // // Override to keep the last 10 prices in the trend field
    // addToTrend: function(value) {
    //     var trend = this.data.trend.concat(value);
    //
    //     if (trend.length > 10) {
    //         Ext.Array.splice(trend, 0, trend.length - 10);
    //     }
    //     return trend;
    // }
});
