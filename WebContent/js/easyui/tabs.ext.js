(function($){
    function appendIframeToTab(target, tabTitle, url){
    	
    	var _h = target.clientHeight;
        var iframe = $('<iframe>')
            .attr('height', _h-28)
            .attr('width', '100%')
            .attr('marginheight', '0')
            .attr('marginwidth', '0')
            .attr('frameborder', '0')
        	.attr('scrolling', 'no');
        
        //setTimeout(function(){
            iframe.attr('src', url);
        //}, 10);
        var tab = $(target).tabs('getTab', tabTitle);
        tab.panel('body').css({'overflow':'hidden'}).empty().append(iframe);
    }

    var defaultMethods = $.extend({}, $.fn.tabs.methods);

    $.extend($.fn.tabs.methods, {
        add: function(jq, options){
            return jq.each(function(){
                var url = null;
                if(options.href || /^url:/.test(options.content)){
                    url = options.href || options.content.substr(4, options.content.length);
                    delete options.content;
                    delete options.href;
                }

                if(url){
                    if(options.iframe){
                        defaultMethods.add(jq, options);
                        appendIframeToTab(this, options.title, url);
                    }else{
                        defaultMethods.add(jq, $.extend(options, {href: url}));
                    }
                }else{
                    defaultMethods.add(jq, options);
                }

            });
        }
    });
})(jQuery);
