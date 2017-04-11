$(document).ready(function(){

	$('#__table').datagrid({
		url:'xmxx/selectPagination.action',
		queryParams:{},
		columns:[[
			{field:'ck',checkbox:true}//,sortable:true
			,{hidden:false,align:'center',halign:'center',width:100,field:'phjgname',title:''}
			,{hidden:false,align:'center',halign:'center',width:100,field:'xzqh',title:''}
			,{hidden:false,align:'center',halign:'center',width:100,field:'id',title:''}
		]],
		rownumbers:true,
		pagination:true,
		nowrap:true,
		pageSize:20,
		toolbar: [
			{
				iconCls: 'i_app_add',
				text:"增加",
				handler: function(){
					$('#__add_window').window('open');
					$('#__add_form').form('reset');
				}
			},
			{
				iconCls: 'i_app_edit',
				text:"编辑",
				handler: function(){
					var data = $('#__table').datagrid('getSelections');
					if(easyuiutil.unique(data)){
						$('#__edit_window').window('open');
						$('#__edit_form').form('reset').form('load',easyuiutil.parseJSON(data));
					}
				}
			},
			{
				iconCls: 'i_app_delete',
				text:"删除",
				handler: function(){
					var data = $('#__table').datagrid('getSelections');
					if(easyuiutil.uniques(data)){
						var url = 'xmxx/deletes.action' + easyuiutil.keys4del(data,'id');
						$.messager.confirm('确认删除','确认删除选择的记录？',function(r){
							if(r){
								$.ajax({
									url:url,
									dataType:"json",
									success: function(result){
										if(result > 0){
											$('#__table').datagrid('reload');
										}else{
											$.messager.alert('警告','删除记录失败！');
										}
									}
								});
							}
						});
					}
				}
			},
			{
				iconCls: 'i_app_view',
				text:"查看",
				handler: function(){
					var data = $('#__table').datagrid('getSelections');
					if(easyuiutil.unique(data)){
						$('#__view_window').window('open');
						$('#__view_form').form('reset').form('load',easyuiutil.parseJSON(data));
					}
				}
			}
		]
	});
	
	//条件查询按钮事件
	$('#__search_button').click(function(){
		var queryParams ={};
		$('#__table').datagrid('load',queryParams);
	});
	
	//重置按钮
	$('#__reset_button').click(function(){
		$('#__search_form').form('reset');
	});
	
	//增加页面保存按钮事件
	$('#__add_save_button').click(function(){
		$('#__add_form').form('submit',{
			url:'xmxx/insert.action',
			success:function(row){
			if(row > 0){
				$('#__add_window').window('close');
				$('#__table').datagrid('reload');
			}else{
				$.messager.alert('系统消息','添加记录失败！');
			}}
		});
	});
	
	//编辑页面保存按钮事件
	$('#__edit_save_button').click(function(){
		$('#__edit_form').form('submit',{
			url:'xmxx/update.action',
			success:function(row){
			if(row > 0){
				$('#__edit_window').window('close');
				$('#__table').datagrid('reload');
			}else{
				$.messager.alert('系统消息','修改记录失败！');
			}}
		});
	});
	
	//增加窗体取消按钮事件
	$('#__add_cancel_button').click(function(){
		$('#__add_window').window('close');
	});
	
	//编辑窗体取消按钮事件
	$('#__edit_cancel_button').click(function(){
		$('#__edit_window').window('close');
	});
	
	//查看窗体关闭按钮事件
	$('#__view_cancel_button').click(function(){
		$('#__view_window').window('close');
	});
	
});


