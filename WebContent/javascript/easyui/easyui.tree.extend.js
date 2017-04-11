/**
 * 说明:使easyui中的tree控件支持简单json类型
 * 		[{"id":1,"name":根节点,"url":地址一,"pid":0},
 * 		 {"id":2,"name":子节点,"url":地址二,"pid":1}]
 * 调用方式：
 * 			$('#_id').tree({
				url:'url',
				idField:'id'
	            textField: 'name',
	            parentField: 'pid',
	            attributes: ['url']
		    });
 */
$.fn.tree.defaults.loadFilter = function (data, parent) {
	
	var opt = $(this).data().tree.options;
	
	var idField = opt.idField || 'id',
    textField = opt.textField || 'text',
    parentField = opt.parentField || 'pid',
    attributes = opt.attributes || [];
	
	var treeData = [], tmpMap = [];
	
	for(var i= 0, len = data.length; i<len; i++){
		tmpMap[data[i][idField]] = data[i];
	}
	 
	for(var i= 0, len = data.length; i<len; i++){
		if(tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]){
			if(!tmpMap[data[i][parentField]]['children']){
				tmpMap[data[i][parentField]]['children'] = [];
			}
			data[i]['text'] = data[i][textField];
			appendAttibutes(data[i],attributes);
			tmpMap[data[i][parentField]]['children'].push(data[i]);
		}else{
			data[i]['text'] = data[i][textField];
			appendAttibutes(data[i],attributes);
			treeData.push(data[i]);
		}
	}
	return treeData;
};
appendAttibutes = function(node, attributes){
    if(!node['attributes']){
        node['attributes'] = {};
    }

    for(var i=0; i<attributes.length; i++){
        node['attributes'][attributes[i]] = node[attributes[i]];
    }
};