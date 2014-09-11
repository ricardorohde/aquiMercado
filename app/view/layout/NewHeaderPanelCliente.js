Ext.define('AppName.view.layout.NewHeaderPanelCliente',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.newHeaderPanelCliente',
    
    region: 'west', 
    width: 55, 
    frameHeader:false, 
    bodyPadding:'4 4', 
    layout:'border', 
//     bodyStyle: 'background-image: -webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#8fc33a),color-stop(100%,#739b2e));' +
//                 'background-image: -webkit-linear-gradient(top,#8fc33a,#739b2e);' +
// //                'background-image: -moz-linear-gradient(top,#8fc33a,#739b2e);' +
// //                'background-image: -o-linear-gradient(top,#8fc33a,#739b2e);' +
// //                'background-image: linear-gradient(top,#8fc33a,#739b2e);' +
//                 'border-bottom: 1px solid #567422;' +
//                 'border-top: 1px solid #8fc33a;' +
//                 'border-left: 1px solid #8fc33a;' +
//                 'border-right: 1px solid #8fc33a;' ,

bodyStyle: 'background-image: -webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#000033),color-stop(100%,#000033));' +
                'background-image: -webkit-linear-gradient(top,#000033,#000033);' +
//                'background-image: -moz-linear-gradient(top,#8fc33a,#739b2e);' +
//                'background-image: -o-linear-gradient(top,#8fc33a,#739b2e);' +
//                'background-image: linear-gradient(top,#8fc33a,#739b2e);' +
                'border-bottom: 1px solid #000033;' +
                'border-top: 1px solid #000033;' +
                'border-left: 1px solid #000033;' +
                'border-right: 1px solid #000033;' ,
    
    
    items:[
        {
            xtype:'dataViewNewHeaderPanelCliente',
            region: 'center'
        },
       {
           xtype: 'dataViewAction',
           region: 'south',
           width: 160
               
       },

        
    ]
});