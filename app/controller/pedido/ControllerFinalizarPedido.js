Ext.define('AppName.controller.pedido.ControllerFinalizarPedido',{
    extend: 'Ext.app.Controller',
    
    stores: [
        'pedido.StoreTreeListaClienteFinalizarPedido',
        'pedido.StoreListaPedidosCliente'
    ],
    models: [
       'produtos.ModelListaProdutosCliente',
       'pedido.ModelMeusPedidosCliente'
    ],
    views: [
        'pedido.TreeListaClienteFinalizarPedido',
        'pedido.PanelFinalizarPedidoCliente',
        'pedido.FormFinalizarPedido',
        'pedido.GridListaPedidosCliente',
        'pedido.WindowAcompanharPedidos',
        'pedido.WindowListaProdutosPedido'
    ],
    
     init: function(){
        this.control({
          'panelFinalizarPedidoCliente button[action=confirmar]' : {click: this.confirmar},
          'gridListaPedidosCliente button[action=changeStatus]' : {click: this.changeStatus},
          'gridListaPedidosCliente button[action=listaProdutos]' : {click: this.listaProdutos}
          
        })
    },
    
    
    confirmar: function(button){
        var win = button.up('panelFinalizarPedidoCliente'),
                form = win.down('form').getForm();
        
        if(form.isValid()){
             var record = form.getRecord(),
             values = form.getValues();
             if(record){
                 form.submit({
                     url: 'app/data/php/PedidosCliente.php?action=insert',
                      success: function(form, resp){
                                //console.log(form,resp)
                                if(resp.result.success == true){
                                    Ext.example.msg('Server Response', "Pedido realizado com sucesso!");
                                    win.close()
//                                    Ext.getCmp('gridListaProdutos').store.load()
                                }
                        },
                        failure:function(form,resp){
                            //postFailure(form, resp);
                            Ext.example.msg('Server Response', "Erro ao finalizar pedido!");


                            //window.location.reload();
                        }
                 });
             }
            
        }
        
        else {
            
        }
            
        
    },
    
     changeStatus: function(button){
//        console.log(button.id)
        var status = button.id,
            record = Ext.getCmp('gridListaPedidosCliente').getSelectionModel().getSelection();
    
//        console.log(record[0].data.status)
        var status = this.getStatus(record[0].data.status)
//        console.log("status" + status)
//        console.log("cancelamento" + Number(Ext.getCmp('podeCancelar').getValue()))
        if(Number(status) <= Number(Ext.getCmp('podeCancelar').getValue())){
            Ext.Ajax.request({
                url: 'app/data/php/MonitorPedidosMercado.php?action=changeStatus&id_pedido=' + record[0].data.id_pedido + 
                    '&status=' + "Cancelado",
                success: function(form, resp){
    //                               
                    Ext.getCmp('gridListaPedidosCliente').store.load()
    //                                }
                },
                failure:function(form,resp){

                    Ext.example.msg('Server Response', resp.result.msg);

                }
            });
            
        }
            
        else{
            Ext.Msg.alert('ERRO', 'Atenção, O pedido não pode ser cancelado');
        }
            
        

        
    },
    
    listaProdutos: function(){
         Ext.widget('windowListaProdutosPedido')
        
        var records = Ext.getCmp('gridListaPedidosCliente').getSelectionModel().getSelection();
        
        var proxy = Ext.getCmp('treeListaClienteFinalizarPedido').store.getProxy()

        proxy._api.read = 'app/data/php/ListaProdutosCliente.php?action=select&nome_lista=' + records[0].data.nome_lista + '&id_cliente=' + records[0].data.cliente_id_cliente
        Ext.getCmp('treeListaClienteFinalizarPedido').store.setProxy(proxy)
        Ext.getCmp('treeListaClienteFinalizarPedido').store.load()
    },
            
            getStatus: function(status){
                console.log(status)
                if(status == "Aberto")
                    return 0
                else
                    if(status == "Recebido")
                        return 1
                    else
                        if(status == "Separando em estoque")
                            return 2
                        else
                            if(status == "Aguardando retirada")
                                return 3
                            else
                                if(status == "Em transporte")
                                    return 4
                               else 
                                   if(status == "Finalizado")
                                       return 5
            }
   
})