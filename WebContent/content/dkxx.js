var currentDate = new Date();//获取时间
var currentYear = currentDate.getFullYear();//获取年份
var currentMonth = currentDate.getMonth()+1;//获取月份
var currentDay = currentDate.getDate();//获取当前日
//地块是否添加  0:否 1:是
var isAdd = 0;
//是否保存过
$(document).ready(function(){
	var dkid="";
	$('#_dkxx_list').datagrid({
		url:"../XmxxAction/selectPagination.action",
		queryParams:{},
		columns:[[
			{field:'ck',checkbox:true},
			{hidden:false, align:'center', width:100, field:'id', title:'地块编号'},
			{hidden:true, align:'center', width:100, field:'phjgname', title:'地块名称'},
			{hidden:false, align:'center', width:400, field:'xzqh', title:'地块用途'},
//			{hidden:true, align:'center', width:100, field:'dkjzmj', title:'建筑面积'},
//			{hidden:true, align:'center', width:100, field:'xmid', title:'项目编号'},
//			{hidden:true, align:'center', width:100, field:'cjr', title:'创建人'},
//			{hidden:true, align:'center', width:100, field:'cjsj', title:'创建时间'}
		]],
		rownumbers:true,
		pagination:true,
		nowrap:true,
		pageSize:10,
		onLoadSuccess:function(data){
			if(data!=null){
				var ydzmj = 0;
				var str = "";
				for(var i=0;i<data.rows.length;i++){
					str += data.rows[i].dkyt+",";
					ydzmj += data.rows[i].dkmj;
				}
				//去掉最后一个逗号
				str = str.substring(0,str.length-1);
				$("#_fhysbb_ydzmj").val(ydzmj);
				$("#_fhysbb_tdyt").val(filterRepeatStr(str));
			}
		},
		toolbar: [
			{
				iconCls: 'i_app_add',
				text:"增加",
				handler: function(){
				$.ajax({
					url:"../XmxxAction/insert.action",
					type:"post",
			        dataType: "json",
					data:{"id":"b407ce26d24c429eabcc5acf4bedcc26",
						"phjgname":"ddddddd",
						"xzqh":1
					
						},
					async:false,
					success:function(data){
						alert(data);
						
					}
				});
				}
			},
			{
				iconCls: 'i_app_edit',
				text:"编辑",
				handler: function(){
					$.ajax({
						url:"../PhjgDkxxAction/update.action",
						type:"post",
				        dataType: "json",
						data:{"xmid":"b407ce26d24c429eabcc7acf4bedcc26",
							"dkmj":1.00,
							"cjr":"2",
							"dkyt":"2",
							"dkmc":"2",
							"dkbh":"2",
							"id":"b407ce26d24c429eabcc7acf4bedcc26",
							"dkjzmj":1.00
							},
						async:false,
						success:function(data){
							alert(data);
							
						}
					});
				}
			},
			{
				iconCls: 'i_app_delete',
				text:"删除",
				handler: function(){
					var data=$('#_dkxx_list').datagrid('getSelections');
					if(validateMoreRecord(data)){
						var str ="";
						for(var i = 0 ; i < data.length;i++)
							str += "&keys=" + data[i].id;
						var url = "../PhjgDkxxAction/deletes.action" + "?" + str.substring(1);	
						deleteBatch(url,null,function(result){
							if(result != null && result > 0){
								$.messager.show({title:'系统消息',msg:'删除记录成功！',showType:'slide'});
								$('#_dkxx_list').datagrid('reload');
								reSetAjax();
							}else{
								$.messager.alert('警告','删除记录失败！');
							}
						});
					}	
				} 
			}
		]					
	});
	$('#_dkxx_window').window({
		onBeforeDestroy:function(){ 
	           alert(111);
	           return false;
	       }
	   });
	//地块信息保存
	$("#_dkxx_save_button").bind("click",function(){
		if($("#_dkxx_dkbh").val()==null||$("#_dkxx_dkbh").val()==""){
			$.messager.alert('警告',"地块编号不能都为空");
			return;
		}
		var dkytxx = "";
		ajax("../phjgDkytxx/selectByDkid.action",{"e.dkid":dkid},function(result){
			dkytxx = result.rows.length;
		});
		if(dkytxx <= 0){
			$.messager.alert('警告',"地块用途明细不能为空");
			return;
		}
		//采用同步提交form
		$.ajaxSetup({ 
		    async : false 
		});
		$.post("../phjgDkxx/save.action?isAdd="+isAdd,$('#_dkxx_add_form').serialize(),function(row){
			if(row != null && row > 0){
				isAdd = 0;
				$.messager.show({title:'系统消息',msg:'保存成功！',showType:'slide'});
				reSetAjax();
    			closeWindow('_dkxx_window',true);
    			$("#_dkxx_list").datagrid({
    				url:"../phjgDkxx/selectPagination.action",
    				queryParams:{"e.xmid":xmbh},
    				onLoadSuccess:function(data){
    					if(data!=null){
    						var ydzmj = 0;
    						var str = "";
    						for(var i=0;i<data.rows.length;i++){
								str += data.rows[i].dkyt+",";
								ydzmj += data.rows[i].dkmj;
							}
    						//去掉最后一个逗号
    						str = str.substring(0,str.length-1);
    						$("#_fhysbb_ydzmj").val(ydzmj);
    						$("#_fhysbb_tdyt").val(filterRepeatStr(str));
    					}
    				}
    			});
   	    	}else{
   	    		$.messager.alert('系统消息','保存失败！');
   	    	}  
		});
		setDefaultFormData($("#_dkxx_add_form"));
	});
	
	//初始化地块用途面积
	$("#_tdmx_add_dkytmj").numberbox({min:0,precision:2});
	$("#_tdmx_edit_dkytmj").numberbox({min:0,precision:2});
	
	//地块明细列表
	$('#_dkytmx_list').datagrid({
		columns:[[
			{field:'ck',checkbox:true},
			{hidden:true, align:'center', width:100, field:'dkytmc', title:'地块用途名称'},
			{hidden:false, align:'center', width:200, field:'dkyt', title:'地块用途',formatter:function(value){return formatTreeType(value);}},
			{hidden:false, align:'center', width:100, field:'dkytmj', title:'地块用途面积'},
			{hidden:true, align:'center', width:100, field:'id', title:'id'},
			{hidden:true, align:'center', width:100, field:'dkid', title:'地块ID'},
			{hidden:true, align:'center', width:100, field:'cjr', title:'创建人'},
			{hidden:true, align:'center', width:100, field:'cjsj', title:'创建时间'}
		]],
		rownumbers:true,
		pagination:true,
		nowrap:true,
		pageSize:10,
		onLoadSuccess:function(data){
		},
		toolbar: [
			{
				iconCls: 'i_app_add',
				text:"增加",
				handler: function(){
					$("#_tdmx_add_form").form("clear");
					initTreeSelectBox("_tdmx_add_dkyt","TDPZYT",true);
					$("#_tdmx_add_dkid").val(dkid);
					openWindow("_tdmx_add_window","增加",[$("#_tdmx_add_form")]);
					setDefaultFormData($("#_tdmx_add_form"));
				}
			},
			{
				iconCls: 'i_app_edit',
				text:"编辑",
				handler: function(){
					var data=$('#_dkytmx_list').datagrid('getSelections');
					if(validateOneRecord(data)){
						openWindow("_tdmx_edit_window","编辑",[$("#_tdmx_edit_form")]);
						initFormData($("#_tdmx_edit_form"),data[0]);
						initTreeSelectBox("_tdmx_edit_dkyt","TDPZYT");
						$("#_tdmx_edit_dkyt").combotree("setValue",data[0].dkyt);
						setDefaultFormData($("#_tdmx_edit_form"));
					}	
				}
			},
			{
				iconCls: 'i_app_delete',
				text:"删除",
				handler: function(){
					var data=$('#_dkytmx_list').datagrid('getSelections');
					if(validateMoreRecord(data)){
						var str ="";
						for(var i = 0 ; i < data.length;i++)
							str += "&keys=" + data[i].id;
						var url = "../phjgDkytxx/deletes.action" + "?" + str.substring(1);	
						deleteBatch(url,null,function(result){
							if(result != null && result > 0){
								$.messager.show({title:'系统消息',msg:'删除记录成功！',showType:'slide'});
								$('#_dkytmx_list').datagrid({
		    	    				url:"../phjgDkytxx/selectByDkid.action",
			    					queryParams:{"e.dkid":dkid}
			    				});
							}else{
								$.messager.alert('警告','删除记录失败！');
							}
						});
					}	
				} 
			}
		]					
	});
	$('.datagrid-header-inner .datagrid-cell').css("text-align","center");
	$('.datagrid-header-inner .datagrid-cell').css("height","auto");
	
	
	//增加窗体取消按钮事件
	$('#_tdmx_add_cancel').bind('click', function(){
		closeWindow('_tdmx_add_window');
	});  
	 
	//编辑窗体取消按钮事件
	$('#_tdmx_edit_cancel').bind('click', function(){
		closeWindow('_tdmx_edit_window');
	});  

	//地块明细增加页面保存按钮事件
	$('#_tdmx_add_save').bind('click', function(){
		var _tdmx_add_dkyt = $("#_tdmx_add_dkyt").combotree('getValue');
		var _tdmx_add_dkytmj = $("#_tdmx_add_dkytmj").val();
		if(_tdmx_add_dkyt == "" || _tdmx_add_dkyt == null ||_tdmx_add_dkyt == "-1"){
			$.messager.alert('警告','请选择地块用途');
			return;
		}
		if(_tdmx_add_dkytmj == "" || _tdmx_add_dkytmj == null){
			$.messager.alert('警告','地块用途面积不能为空');
			return;
		}
		
		$('#_tdmx_add_form').form('submit', {   
			url:"../phjgDkytxx/insert.action",
			onSubmit: function(){
				if(!validateFormChanged($('#_tdmx_add_form')))
					return false;
				return $(this).form('validate');
			},   
			success:function(row){   
				if(row != null && row > 0){
					$.messager.show({title:'系统消息',msg:'添加记录成功！',showType:'slide'});
					closeWindow('_tdmx_add_window',true);
					$('#_dkytmx_list').datagrid({
	    				url:"../phjgDkytxx/selectPagination.action",
    					queryParams:{"e.dkid":dkid},
    					onLoadSuccess:function(data){
    						if(data != null){
    							var str = "";
    							var dkmj = 0;
    							for(var i=0;i<data.rows.length;i++){
    								str += formatTreeType(data.rows[i].dkyt)+",";
    								dkmj += data.rows[i].dkytmj;
    							}
    							var dkyt = str.substring(0,str.length-1);
    							$("#_dkxx_dkyt").val(filterRepeatStr(dkyt));
    							$("#_dkxx_dkmj").val(dkmj);
    						}
    					}
    				});
	   	    	}else{
	   	    		$.messager.alert('系统消息','添加记录失败！');
	   	    	}  
	   	    } 
		});  
	});   
	
	//地块明细编辑页面保存按钮事件
	$('#_tdmx_edit_save').bind('click', function(){
		$('#_tdmx_edit_form').form('submit', {   
			url:"../phjgDkytxx/update.action",
			onSubmit: function(){
				if(!validateFormChanged($('#_tdmx_edit_form')))
					return false;
				return $(this).form('validate');
			},   
			success:function(row){   
				if(row != null && row > 0){
					$.messager.show({title:'系统消息',msg:'修改记录成功！',showType:'slide'});
	    			closeWindow('_tdmx_edit_window',true);
	    			$('#_dkytmx_list').datagrid({
	    				url:"../phjgDkytxx/selectPagination.action",
    					queryParams:{"e.dkid":dkid},
    					onLoadSuccess:function(data){
    						if(data != null){
    							var str = "";
    							var dkmj = 0;
    							for(var i=0;i<data.rows.length;i++){
    								str += formatTreeType(data.rows[i].dkyt)+",";
    								dkmj += data.rows[i].dkytmj;
    							}
    							var dkyt = str.substring(0,str.length-1);
    							$("#_dkxx_dkyt").val(filterRepeatStr(dkyt));
    							$("#_dkxx_dkmj").val(dkmj);
    						}
    					}
    				});
	    		
	   	    	}else{
	   	    		$.messager.alert('系统消息','修改记录失败！');
	   	    	}  
	   	    } 
		});  
	});   
});
//去掉重复的字符串
function filterRepeatStr(str){
	var ar2 = str.split(",");
	var resultStr='';
	var o={};
	for(var i=0;ar2[i]!=null;i++){
	if(ar2[i] in o)
		continue;
		resultStr+=ar2[i]+",";
		o[ar2[i]]='';
	}
	resultStr =  resultStr.substring(0,resultStr.length-1);
	return resultStr;
}

