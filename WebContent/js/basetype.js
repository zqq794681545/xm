var basetype = {
	init:function(code){//初始化数据字典
		
		$.ajax({
			 url:"../tBaseType/tBaseTypeAction-selectVerByCode.action?tBaseTypeEntity.code="+code,
			 type:"post",
			 dataType:"json",
			 success: function(data){
				var version = data.ver;
				var ver  = store.get(code+'_ver');
				if(ver != version){	//比较本地代码版本与服务器是否一致，不一致则请求服务器的数据初始本地数据
					$.ajax({
						 url:"../tBaseType/tBaseTypeAction-selectByCode.action?tBaseTypeEntity.code="+code,
						 type:"post",
						 dataType:"json",
						 success: function(data){ 
							if(data != null){
								for(var i=0;i<data.length;i++){
									store.set(code+'_'+data[i].value, data[i].name);	//更新本地代码
								}
								store.set(code+'_ver', version);	//更新本地版本
							}	
						 }	
					 });
				}
			 }	
		 });
		
	},
	getNameByValue:function(code,value){//格式化数据字典
		
		return store.get(code+'_'+value);
	}
}