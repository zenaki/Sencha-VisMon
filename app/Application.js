/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Sencha_Draw.Application', {
    extend: 'Ext.app.Application',

    name: 'Sencha_Draw',

    // views: [
    //   'vm.VisualMonita'
    // ],

    stores: [
        // TODO: add global / shared stores here
        'Sencha_Draw.view.vm.test.LockGridStore',
        'Sencha_Draw.view.vm.item.hmi-items-store'
        // 'Sencha_Draw.view.vm.test.dynamic.DynamicGridStore'
    ],

    models: [
      'Sencha_Draw.view.vm.test.LockGridModel',
      'Sencha_Draw.view.vm.item.hmi-items-model'
    ],

    launch: function () {
        // TODO - Launch the application
    }
});