//土地用途不重复字符串
function RepeatStr(){
	var str="";
	$.ajax({
		url:"../phjgDkxx/selectByXmbh.action?e.xmid="+xmbh,
		type:"post",
		dataType:"json",
		async:false,
		success: function(data){
			var dataarr =data.rows[0];
			str=dataarr.dkyt;
			for(var i=1;i<data.rows.length;i++){
				dataarr =data.rows[i];
				str +=","+dataarr.dkyt;
			}
		}
	});
	return filterRepeatStr(str);
}

//总面积
function RepeatSumTDMJ(){
	var str=0;
	$.ajax({
		url:"../phjgDkxx/selectByXmbh.action?e.xmid="+xmbh,
		type:"post",
		dataType:"json",
		async:false,
		success: function(data){
			for(var i=0;i<data.rows.length;i++){
				dataarr =data.rows[i];
				str +=dataarr.dkmj;
			}
		}
	});
	return str;
}

//更新主表xmxxx   土地用途与土地面积
function reSetAjax(){
	//查询数据库土地用途去重
	var tdyt = RepeatStr();
	//地块土地面积
	var tdmj = RepeatSumTDMJ();
	var params = {"e.tdyt":tdyt, "e.tdmj":tdmj};
	$.ajax({
		url:"../phjgXmxx/updateByTdmjAndTdyt.action?e.xmbh="+xmbh,
		data:params,
		type:"post",
		dataType:"json",
		async:false,
		success: function(data){
		}
	});
}







