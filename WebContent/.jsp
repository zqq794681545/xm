<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="../javascript/easyui/themes/bootstrap/easyui.css">
		<link rel="stylesheet" type="text/css" href="../javascript/easyui/themes/bootstrap/easyui-extend.css">
		<link rel="stylesheet" type="text/css" href="../javascript/easyui/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="../css/button.css">
		<link rel="stylesheet" type="text/css" href="../javascript/easyui/themes/color.css">
		<script type="text/javascript" src="../javascript/easyui/jquery.min.js"></script>
		<script type="text/javascript" src="../javascript/easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="../javascript/easyui/easyui.tree.extend.js"></script>
		<script type="text/javascript" src="../javascript/easyui/easyui.treegrid.extend.js"></script>
		<script type="text/javascript" src="../javascript/easyui/tabs.ext.js"></script>
		<script type="text/javascript" src="../javascript/easyui/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="../javascript/project.common.js"></script>
		<script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
		<script type="text/javascript" src="../javascript/util.js"></script>
		<script type="text/javascript" src="../javascript/easyuiutil.js"></script>
		<script type="text/javascript" src="../javascript/basecombobox.js"></script>
		<script type="text/javascript" src="../javascript/util.common.js"></script>
		<script type="text/javascript" src="../javascript/store.js"></script>
		<script type="text/javascript" src="../javascript/basetype.js"></script>
		<script type="text/javascript" src="../javascript/baseutil.js"></script>
		<link rel="stylesheet" type="text/css" href="../css/loading.css">
		<script type="text/javascript" src="../javascript/loading.js" charset="UTF-8"></script>
	</head>
	<body>
		<div id='loading' class="_loading"></div>
		<div class="easyui-layout" data-options="fit:true">
			<div region="north" data-options="border:false,title:'查询',iconCls:'i_app_magnify',collapsible:false" style="height:65px;">
				<form action="" method="post" id="__search_form"> 
					<table>
						<tr>
							<td>
								<a href="javascript:void(0);" id="__search_button" class="easyui-linkbutton" data-options="plain:true,iconCls:'i_app_search'">查询</a>
								<a href="javascript:void(0);" id="__reset_button"  class="easyui-linkbutton" data-options="plain:true,iconCls:'i_app_refresh'">重置</a> 
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div region="center" data-options="border:false">
				<table id="__table" data-options="striped:true,fit:true"></table>
			</div>
		</div>
		
		<div id="__add_window" class="easyui-window" data-options="title:'新增',width:350,draggable:true,shadow:true,modal:true,closed:true,closable:true,minimizable:false,maximizable:false,collapsible:false">
			<form action="" method="post" id="__add_form">
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300"  name="e.phjgname" id="__add_phjgname" />
				</div>
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300"  name="e.xzqh" id="__add_xzqh" />
				</div>
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300"  name="e.id" id="__add_id" />
				</div>
				<div style="margin-top:15px;margin-bottom:15px;text-align: center;">
					<a href="javascript:void(0);" id="__add_save_button" class="easyui-linkbutton" data-options="">保存</a>
					<a href="javascript:void(0);" id="__add_cancel_button" class="easyui-linkbutton" data-options="">取消</a>
				</div>
			</form>
		</div>
		
		<div id="__edit_window" class="easyui-window" data-options="title:'编辑',width:350,draggable:true,shadow:true,modal:true,closed:true,closable:true,minimizable:false,maximizable:false,collapsible:false">
			<form action="" method="post" id="__edit_form">
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300"  name="e.phjgname" id="__edit_phjgname" />
				</div>
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300"  name="e.xzqh" id="__edit_xzqh" />
				</div>
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300"  name="e.id" id="__edit_id" />
				</div>
				<div style="margin-top:15px;margin-bottom:15px;text-align: center;">
					<a href="javascript:void(0);" id="__edit_save_button" class="easyui-linkbutton" data-options="">保存</a>
					<a href="javascript:void(0);" id="__edit_cancel_button" class="easyui-linkbutton" data-options="">取消</a>
				</div>
			</form>
		</div>
		
		<div id="__view_window" class="easyui-window" data-options="title:'查看',width:350,draggable:true,shadow:true,modal:true,closed:true,closable:true,minimizable:false,maximizable:false,collapsible:false">
			<form action="" method="post" id="__view_form">
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300,readonly:true"  name="e.phjgname" id="__view_phjgname" />
				</div>
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300,readonly:true"  name="e.xzqh" id="__view_xzqh" />
				</div>
				<div style="margin-top:15px">
					<input type="text" class="easyui-textbox" data-options="label:'：',required:true,labelAlign:'right',labelWidth:100,width:300,readonly:true"  name="e.id" id="__view_id" />
				</div>
				<div style="margin-top:15px;margin-bottom:15px;text-align: center;">
					<a href="javascript:void(0);" id="__view_cancel_button" class="easyui-linkbutton" data-options="">取消</a>
				</div>
			</form>
		</div>
		
		<script type="text/javascript" src="../.js" charset="UTF-8"></script>	
	</body>
</html>