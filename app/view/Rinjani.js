Ext.define('Sencha_Draw.view.VisualMonita', {
    extend: 'Ext.container.Container',
    xtype: 'visual-monita',

    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        title: 'Normal Tab',
        html: "My content was added during construction."
    }, {
        title: 'Graphic',
        loader: {
            url: 'RinjaniMonitoring/index.php',
            contentType: 'php',
            loadMask: true,
            loadOnRender: true
        }
    }, {
        title: 'Editor',
        loader: {
            url: 'GraphEditor/index.html',
            contentType: 'html',
            loadMask: true,
            loadOnRender: true
        }
    }]
});
