var processedClasses = [];

var html ='<ul> \n';
var app = '91a725142dac20102ec860bd53910594';

var getClass = new GlideRecord('sys_metadata')
getClass.addEncodedQuery('sys_scope='+app+'^sys_name!=NULL^sys_class_name!=sys_grid_canvas_pane^ORsys_class_name=NULL');
getClass.orderBy('sys_class_name');
getClass.query();
while(getClass.next())
{
    var itemClass = getClass.getClassDisplayValue();
    if(processedClasses.indexOf(itemClass) < 0)
    {
        html += '<li><strong>'+itemClass+'</strong>\n <ul> \n';
        var gr = new GlideRecord('sys_metadata');
        gr.addEncodedQuery('sys_scope='+app+'^sys_name!=NULL^sys_class_name='+getClass.getValue('sys_class_name'));
        gr.orderBy('sys_class_name');
        gr.query();
        while(gr.next())
        {
            html +='<li>'+gr.getDisplayValue('sys_name')+' - '+gr.getDisplayValue('sys_update_name')+'</li> \n';
        }
        html += '</ul> \n </li> \n';

        processedClasses.push(itemClass);
    }
}

html += '</ul>';

gs.print(html);