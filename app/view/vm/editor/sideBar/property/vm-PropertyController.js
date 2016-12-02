Ext.define('VisualMonita.view.vm.editor.sideBar.property.vm-PropertyController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-property-controller',

  onPropertyChange: function(source, recordId, value, oldValue, eOpts) {
      var object = Ext.ComponentQuery.query('#'+source.label_01)[0];
      if (recordId == 'label_01') object = object = Ext.ComponentQuery.query('#'+oldValue)[0];
      object.setPosition(source.label_04, source.label_05, true);
      object.setSize(source.label_03, source.label_02);
      if (object.getViewModel().get('x_type') == 'item_object') {

      } else if (object.getViewModel().get('x_type') == 'item_label') {
        var p_webSocket = Ext.ComponentQuery.query('#p_webSocket')[0];
        if (recordId == 'label_07' || recordId == 'label_08') {
          if (p_webSocket.getController().getViewModel().get('VAL_'+source.label_07+source.label_08)) {
            object.getViewModel().set('x_slave_id', source.label_07);
            object.getViewModel().set('x_titik_ukur', source.label_08);
          } else {
            Ext.toast({
              html: 'Slave ID : ' + source.label_07 + ' dan Titik Ukur : ' + source.label_08 + ' tidak terdaftar ..',
              closable: false,
              align: 't',
              slideInDuration: 400,
              minWidth: 200
            });
            this.onSetPropertiesSource(object);
          }
        }
        object.getViewModel().set('x_title', source.label_06);
        object.getViewModel().set('x_font', source.label_09);
        object.getViewModel().set('x_size', source.label_10);
        object.getViewModel().set('x_color', source.label_11);
        object.getViewModel().set('x_align', source.label_12);
        object.getViewModel().set('x_margin', source.label_13);
        object.getViewModel().set('x_ba_2', source.label_14);
        object.getViewModel().set('x_wba_2', source.label_15);
        object.getViewModel().set('x_ba_1', source.label_16);
        object.getViewModel().set('x_wba_1', source.label_17);
        object.getViewModel().set('x_bb_1', source.label_18);
        object.getViewModel().set('x_wbb_1', source.label_19);
        object.getViewModel().set('x_bb_2', source.label_20);
        object.getViewModel().set('x_wbb_2', source.label_21);
      }
    },

    onSetPropertiesSource: function(object) {
      var parent = Ext.ComponentQuery.query('#canvas')[0];
      var prop = Ext.ComponentQuery.query('#properties')[0];
      if (object.getViewModel().get('x_type') == 'item_object') {
        prop.setBind({
          source: {
            label_01: '{x_ItemId}',
            label_02: '{x_Height}',
            label_03: '{x_Width}',
            label_04: '{x_POS_X}',
            label_05: '{x_POS_Y}'
          }
        });
        prop.getViewModel().set('x_ItemId', object.getItemId());
        prop.getViewModel().set('x_Height', object.getHeight());
        prop.getViewModel().set('x_Width', object.getWidth());
        prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
        prop.getViewModel().set('x_POS_Y', object.getY() - parent.getY());
      } else if (object.getViewModel().get('x_type') == 'item_label') {
        prop.setBind({
          source: {
            label_01: '{x_ItemId}',
            label_02: '{x_Height}',
            label_03: '{x_Width}',
            label_04: '{x_POS_X}',
            label_05: '{x_POS_Y}',
            label_06: '{x_Title}',
            label_07: '{x_Slave_ID}',
            label_08: '{x_Titik_Ukur}',
            label_09: '{x_Font}',
            label_10: '{x_Font_Size}',
            label_11: '{x_Color}',
            label_12: '{x_Align}',
            label_13: '{x_Margin}',
            label_14: '{x_Batas_Atas_2}',
            label_15: '{x_Warna_Batas_Atas_2}',
            label_16: '{x_Batas_Atas_1}',
            label_17: '{x_Warna_Batas_Atas_1}',
            label_18: '{x_Batas_Bawah_1}',
            label_19: '{x_Warna_Batas_Bawah_1}',
            label_20: '{x_Batas_Bawah_2}',
            label_21: '{x_Warna_Batas_Bawah_2}'
          }
        });
        prop.getViewModel().set('x_ItemId', object.getItemId());
        prop.getViewModel().set('x_Height', object.getHeight());
        prop.getViewModel().set('x_Width', object.getWidth());
        prop.getViewModel().set('x_POS_X', object.getX() - parent.getX());
        prop.getViewModel().set('x_POS_Y', object.getY() - parent.getY());
        prop.getViewModel().set('x_Title', object.getViewModel().get('x_title'));
        prop.getViewModel().set('x_Slave_ID', object.getViewModel().get('x_slave_id'));
        prop.getViewModel().set('x_Titik_Ukur', object.getViewModel().get('x_titik_ukur'));
        prop.getViewModel().set('x_Font', object.getViewModel().get('x_font'));
        prop.getViewModel().set('x_Font_Size', object.getViewModel().get('x_size'));
        prop.getViewModel().set('x_Color', object.getViewModel().get('x_color'));
        prop.getViewModel().set('x_Align', object.getViewModel().get('x_align'));
        prop.getViewModel().set('x_Margin', object.getViewModel().get('x_margin'));
        prop.getViewModel().set('x_Batas_Atas_2', object.getViewModel().get('x_ba_2'));
        prop.getViewModel().set('x_Warna_Batas_Atas_2', object.getViewModel().get('x_wba_2'));
        prop.getViewModel().set('x_Batas_Atas_1', object.getViewModel().get('x_ba_1'));
        prop.getViewModel().set('x_Warna_Batas_Atas_1', object.getViewModel().get('x_wba_1'));
        prop.getViewModel().set('x_Batas_Bawah_1', object.getViewModel().get('x_bb_1'));
        prop.getViewModel().set('x_Warna_Batas_Bawah_1', object.getViewModel().get('x_wbb_1'));
        prop.getViewModel().set('x_Batas_Bawah_2', object.getViewModel().get('x_bb_2'));
        prop.getViewModel().set('x_Warna_Batas_Bawah_2', object.getViewModel().get('x_wbb_2'));
      }
      prop.setDisabled(false);
    }
});
