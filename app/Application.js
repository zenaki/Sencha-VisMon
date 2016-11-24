/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('VisualMoita.Application', {
    extend: 'Ext.app.Application',

    name: 'VisualMoita',

    stores: [
        // TODO: add global / shared stores here
        'VisualMoita.store.vm.editor.table.DataTableStore'
    ],

    models: [
        'VisualMoita.model.vm.editor.table.DataTableModel'
    ],

    launch: function () {
        // TODO - Launch the application
    }
});
