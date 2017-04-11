/**
 * 接收参数
 * @param parName 参数名称（必须参数）
 * @returns 接收到参数
 */
function sfPhone(phone){
	var r=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	var result = r.test(phone);
	return result;
}
/**
 * 接收参数
 * @param parName 参数名称（必须参数）
 * @returns 接收到参数
 */
function sfPhone1(phone){
	var r=/^(\d{7,8})$/;
	var result = r.test(phone);
	return result;
}

/**
 * 接收url传的参数
 * @param parName 参数名称（必须参数）
 * @returns 接收到参数
 */
function getParameter(parName){
	var str = parName.toLowerCase() + "=";
	var gvalue = "";
	var HREF = location.href;
	var upperHREF = location.href.toLowerCase();
	if(upperHREF.indexOf(str)>0){
	gvalue = HREF.substring(upperHREF.indexOf(str) + str.length,upperHREF.length);
	if(gvalue.indexOf('&')>0) gvalue = gvalue.substring(0,gvalue.indexOf('&'));
	if(gvalue.indexOf("#")>0) gvalue = gvalue.split("#")[0];
	}
	return gvalue;
}
/**
 * 接收date参数,验证时间是否正确
 * @param RQ 参数名称（必须参数）
 * @returns true or false
 */
function RQcheck(RQ) {
    var date = RQ;
    var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

    if (result == null)
        return false;
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);

}
/**
 * 数字小写转换大写
 * @param num 参数名称（必须参数）
 * @returns 返回参数
 */
function digitUppercase(n) {  
    var fraction = ['角', '分'];  
    var digit = [  
        '零', '壹', '贰', '叁', '肆',  
        '伍', '陆', '柒', '捌', '玖'  
    ];  
    var unit = [  
        ['元', '万', '亿'],  
        ['', '拾', '佰', '仟']  
    ];  
    var head = n < 0 ? '欠' : '';  
    n = Math.abs(n);  
    var s = '';  
    for (var i = 0; i < fraction.length; i++) {  
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');  
    }  
    s = s || '整';  
    n = Math.floor(n);  
    for (var i = 0; i < unit[0].length && n > 0; i++) {  
        var p = '';  
        for (var j = 0; j < unit[1].length && n > 0; j++) {  
            p = digit[n % 10] + unit[1][j] + p;  
            n = Math.floor(n / 10);  
        }  
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;  
    }  
    return head + s.replace(/(零.)*零元/, '元')  
        .replace(/(零.)+/g, '零')  
        .replace(/^整$/, '零元整');  
};  
/**
 * 去掉左右空格
 * @param str 字符（必须参数）
 * @returns
 */
function trim(str){   
	return str.replace(/(^\s*)|(\s*$)/g, "");   

}

//换行和换空格
function to_text(str){
	if(str == null)
		return null;
	else
		return str.split("\r\n").join('<br>').split(" ").join('&nbsp;&nbsp;');
}

/**
 * 初始化数字字典
 * @param id   需要初始化的input的id (必须参数)
 * @param code 数字字典类型的编码 (必须参数)
 * @param isSetDefault (是否显示:--请选择--，--请选择--默认值为-1)
 * @param isMultiple (是否多选:true，否 默认值为false)
 * @param panelHeight (下拉框的高度)
 */
function initSelectBoxQ(id,code,isSetDefault,isMultiple,panelHeight){
	var _option=[];
	if(isMultiple){
	}else{
		isMultiple=false;
	}
	if(isSetDefault)
		_option.push({name:"--请选择--",value:-1,selected:true});
	else{
		_option.push({name:"--请选择--",value:-1,selected:false});
	}
	$.ajax({
		 url:"../tBaseType/tBaseTypeAction-selectByCode.action?e.code="+code,
		 type:"post",
		 dataType:"json",
		 async: false,
		 success: function(data){ 
			if(data != null){
				for(var i=0;i<data.length;i++){
					_option.push({name:data[i].name,value:data[i].value});
				}
			}	
		 }	
	 });
	$("#"+id).combobox({
		valueField: 'value',
		textField: 'name',
		editable: false,
		data:_option,
		multiple:isMultiple,
		panelHeight:panelHeight,
		onSelect:function(record){
			if(record.value == "-1"){
				$("#"+id).combobox('setValue','-1');
			}else{
				$("#"+id).combobox('unselect','-1');
			}
		}
	});  
}
/**
 * 初始化数字字典
 * @param id   需要初始化的input的id (必须参数)
 * @param code 数字字典类型的编码 (必须参数)
 * @param isSetDefault (是否显示:--请选择--，--请选择--默认值为-1)
 * @param isMultiple (是否多选:true，否 默认值为false)
 * @param panelHeight (下拉框的高度)
 */
