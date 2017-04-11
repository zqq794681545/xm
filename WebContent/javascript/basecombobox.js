var basecombobox = {
		init:function(id,code,defaultValue){
			$(id).combobox({
			    url:'../tBaseType/initComboxBox.action?e.code='+code,
			    valueField:'value',
			    textField:'name',
			    onLoadSuccess:function(data){
			    	//if(typeof(defaultValue) != 'undefined'){
			    		//$(this).combobox('select',defaultValue);
			    	//}
			    }
			});
		},
		setDefault:function(id){
			$(id).find(".easyui-combobox").each(function(){
				console.info(this);
				var dataOptions = $(this).attr('data-options');
				var jsonDataOptions = eval('({'+dataOptions+'})');
				var defaultValue = jsonDataOptions.value;
				$(this).combobox('select',defaultValue);
			});
		}
}