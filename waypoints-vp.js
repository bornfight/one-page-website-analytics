;(function($){

    var DEBUG = false;

    var lastVirtual = false,
        current     = 0;

    var WaypointVirtualPage = function(element, options){

        var elem = $(element),
            obj = this,
            selector = '#'+elem.attr('id'),
            defaults = {
                url:            '/'+elem.attr('id'),
                pageTitle:      elem.attr('id'),
                triggerDelay:   2000,
                downPercentage: 0.6,
                upPercentage:   0.6,
                up: true,
                down: true
            };

        var settings = $.extend(defaults, options || {});

        this.triggerVirtualPage = function(elem,settings) {

            if(DEBUG){
                console.log(' -> call a virtual page '+settings.pageTitle+' ('+settings.url+') after '+settings.triggerDelay+' ms');
            }

            //  Google Tag manager virtual page
            dataLayer.push({
                'event': '_d_GAVirtualPageview',
                'virtualPageview': settings.url,
                'virtualPageviewTitle': settings.pageTitle
            });
        };

        this.init = function(element, options){
            
            // direction: down
            element.waypoint(function(direction) {
                if (settings.down && direction == 'down') {

                    if(DEBUG){
                        console.log('trigger: '+selector+' (down)');
                    }

                    var startTime   = new Date(),
                        scrollStart = startTime.getTime();
                    current = scrollStart;
                    
                    setTimeout(function(){
                        // if new waypoint already triggered, do not continue
                        if (current == scrollStart && lastVirtual != selector) {
                            lastVirtual = selector;
                            obj.triggerVirtualPage(selector, settings);                                         
                        }
                    }, settings.triggerDelay);
                }
            }, {
                offset: function() {
                    ret =  (1 - settings.downPercentage) * parseInt($.waypoints('viewportHeight'));
                    return ret;
                }
            });
            
            // direction: up
            element.waypoint(function(direction) {
                if (settings.up && direction == 'up') {
                    
                    if(DEBUG){
                        console.log('triggered: '+selector+' (up)');
                    }

                    var startTime   = new Date(),
                        scrollStart = startTime.getTime();
                    current = scrollStart;
                    
                    setTimeout(function() {
                        // if new waypoint triggered, do not continue
                        if (current == scrollStart && lastVirtual != selector) {
                            lastVirtual = selector;
                            obj.triggerVirtualPage(selector, settings);
                        }
                    }, settings.triggerDelay);
                }
            }, {
                offset: function() {
                    var addition = settings.upPercentage * parseInt($.waypoints('viewportHeight'));
                    var ret = - elem.height() + addition;
                    return ret;
                }
            });

        };

    };

    $.fn.waypointVirtualPage = function(options){
        return this.each(function(){
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('waypointVirtualPage')) return;

            var waypointVirtualPage = new WaypointVirtualPage(this, options);
            waypointVirtualPage.init(element, options);

            // Store plugin object in this element's data
            element.data('waypointVirtualPage', waypointVirtualPage);
        });
    };
})(jQuery);