Ext.define('AppName.store.categorias.StoreListaCategorias',{
    extend: 'Ext.data.Store',
    
    model: 'AppName.model.categorias.ModelListaCategorias',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        api:{
            read: 'app/data/php/Categorias.php?action=getCategoriasMercado',
            create: 'app/data/php/Categorias.php?action=insert',
            destroy: ''
        },        
        
        reader: {
            
            type: 'json',
            root: 'data',
            seccessProperty: 'success'
        },
        
        writer:{
            type: 'json',
            writeAllFields: true,
            allowSingle: true,
            encode: true,
            root: 'data'
        },
        listeners:{
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
        
        },
         listeners: {
            
             write: function(proxy, operation){
            
             }
         }
    //}
    
    
});