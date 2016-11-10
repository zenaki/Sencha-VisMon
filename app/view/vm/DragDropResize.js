Ext.define('Sencha_Draw.view.vm.DragDropResize', {
  extend: 'Ext.draw.Container',
  xtype: 'drag-drop-resize',
  // resizable: {
  //   dynamic: true,
  //   pinned: true,
  //   handles: 'all'
  // },
  // draggable: {
  //   constrain: true,
  //   constrainTo: Ext.getBody()
  // },
  // items: [{
  //   type: 'image',
  //   src: 'http://icons.iconarchive.com/icons/icons-land/transport/256/Truck-icon.png',
  //   width: 200,
  //   height: 200,
  //   x: 0,
  //   y: 0
  // }, {
  //   type: 'image',
  //   src: 'http://www.gettyicons.com/free-icons/108/transport/png/256/lorry_green_256.png',
  //   width: 200,
  //   height: 200,
  //   x: 0,
  //   y: 300
  // }]
  width:200,
      height:200,
      sprites: [{
           type: 'circle',
           fillStyle: '#79BB3F',
           r: 100,
           x: 100,
           y: 100
      }]
});