function initSelectBox(id,code,isSetDefault,isMultiple,panelHeight){
	var _option=[];
	if(isMultiple){
	}else{
		isMultiple=false;
	}
	if(isSetDefault)
		_option.push({name:"--请选择--",value:-1,selected:true});

	$.ajax({
		 url:"../tBaseType/tBaseTypeAction-selectByCode.action?e.code="+code,
		 type:"post",
		 dataType:"json",
		 async: false,
		 success: function(data){ 
			if(data != null){
				for(var i=0;i<data.length;i++){
					_option.push({name:data[i].name,value:data[i].value});
				}
			}	
		 }	
	 });
	$("#"+id).combobox({
		valueField: 'value',
		textField: 'name',
		editable: false,
		data:_option,
		multiple:isMultiple,
		panelHeight:panelHeight,
		onSelect:function(record){
			if(record.value == "-1"){
				$("#"+id).combobox('setValue','-1');
			}else{
				$("#"+id).combobox('unselect','-1');
			}
		}
	});  
}

/**
 * ajax重装
 * @param url (必须参数)
 * @param data 传递参数(必须参数,没有请填写null)
 * @param success 成功操作(非必须参数)
 * @param async是否异步（true为异步，false为同步，默认为同步）
 */
function ajax(url,data,success,async){
	if(url == null || url == "" || url == "undefined")
		return false;
	if(success == null || success == "undefined")
		success = function(data,textStatus){};
	if(async != false && async != true)
		async = false;
	$.ajax({
		url:url,
		data:data,
		type:"post",
		dataType:"json",
		async: false,
		success: function(result,textStatus){ 
			success(result,textStatus);
		}	
	});
}

/**
 * 格式化日期
 * @param date 日期
 */
//function formatterDate(date) {
//	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
//	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
//	+ (date.getMonth() + 1);
//	return date.getFullYear() + '-' + month + '-' + day;
//};
/**
 * 格式化数字字典
 * @param code 字典类型编码（必须参数）
 * @param value 字典的值（必须参数）
 */
function formatType(code,value) {
	var name = "";
	if(value == null || value=="-1")
		return null;
	var valueArray = value.split(",");
	if(valueArray != null && valueArray.length>0){
		for(var i = 0 ;i < valueArray.length;i++){
			$.ajax({
				 url:"../tBaseType/tBaseTypeAction-selectByCodeAndValue.action?e.code="+code+"&e.value="+trim(valueArray[i]),
				 type:"post",
				 dataType:"json",
				 async:false,
				 success: function(result){
						name += "," + result.name;
					}
				 }	
			 );
		}
		if(name != null && name.length > 0)
			name = name.substring(1, name.length);
	}else{
		return "";
	}
	return name;
}
	

//转化是否	
function formatSF(value){
	if(value == "1")
		return "是";
	else if(value == "0")
		return "否";
	else
		return "";
}

/**
 * 初始化编辑数据
 * @param formid 表单的id（必须参数）
 * @param e 数据map
 */
function initFormData(formTarget,e){ 
	if(e == null)
		return;
	str = "{";
	for (var key in e) {  
		str += "'e."+key +"':" + "e."+key + ",";
    } 
	if(str != "{")
		str  = str.substring(0, str.length-1);
	str += "}";
	var json = eval('(' + str + ')'); 
	formTarget.form('load',json);
}

