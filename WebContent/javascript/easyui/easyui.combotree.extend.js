//$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;

$.fn.combotree.defaults.loadFilter = function (data, parent) {
	
	var opt = $(this).data().tree.options;
	var idField = opt.idField || 'id',
    textField = opt.textField || 'text',
    parentField = opt.parentField || 'pid',
    valueField = opt.valueField || 'value';
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
			data[i]['value'] = data[i][valueField];
			tmpMap[data[i][parentField]]['children'].push(data[i]);
		}else{
			data[i]['text'] = data[i][textField];
			data[i]['value'] = data[i][valueField];
			treeData.push(data[i]);
		}
	}
 return treeData;

};
