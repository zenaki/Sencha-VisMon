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

//     items: [{
//
//         xtype: 'draw',
//         // xtype: 'Ext.draw.Container',
//         // layout: 'fit',
//         width: 500,
//         height: 500,
//         resizable: {
//           dynamic: true,
//           pinned: true,
//           handles: 'all',
//           transparent: true
//         },
//         draggable: {
//           constrain: true
//         },
//         // resizable: true,
//         // draggable: true,
//         //*
//         sprites: [{
//             type: 'ellipse',
//             cx: 70,
//             cy: 130,
//             rx: 40,
//             ry: 25,
//             fillStyle: 'blue'
// //*
//         },{
//             type: 'path',
//             path: 'M75,75 c0,-25 50,25 50,0 c0,-25 -50,25 -50,0',
//             fillStyle: 'blue'
// //*/
//         },{
//             type: 'image',
//             src : 'png/filter.png',
//             x: 200,
//             y: 30
//         },{
//             type: 'text',
//             x: 218,
//             y: 100,
//             text: 'Filter',
//             fontSize: 14,
//             fillStyle: 'blue'
//         },{
//             type: 'image',
//             src : 'png/piping-ca-h.png',
//             x: 268,
//             y: 47,
//             width: 120,
//             height: 16
//         },{
//             type: 'image',
//             src: 'png/piping-ca-e2.png',
//             x: 388,
//             y: 46,
//             //width: 120,
//             height: 28
//           },{
//             type: 'image',
//             src: 'png/flow1.png',
//             x: 300,
//             y: 49
//         }]
//         //*/
// /*
//       },{
//         xtype: 'image',
//         //id: 'south_image',
//         //width: 200,
//         //padding: '10 0 0 0',
//         src: 'png/piping-rd-h.png',
//         //floating: true,
//         width: 300,
//         height: 14
// //*/
//     }]
});