/**
 * 批量删除
 * @param url 删除的url (必须参数)
 * @param data 传递参数(必须参数,没有请填写null)
 * @param success 成功操作(非必须参数,若为，default时，默认判断返回时是否大于0，若>则弹出成功标志，并刷新页面)
 * @param message 删除的提示信息(非必须参数,默认提示信息：您确定要删除选中记录吗?)
	注：若后非必须参数有需要写上时，必须将该参数之前的参数一一补齐，可用null补上
 */
function deleteBatch(url,data,success,message){
	if(url == null || url == "" || url == "undefined")
		return false;
	if(success == null || success == "undefined")
		success = function(data,textStatus){};
	else if(success == "default"){
		success = function(data,textStatus){
			if(data != null && data > 0){
				$.messager.show({title:'系统消息',msg:'删除记录成功！',showType:'slide'});
				$('#_list').datagrid('reload');	
			}
		};
	}	
	if(message == null || message == "" || message == "undefined")
		message = "您确定要删除选中记录吗?";
	$.messager.confirm('确认删除',message,function(r){   
		if(r){
			$.ajax({
				url:url,
				data:data,
				type:"post",
				dataType:"json",
				async: false,
				success: function(result,textStatus){ 
					success(result,textStatus);
				}	
			});
		}
	});
}

/**
 * 弹出窗口
 * @param id 窗口id（必须参数）
 * @param title 窗口的标题(必须参数)
 * @param onClose 关闭行为（非必须参数：默认为：清空该id下所有form中的数据）
 * @param formTargets 要验证表单的改变的表单数组节点（非必须参数：默认为：不验证,若formTargets中有节点值时，则将重构onBeforeClose函数，表现为：表单数据被改变，关闭前提示是否保存数据后关闭）
 */
function openWindow(id,title,formTargets,onClose,href){
	var parentWidth = $(window).width();
	var width = $("#"+id).parent().outerWidth();
	if(width > parentWidth)
		width = parentWidth;
	var parentHeight = $(window).height();
	var height = $("#"+id).parent().outerHeight();
	if(height > parentHeight)
		height = parentHeight;
	var left = (parentWidth - width)/2;
	var top = (parentHeight - height)/2;
	//关闭后
	if(onClose == null || onClose == "" || onClose == "undefined"){
		onClose = function(){
			$("#"+id+" > form").each(function(){
				$(this).form('clear');
			});
			$("#"+id).find(":input[readonly]").each(function(){
				$(this).attr("readonly",false);
			});
		};
	}
	//关闭前
	var onBeforeClose = function(){return true;};
	if(formTargets instanceof Array && formTargets.length > 0){
		onBeforeClose = function(){
			var result = true;
			for(var i = 0 ;i < formTargets.length; i++){
				if(isFormChanged(formTargets[i])){
					$.messager.confirm('确认离开',"页面数据已被修改，您确定要离开当前页面吗？请按“确定”继续，未保存数据将会丢失，或按“取消”回到当前页。",function(r){ 
						if(r){
							$('#'+id).window('close', true); 
							result = true;
						}else{
							result = false;
						}
					});
					return false;
				}
			}
			return result;
		};
	}

	if(href == null || href == "" || href == "undefined"){
		$("#"+id).window({
			width:width,
			height:height,
			top:top,
			left:left,
			title:title,
			onBeforeClose:onBeforeClose,
			onClose:onClose
		}).window('open');
	}else{
		$("#"+id).window({
			width:width,
			height:height,
			top:top,
			left:left,
			title:title,
			onBeforeClose:onBeforeClose,
			onClose:onClose,
			href:href
		}).window('open');
	}
}

/**
 * 验证记录是否为一条，若不为一条，并弹出警告窗口
 * @param json 需要判断的json数组（必须参数） 
 */
function validateOneRecord(json,noMessage,moreMessage) {
	if(noMessage == null || noMessage == "undefined" || noMessage == ""){
		noMessage = "请选择一条记录！";
	}
	if(moreMessage == null || moreMessage == "undefined" || moreMessage == ""){
		moreMessage = "最多只能选择一条记录！";
	}
	if(json.length < 1){
		$.messager.alert('警告',noMessage);
		return false;
	}if(json.length > 1){
		$.messager.alert('警告',moreMessage);
		return false;
	}else
		return true;
}

/**
 * 获取当前tab名称
 * @param id
 * @returns title
 */
