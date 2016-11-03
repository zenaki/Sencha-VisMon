/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Sencha_Draw.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Sencha_Draw.view.main.MainController',
        'Sencha_Draw.view.main.MainModel'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        bind: {
            title: '<h2>Visual Monita</h2>'
        },
        region: 'north'
    }, {
        xtype: 'panel',
        bind: {
            title: 'Side Bar'
        },
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        collapsible: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Canvas',
            html: '<h2>Tempat Menggambar.</h2>'
        }, {
            title: 'Graph',
            html: '<iframe src="RinjaniMonitoring/index.php" height="100%" width="100%" allowTransparency="true" scrolling="no" frameborder="0" ></iframe>'
        }, {
          title: 'Editor',
          html: '<iframe src="GraphEditor/index.html" height="100%" width="100%" allowTransparency="true" scrolling="no" frameborder="0" ></iframe>'
        }]
    }]
});
