var basetype = {
	init:function(code){//初始化数据字典
		
		$.ajax({
			 url:"../tBaseType/tBaseTypeAction-selectVerByCode.action?e.code="+code,
			 type:"post",
			 dataType:"json",
			 async:false,
			 success: function(data){
				var version = data.ver;
				var ver  = store.get(code+'_ver');
				if(ver != version){	//比较本地代码版本与服务器是否一致，不一致则请求服务器的数据初始本地数据
					$.ajax({
						 url:"../tBaseType/tBaseTypeAction-selectByCode.action?e.code="+code,
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
	},
	/**
	 * 初始化下拉树
	 * @param id   需要初始化的input的id (必须参数)
	 * @param code 对应类型的编码 (必须参数)
	 * @param isSetDefault (是否显示:--请选择--)
	 * @param checkbox (是否显示:复选框)
	 */
	initTreeSelectBox:function(id,code,isSetDefault,checkbox,panelHeight,pid){
		var _option=[];
		if(isSetDefault)
			_option.push({code:code,id:"-1",name:"--请选择--",pid:-1,sequ:-99,status:1,updateTime:"1900-01-01 00:00:00",value:"-1"});
		if(pid==null||pid==""){
			$.ajax({
				 url:"../tBaseType/tBaseTypeAction-selectByCode.action?tBaseTypeEntity.code="+code,
				 type:"post",
				 dataType:"json",
				 async: false,
				 success: function(data){ 
					if(data != null){
						for(var i=0;i<data.length;i++){
							_option.push({code:data[i].code,id:data[i].id,name:data[i].name,pid:data[i].pid,sequ:data[i].sequ,status:data[i].status,updateTime:data[i].updateTime,value:data[i].value});
						}
					}	
				 }	
			});
		}else{
			$.ajax({
				 url:"../tBaseType/tBaseTypeAction-selectByCodeAndPid.action?tBaseTypeEntity.code="+code+"&tBaseTypeEntity.pid="+pid,
				 type:"post",
				 dataType:"json",
				 async: false,
				 success: function(data){ 
					if(data != null){
						for(var i=0;i<data.length;i++){
							_option.push({code:data[i].code,id:data[i].id,name:data[i].name,pid:data[i].pid,sequ:data[i].sequ,status:data[i].status,updateTime:data[i].updateTime,value:data[i].value});
						}
					}	
				 }	
			 });
		}
		
		$("#"+id).combotree({
			data:_option,
			idField:'id',
	        textField: 'name',
	        parentField: 'pid',
	        valueField: 'value',
	        checkbox:checkbox,
	        panelHeight:panelHeight,
	        attributes: ['id','code','name','value','pid','type','updateTime','status']
		});  
		if(isSetDefault)
			$("#"+id).combotree("setValue",-1);
	}
}