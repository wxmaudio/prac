//订阅
! function() {
    var topics = {};
    jQuery.Topic = function(id) {
        var callbacks,
            topic = id && topics[id];
        if (!topic) {
            callbacks = jQuery.Callbacks();
            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if (id) {
                topics[id] = topic;
            }
        }
        return topic;
    };
    $.Topic('recomend').subscribe(function() {
        //_rendermain(TOPDATA);
    });
}

var middleware = {
    beforeIndex: 0,
    afterIndex: null,
    controllers: [],
    before: function(key, module) {
        var controller = this.controllers[this.beforeIndex];
        if (!controller) {
            this.beforeIndex = 0;
            return;
        }
        this.beforeIndex++;
        if (isFunction(controller.before)) {
            controller.before(key, module, this);
        }
    },
    after: function(key, module) {
        if (this.afterIndex === null) {
            this.afterIndex = this.controllers.length - 1;
        }
        var controller = this.controllers[this.afterIndex];
        if (!controller) {
            this.afterIndex = this.controllers.length - 1;
            return;
        }
        this.afterIndex--;
        if (isFunction(controller.after)) {
            controller.after(key, module, this);
        }
    }
};