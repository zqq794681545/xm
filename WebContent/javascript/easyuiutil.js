var easyuiutil = {
	/**
	 * 判断是否选择唯一一条记录
	 * @param data
	 * @returns {Boolean}
	 */
	unique:function(data) {
		if(null == data){
			$.messager.alert('系统提示','请选择一条记录！');
			return false;
		}else if(data.length < 1){
			$.messager.alert('系统提示','请选择一条记录！');
			return false;
		}else if(data.length > 1){
			$.messager.alert('系统提示','仅能选择一条记录！');
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否选择一条以上的记录
	 * @param data
	 * @returns {Boolean}
	 */
	uniques:function(data) {
		
		if(null == data){
			$.messager.alert('系统提示','请选择一条记录！');
			return false;
		}else if(data.length < 1){
			$.messager.alert('系统提示','请至少选择一条记录！');
			return false;
		}else{
			return true;
		}
	},
	keys4del:function(data,key){
		var str = "";
		$.each(data,function(i,n){
			str += "&keys=" + eval('(n.' + key + ')');
		});
		return "?"+str.substring(1);
	},
	/**
	 * 解析json字符串或json数组，返回json对象
	 * @param e
	 * @returns Object json
	 */
	parseJSON:function(e){
		
		//传入对象为数组时，取数组第一个值。
		if($.isArray(e)){
			e = e[0];
		}
		if(e == null)
			return;
		str = "{";
		for (var key in e) {
			str += "'e."+key +"':" + "e."+key + ",";
	    } 
		if(str != "{"){
			str  = str.substring(0, str.length-1);
		}
		str += "}";
		return eval('(' + str + ')'); 
	}
}