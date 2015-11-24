;(function($, window, document, undefined){
	$.fn.autoSwitch = function(options) {
      var defaultOptions = {
               optBottom: 20,
               optAtagWidth: 10,
               animateSpeed: 500,
               containerWidth: 1000,
               containerHeight: 200
            },
            curIndex = 0;

      options = $.extend(defaultOptions, options);

      function getHtml() {
         var html = ['<ul class="zjdgx-auto-switch">'],
               opts = ['<div class="opt">'];

         $.each(options.imgs, function (index, value) {
            html.push('<li style="left: ' + (options.containerWidth * index) + 'px"><img width="' + options.containerWidth + '" height="' + options.containerHeight + '" src="' + value + '"/></li>');
            opts.push('<a ' + (index == 0 ? 'class="cur"' : '') + (options.optAtagWidth == defaultOptions.optAtagWidth ? '' : 'style="width:' + (options.optAtagWidth)+ 'px,height:' + (options.optAtagWidth)+ 'px"') + 'href="#"></a>');
         });

         html.push('</ul>');
         opts.push('</div>');

         return html.concat(opts).join('');
      }

      function startSwitch(ele) {
         ele.interval = setInterval(function () {
            $.each(ele.find('li'), function (index, item) {
               var target = $(this),
                     left = parseInt(target.css('left'), 10) - options.containerWidth;

               if (left + options.containerWidth * (options.imgs.length - 1) <= 0) {
                  target.animate({left: left}, options.animateSpeed, function () {
                     $(this).css('left', options.containerWidth);
                  });
               } else {
                  target.animate({left: left}, options.animateSpeed);
               }

               left == 0 && ele.find('.opt a:eq(' + index + ')').addClass('cur').siblings().removeClass('cur');
            });
         }, options.interval);
      }

      function optionEvent (ele) {
         ele.find('.opt a').hover(function () {
            var target = $(this),
                  index = target.index(),
                  curIndex = ele.find('a.cur').index();

            if (!target.hasClass('cur')) {
               responseHover(target, ele, index, curIndex);
            }

            clearInterval(ele.interval);
         }, function () {
            startSwitch(ele);
         });
      }

      function responseHover (target, ele, index, curIndex) {
         $.each(ele.find('li'), function (i, item) {
				$(this).animate({left: options.containerWidth * (i - index)}, options.animateSpeed);
         });

			setTimeout(function () {
					ele.find('li:eq(' + ((index + 1) % options.imgs.length) + ')').css('left', options.containerWidth + 'px');
			}, options.animateSpeed * 2);

         target.addClass('cur').siblings().removeClass('cur');
      }

      return this.each(function() {
         var target = $(this);

         options.containerWidth && target.css('width', options.containerWidth);
         target.html(getHtml());
         optionEvent(target);
         startSwitch(target);
		});
	}
})(jQuery, window, document)
