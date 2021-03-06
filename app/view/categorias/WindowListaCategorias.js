Ext.define('AppName.view.categorias.WindowListaCategorias',{
    extend: 'AppName.view.utils.Module',
    alias: 'widget.windowListaCategorias',
    id: 'windowListaCategorias',
    
    init : function(){
        this.launcher = {
            text: 'Gerenciar Categorias',
            iconCls:'icon-grid'
        };
    },
            
    createWindow : function(){
        var desktop = Ext.getCmp('desktop').app.getDesktop();
        var win = desktop.getWindow('windowListaCategorias');
        if(!win){
            win = desktop.createWindow({
                // id: 'windowGerenciarOfertas',
                title:'Gerenciar Categorias',
                width:950,
                height:400,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',
                items:[
                	{
                		xtype: 'gridListaCategoriasMercado',
                		region: 'center'
                	},
                    {
                        xtype: 'gridListaSubcategorias',
                        region: 'east',
                        width: 475
                    }
                ]
                
            });
        return win;
        }
     }
});