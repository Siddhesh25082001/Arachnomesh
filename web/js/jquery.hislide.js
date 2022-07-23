(function($) {
    
    var slide = function(ele,options) {
        var $ele = $(ele);
       
        var setting = {
            speed: 1000,
            interval: 5000,
            
        };
        
        $.extend(true, setting, options);
        // var width = $(window).width();
        // var smallDeviceWidth = 100;
        // if(width<1000)
        // smallDeviceWidth = 0
        var states = [
            { $zIndex: 1, width: 100, height: 300, top: 69, left: 134, $opacity: 0.2 },
            { $zIndex: 2, width:300, height: 400, top: 59, left: 0, $opacity: 0.4 },
            { $zIndex: 3, width: 414, height: 800, top: 0, left: 263, $opacity: 1 },
            { $zIndex: 2, width: 300, height: 400, top: 59, left: 620, $opacity: 0.4 },
            { $zIndex: 1, width: 100, height: 350, top: 69, left: 500, $opacity: 0.2 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

  
        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }


        function next() {
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        return this;
    }
})(jQuery);
