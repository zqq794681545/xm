<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="../css/base.css">
		<link rel="stylesheet" type="text/css" href="../javascript/easyui/themes/bootstrap/easyui.css">
		<link rel="stylesheet" type="text/css" href="../javascript/easyui/themes/bootstrap/easyui-extend.css">
		<link rel="stylesheet" type="text/css" href="../javascript/easyui/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="../css/button.css">
		<link rel="stylesheet" type="text/css" href="../javascript/easyui/themes/color.css">
		<script type="text/javascript" src="../js/jquery-1.8.3.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../javascript/easyui/jquery.min.js"></script>
		<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../javascript/easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="../javascript/easyui/easyui.tree.extend.js"></script>
		<script type="text/javascript" src="../javascript/easyui/easyui.treegrid.extend.js"></script>
		<script type="text/javascript" src="../javascript/easyui/tabs.ext.js"></script>
		<script type="text/javascript" src="../javascript/easyui/locale/easyui-lang-zh_CN.js"></script>
		
		<script type="text/javascript" src="../javascript/jquery.cookie.js"></script>
		<script type="text/javascript" src="../javascript/easyuiutil.js"></script>
		<script type="text/javascript" src="../javascript/basecombobox.js"></script>
		<script type="text/javascript" src="../javascript/phjg.common.js"></script>
		<script type="text/javascript" src="../javascript/store.js"></script>
		<script type="text/javascript" src="../javascript/basetype.js"></script>
		
		<script type="text/javascript" charset="utf-8" src="../javascript/ueditor/ueditor.config.js"> </script>
		<script type="text/javascript" charset="utf-8" src="../javascript/ueditor/ueditor.all.js"></script>
	    <script type="text/javascript" charset="utf-8" src="../javascript/ueditor/lang/zh-cn/zh-cn.js"></script>
		
		<script type="text/javascript" src="../content/dkxx.js" charset="UTF-8"></script>
		<style>
			body,html {
				margin: 0;
			}
		</style>
	</head>
	<body>
		<div class="easyui-layout" data-options="fit:true">
			<div region="center" data-options="border:false">
				<table id="_dkxx_list" data-options="striped:true,fit:true"></table>
			</div>
		</div> 
		<!-- 地块信息 -->
		<div id="_dkxx_window" class="easyui-window" data-options="width:850,draggable:true,shadow:true,modal:true,closed:true,minimizable:false,closable:false,maximizable:false,collapsible:false">
			<form action="" method="post" id="_dkxx_add_form">
           		<table width="100%" class="table-edit">
           			<tr>
           				<th><i class = "labelrequired">*</i>&nbsp;地块编号：</th>
						<td>
							<input type="text"  name="e.dkbh" id="_dkxx_dkbh" />
							<input type="hidden" name="e.id" id="_dkxx_id">
							<input type="hidden" name="e.xmid" id="_dkxx_xmid">
							<input type="hidden" name="e.cjr" id="_dkxx_cjr">
							<input type="hidden" name="e.cjsj" id="_dkxx_cjsj">
							<input type="hidden" name="e.dkjzmj" id="_dkxx_dkjzmj">
						</td>
           				<th>地块面积（平方米）：</th>
						<td>
							<input type="text" style="width:80%" name="e.dkmj" readonly="readonly"  id="_dkxx_dkmj" />
						</td>
           			</tr>
           			<tr>
           				<th>地块用途：</th>
           				<td colspan="3"><input type="text" size="70" readonly="readonly" name="e.dkyt" id="_dkxx_dkyt" /></td>
           			</tr>
	         	</table>
	         	<div style="height: 30px;font-size: 15px;padding-bottom:10px;padding-left: 5px;font-family:Microsoft YaHei;">
	         		<table>
	         			<tr>
	         				<td width="5%"><img src="../image/buttons/project.png"></td>
	         				<td><p>地块用途明细</p></td>
	         			</tr>
	         		</table>
				</div>
             	<div id="_tdytmx_panel" class="easyui-panel"  >
					<table id="_dkytmx_list" style="height:260px" data-options="striped:true"></table>
				</div>
			</form>
			<div  class="bgcolor" data-options="border:false">
				<div style="margin-top: 2px;text-align: center;margin-bottom: 2px;">
					<a id="_dkxx_save_button" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a> 
				</div>
			</div>
		</div>
		
		<!-- 地块明细 添加窗口-->
		<div id="_tdmx_add_window" class="easyui-window" data-options="width:650,draggable:true,shadow:true,modal:true,closed:true,closable:true,minimizable:false,maximizable:false,collapsible:false">
             <form action="" method="post" id="_tdmx_add_form">
				<table width="100%" class="table-edit">
					<tr>
						<th width="18%"><i class = "labelrequired">*</i>&nbsp;地块主要用途：</th>
						<td width="35%"><input type="text" size="30" name="e.dkyt"  id="_tdmx_add_dkyt" />
						<th width="18%"><i class = "labelrequired">*</i>&nbsp;地块用途面积：</th>
						<td width="30%"><input type="text"  name="e.dkytmj" calss="matchNum" id="_tdmx_add_dkytmj" />
					</tr>
					<tr>
						<td colspan="4" style="text-align: center">
							<input type="hidden" name="e.id" id="_tdmx_add_id">
							<input type="hidden" name="e.dkid" id="_tdmx_add_dkid">
							<input type="hidden" name="e.cjr" id="_tdmx_add_cjr">
							<input type="hidden" name="e.cjsj" id="_tdmx_add_cjsj">
							<a id="_tdmx_add_save" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a> 
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<a id="_tdmx_add_cancel" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'">关闭</a>
						</td> 
					</tr>
				</table>
			</form>
		</div>
		
		<!-- 地块明细 编辑窗口-->
		<div id="_tdmx_edit_window" class="easyui-window" data-options="width:650,draggable:true,shadow:true,modal:true,closed:true,closable:true,minimizable:false,maximizable:false,collapsible:false">
             <form action="" method="post" id="_tdmx_edit_form">
				<table width="100%" class="table-edit">
					<tr>
						<th><i class = "labelrequired">*</i>&nbsp;地块主要用途：</th>
						<td><input type="text"  name="e.dkyt" id="_tdmx_edit_dkyt" />
						<th>地块用途面积：</th>
						<td><input type="text"  name="e.dkytmj" id="_tdmx_edit_dkytmj" />
					</tr>
					<tr>
						<td colspan="4" style="text-align: center">
							<input type="hidden" name="e.id" id="_tdmx_edit_id">
							<input type="hidden" name="e.dkid" id="_tdmx_edit_dkid">
							<input type="hidden" name="e.cjr" id="_tdmx_edit_cjr">
							<input type="hidden" name="e.cjsj" id="_tdmx_edit_cjsj">
							<a id="_tdmx_edit_save" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a> 
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<a id="_tdmx_edit_cancel" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'">关闭</a>
						</td> 
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>