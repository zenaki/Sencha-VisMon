/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('VisualMonita.Application', {
    extend: 'Ext.app.Application',

    name: 'VisualMonita',

    stores: [
        // TODO: add global / shared stores here
        'VisualMonita.store.vm.editor.table.DataTableStore',
        'VisualMonita.store.vm.editor.sideBar.local_items.vm-LocalItems-Store',
        'VisualMonita.store.vm.editor.sideBar.upload_items.vm-UploadItems-Store',
        'VisualMonita.store.vm.highChart.HighChart-Store',
        'VisualMonita.store.vm.editor.canvas.button.ButtonFormStore'
    ],

    models: [
        'VisualMonita.model.vm.editor.table.DataTableModel',
        'VisualMonita.model.vm.editor.sideBar.local_items.vm-LocalItems-Model',
        'VisualMonita.model.vm.editor.sideBar.upload_items.vm-UploadItems-Model',
        'VisualMonita.model.vm.highChart.HighChart-Model',
        'VisualMonita.model.vm.editor.canvas.button.ButtonFormModel'
    ],

    launch: function () {
        // TODO - Launch the application
    }
});