function getSelectedTabName(id){
	return $('#'+id).tabs('getSelected').panel('options').title;
}

/**
 * 将字符串转成json
 * @param str 字符串 
 */
function stringToJson(str){
	return  eval('(' + str + ')'); 
}

/**
 * 验证是否至少一条记录
 * @param json 需要判断的json数组（必须参数） 
 */
function validateMoreRecord(json,noMessage) {
	if(noMessage == null || noMessage == "undefined" || noMessage == ""){
		noMessage = "请至少选择一条记录！";
	}
	if(json.length < 1){
		$.messager.alert('警告',noMessage);
		return false;
	}else
		return true;
}

/**
 * 关闭窗口
 * @param id 窗口id（必须参数）
 * @param isBeforeColse 是否执行关闭前事件 (true 表示不执行关闭事件，其他的表示执行关闭事件，默认为执行)
 */
function closeWindow(id,isBeforeColse){
	if(isBeforeColse == true)
		$("#"+id).window('close',true);
	else
		$("#"+id).window('close');
}

/**
 * 判断表单时候被改变，必须和setDefaultFormData(formid)方法联用
 * @param formTarget (必须参数) 表单节点
 */
function isFormChanged(formTarget){
	var isChanged = false;
	formTarget.find(":input").each(function(){
		var type = this.type;
		if(type == "select-one"){
			for (var j = 0; j < this.options.length; j++){  
	            if (this.options[j].selected != this.options[j].defaultSelected){  
	                isChanged = true;
	                return false;  
	            }  
			}  
		}else if(type == "checkbox" || type == "radio"){
			if(this.checked != this.defaultChecked){
				 isChanged = true; 
	             return false; 
			}
		}else if(type == "textarea" || type == "text" || type == "hidden" || type == "image" || type == "password"){
			if(this.value != this.defaultValue){
				isChanged = true;  
				return false; 
			}
		}else{}

	});
	return isChanged;
}

/**
 * 为表单设置默认的值（默认将当前表单中各元素的值设为默认值，后常和isFormChanged(formid)联用）
 * @param formTarget (必须参数) 表单节点
 */
function setDefaultFormData(formTarget){
	formTarget.find(":input").each(function(){
		var type = this.type;
		if(type == "select-one"){
			for (var j = 0; j < this.options.length; j++){  
				this.options[j].defaultSelected = this.options[j].selected;
			}  
		}else if(type == "checkbox" || type == "radio"){
			this.defaultChecked = this.checked;
		}else if(type == "textarea" || type == "text" || type == "hidden" || type == "image" || type == "password"){
			this.defaultValue = this.value;
		}
	});
}
/**
 * 
 * 验证是否改变表单
 */
function validateFormChanged(formTarget){
	var isChanged = isFormChanged(formTarget);
	if(!isChanged){
		$.messager.alert('警告',"数据未做任何修改，若要关闭此窗口，请点击关闭按钮！");
		return false;
	}
	return true;
}

/**
 * 初始化下拉树
 * @param id   需要初始化的input的id (必须参数)
 * @param code 对应类型的编码 (必须参数)
 * @param isSetDefault (是否显示:--请选择--)
 * @param checkbox (是否显示:复选框)
 */
