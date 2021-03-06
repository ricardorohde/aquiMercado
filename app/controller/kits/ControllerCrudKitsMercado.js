Ext.define('AppName.controller.kits.ControllerCrudKitsMercado',{
    extend: 'Ext.app.Controller',
    
    stores: [
      'kits.StoreCrudKitsProdutosMercado'   ,
      'kits.StoreKitsHasProdutos',
      'kits.StoreDataViewKits'
    ],
    models: [
        'kits.ModelCrudKitsProdutosMercado',
        'kits.ModelListaProdutosKits'
    ],
    views: [
        'kits.GridListaKitsMercado',
//        'kits.GridListaProdutosMercado',
        'kits.WindowCadKit',
        'kits.WindowCadProdutosKitsMercado',
        'kits.WindowGerenciarListaKitsMercado',
        'kits.GridListaKitsProdutosMercado',
        'kits.FormCadKit',
        'kits.WindowQuantidadeItems',
        'kits.FormQuantidadeItems',
        'kits.PanelDescKit',
        'kits.DataViewProdutosKit',
        'kits.WindowDataViewKitsProdutosKit',
        
    ],
    
     init: function(){
        this.control({
            'gridListaKitsMercado button[action=add]' : {click: this.add},
            'gridListaKitsMercado button[action=edit]' : {click: this.edit},
            'gridListaKitsMercado button[action=addProdutos]' : {click: this.addProduto},
            'gridListaKitsMercado button[action=viewProdutos]' : {click: this.viewProdutos},
            'formCadKit button[action=save]' :  {click: this.save},
            'formQuantidadeItems button[action=saveItem]' :  {click: this.saveItem}
          
        })
    },
    
    
    add: function(){
        Ext.widget('windowCadKit')
    },
    
    addProduto:function(){
        var record = Ext.getCmp('gridListaKitsMercado').getSelectionModel().getSelection();
//        console.log(record[0].data.id_kit)
        Ext.widget('windowCadProdutosKitsMercado')
        Ext.getCmp('textfieldIdKit').setValue(record[0].data.id_kit)
        var proxy = Ext.getCmp('gridListaKitsProdutosMercado').store.getProxy()
        proxy._api.read = 'app/data/php/KitsHasProdutos.php?action=select&id_kit='+record[0].data.id_kit
        Ext.getCmp('gridListaKitsProdutosMercado').store.setProxy(proxy)
        Ext.getCmp('gridListaKitsProdutosMercado').store.load()
        
    },
    
    save: function(button){
        //console.log('haha')
        var win = button.up('windowCadKit'),
            form = win.down('form').getForm();
        
        if(form.isValid()){
            var record = form.getRecord(),
            values = form.getValues();
            if(record){
                if(record.data['id_kit']){
                    form.submit({
                        url: 'app/data/php/Kits.php?action=update',
                        success: function(form, resp){
                                //console.log(form,resp)
                                if(resp.result.success == true){
                                    Ext.example.msg('Server Response', resp.result.msg);
                                    win.close()
                                    Ext.getCmp('gridListaKitsMercado').store.load()
                                }
                        },
                        failure:function(form,resp){
                            //postFailure(form, resp);
                            Ext.example.msg('Server Response', resp.result.msg);


                            //window.location.reload();
                        }

                    })
                }
            }
            
            else {
                var record = Ext.create('AppName.model.kits.ModelCrudKitsProdutosMercado');
                record.set(values);
//                Ext.getCmp('gridListaKitsMercado').store.add(record);
                form.submit({
                    url: 'app/data/php/Kits.php?action=insert',
                    success: function(form, resp){
                            //console.log(form,resp)
                            if(resp.result.success == true){
                                Ext.example.msg('Server Response', resp.result.msg);
                                win.close()
                                Ext.getCmp('gridListaKitsMercado').store.load()
                            }
                    },
                    failure:function(form,resp){
                        //postFailure(form, resp);
                        Ext.example.msg('Server Response', resp.result.msg);


                        //window.location.reload();
                    }

                })
            }
        }            
    },
    
    edit: function(a,b){
        
             var records = Ext.getCmp('gridListaKitsMercado').getSelectionModel().getSelection();
                //console.log(records)
        if(records.length === 1){
             var editWindow = Ext.widget('windowCadKit');
             var editForm = editWindow.down('form');
             var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }
//        console.log
        Ext.getCmp('imgKit').setSrc('app/data/php/Kits.php?action=getImgKit&id_kit='+ record.data.id_kit)
//        Ext.getCmp('imgProdutos').setSrc('app/data/php/Produtos.php?action=getImagemProdutos&id_produtos='+ record.data.id_produtos)
        //Ext.getCmp('fileuploadfieldImagemProdutos').setValue("uahuahuah")
        //console.log(record.data.nome_imagem)
                
    },
    
    saveItem: function(button){
        var win = button.up('window'),
               form = win.down('form').getForm();
               
        if(form.isValid()){
            var record = form.getRecord(),
            values = form.getValues();
            if(record){
                if(record.data['id_kits_has_lista_produtos_mercado']){
                    record.set(values);
                    win.close();
                    Ext.getCmp('gridListaKitsProdutosMercado').store.sync();
                    //            Ext.getCmp('gridListaPanfletos').store.load();
                }
            }
            else{
                var record = Ext.create('AppName.model.kits.ModelListaProdutosKits');
                record.set(values);
                Ext.getCmp('gridListaKitsProdutosMercado').store.add(record);
                win.close();
                Ext.getCmp('gridListaKitsProdutosMercado').store.sync();
                Ext.getCmp('gridListaKitsProdutosMercado').store.load();                   
            }

            
           }
           else{
               Ext.ux.Msg.flash({
                   msg: 'Ha campos preenchidos incorretamente',
                   type: 'error'
               });
           }
    },
    
    viewProdutos: function(){
        Ext.widget('windowDataViewKitsProdutosKit')
        Ext.getCmp('btAddKit').hide()
        var records = Ext.getCmp('gridListaKitsMercado').getSelectionModel().getSelection();
        
        Ext.getCmp('imgDataViewKit').setSrc('app/data/php/Kits.php?action=getImgKit&id_kit='+records[0].data.id_kit)

        var proxy = Ext.getCmp('dataViewProdutosKit').store.getProxy()
        proxy.url = 'app/data/php/Kits.php?action=getTotalKit&id_kit=' + records[0].data.id_kit

        Ext.getCmp('dataViewProdutosKit').store.setProxy(proxy)
        Ext.getCmp('dataViewProdutosKit').store.load()
    }
})