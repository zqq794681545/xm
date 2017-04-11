/**  
* layout方法扩展(伸缩按钮隐藏)
*/  
$.extend($.fn.layout.methods, {
	setRegionToolVisableState : function(jq, params) {
		return jq.each(function() {
			if (params.region == "center")
				return;
			var panels = $.data(this, 'layout').panels;
			var panel = panels[params.region];
			var tool = panel.panel('header').find('>div.panel-tool');
			tool.css({
				display : params.visible ? 'block' : 'none'
			});
			var first = params.region.substring(0, 1);
			var others = params.region.substring(1);
			var expand = 'expand' + first.toUpperCase() + others;
			if (panels[expand]) {
				panels[expand].panel('header').find('>div.panel-tool').css(
						{
							display : params.visible ? 'block' : 'none'
						});
			}
		});
	}
});  