function initTreeSelectBox(id,code,isSetDefault,checkbox){
	var _option=[];
	if(isSetDefault)
		_option.push({code:code,id:"-1",name:"--请选择--",pid:-1,sequ:-99,status:1,updateTime:"1900-01-01 00:00:00",value:"-1"});
	$.ajax({
		 url:"../tBaseType/tBaseTypeAction-selectAllByCode.action?e.code="+code,
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
	$("#"+id).combotree({
		data:_option,
		idField:'id',
        textField: 'name',
        parentField: 'pid',
        valueField: 'value',
        checkbox:checkbox,
        attributes: ['id','code','name','value','pid','type','updateTime','status']
	});  
	if(isSetDefault)
		$("#"+id).combotree("setValue",-1);
}
/**
 * 格式化数字字典(树形)
 * @param value 字典的值（必须参数）
 */
function formatTreeType(value) {
	var name = "";
	if(value == null)
		return null;
	$.ajax({
		 url:"../tBaseType/tBaseTypeAction-selectByKey.action?e.id="+value,
		 type:"post",
		 dataType:"json",
		 async:false,
		 success: function(result){
			if(result != null){
				name = result.name;
			}
		 }	
	 });
	return name;
}

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

/**
 * 初始化数字字典
 * @param target   需要初始化的input的节点 (必须参数)
 * @param json 数据json
 * @param isSetDefault (是否显示:--请选择--，--请选择--默认值为-1)
 * @param isMultiple (是否多选:true，否 默认值为false)
 */
function initSelectBoxByJson(target,json,isSetDefault,isMultiple){
	if(!(json instanceof Array))
		json = [];	
	if(isSetDefault)
		json.unshift({name:"--请选择--",value:-1,selected:true});
	target.combobox({
		valueField: 'value',
		textField: 'name',
		editable: false,
		multiple: isMultiple,
		data:json
	});  
}

//格式化办公用语类型
function formatBgyylx(value){
	if(value == 0)
		return "公共办公用语";
	else if(value == 1)
		return "个人办公用语";
	else
		return "";
}

/**
 * 将json转成字符串
 * @param json 对象
 */
function jsonToString(json){
	return JSON.stringify(json);
}

/**
 * 是否延时的图片
 * @param value
 * @returns {String}
 */
function formatIstimeout(value){
	if(value > 0)
		return "<img src = '../image/warning/green.png'/>";
	else if(value == 0)
		return "<img src = '../image/warning/yellow.png'/>";
	else if(value < 0)
		return "<img src = '../image/warning/red.png'/>";
}
/**
 * 接收hrefurl传的参数
 * @param parName 参数名称（必须参数）
 * @returns 接收到参数
 */
function getHrefParameter(parName,url){
	//var HREF = $("#_href").val();
	var str = parName.toLowerCase() + "=";
	var gvalue = "";
	var upperHREF = url.toLowerCase();
	if(upperHREF.indexOf(str)>0){
	gvalue = url.substring(upperHREF.indexOf(str) + str.length,upperHREF.length);
	if(gvalue.indexOf('&')>0) gvalue = gvalue.substring(0,gvalue.indexOf('&'));
	if(gvalue.indexOf("#")>0) gvalue = gvalue.split("#")[0];
	}
	return gvalue;
}

function getTrue(text,xmbh,zt,fn){
	$.messager.confirm('警告',text,function(r){ 
		if(r){
			$.ajax({
				url:"../phjgXmxx/updateZt.action?e.xmbh="+xmbh+"&States="+zt+"&e."+zt+"=1",
				dataType:"json",
				success: function(row){
					if(row==1){
						fn();
					}
					else{
						$.messager.alert('警告','开工提醒更新失败！');
					}
				}
			});
		}else{
			return false;
		}
	});
}
/**
 * 通知书提交
 * @param parName 参数名称（必须参数）
 * @returns 接收到参数
 */
function getTrue1(xmbh,zt){
		$.ajax({
			url:"../phjgXmxx/updateZt.action?e.xmbh="+xmbh+"&States="+zt+"&e."+zt+"=1",
			dataType:"json",
			success: function(row){
				if(row==1){
					$.messager.show({title:'系统消息',msg:'提交成功！',showType:'slide'});
				}
				else{
					$.messager.alert('警告','提交失败！');
				}
			}
		});

}

/**
 * 流程意见类型
 * @param value
 * @returns {String}
 */
function formatYjlx(value){
	if(value == "-2")
		return "回退";
	else if(value == "-1")
		return "终止";
	else if(value == "退件")
		return "退件";
	else
		return "通过";
}

/**
 * datetimebox  yyyy-MM-dd HH:mm:ss
 * @param date
 * @returns {String}
 */
function formatterDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	var hor = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	return date.getFullYear() + '-' + month + '-' + day+" "+hor+":"+min+":"+sec;
};
/**
 * 是否
 * @param value
 */
function isSf(value){
	if(value == ""){
		return "";
	}
	if(value == 1){
		return "是";
	}else if(value == 2){
		return "否";
	}
}