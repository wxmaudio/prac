(function ($) {

$.fn.maxlength = function (settings) {

    if (typeof settings == 'string') {
        settings = { feedback : settings };
    }

    settings = $.extend({}, $.fn.maxlength.defaults, settings);

    function length(el) {
    var parts = el.value;
    if ( settings.words )
       parts = el.value.length ? parts.split(/\s+/) : { length : 0 };
    return parts.length;
    }
   
    return this.each(function () {
        var field = this,
        $field = $(field),
        $form = $(field.form),
        limit = settings.useInput ? $form.find('input[name=maxlength]').val() : $field.attr('maxlength'),
        $charsLeft = $form.find(settings.feedback);

    function limitCheck(event) {
        var len = length(this),
             exceeded = len >= limit,
           code = event.keyCode;
        //未超出字数限制      
        if ( !exceeded )
           return;
        
        //已超出字数限制
        switch (code) {
            case 8: // allow Backspace
            case 9: // allow \t制表符
            case 17: //control
            case 36: // and cursor keys
            case 35: // End
            case 37: // Left
            case 38: // Up
            case 39: // Right
            case 40: // Down
            case 46: // Delete
            case 65: // A
                return;

            default:
                // 32 space 13 回车
                return settings.words && code != 32 && code != 13 && len == limit;
        }
    }


        var updateCount = function () {
            var len = length(field),
            diff = limit - len;

            $charsLeft.html( diff || "0" );

            // truncation code
            if (settings.hardLimit && diff < 0) {
            field.value = settings.words ?
                 // split by white space, capturing it in the result, then glue them back
               field.value.split(/(\s+)/, (limit*2)-1).join('') :
               field.value.substr(0, limit);

                updateCount();
            }
        };

        $field.keyup(updateCount).change(updateCount);
        if (settings.hardLimit) {
            $field.keydown(limitCheck);
        }

        updateCount();
    });
};

$.fn.maxlength.defaults = {
    useInput : false,
    hardLimit : true,
    feedback : '.charsLeft',
    words : false
};

})(jQuery);


