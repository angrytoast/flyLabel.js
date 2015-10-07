"use strict";

/**
 * jQuery Float Labels
 *
 * A simple plugin to enable the floating label pattern. It makes no attempt to
 * control any interactions of the label within js. It just binds to events as
 * needed and triggers configurable CSS classes.
 *
 * The jQuery method is called on the wrapper element that contains both the field
 * and the label. It might look like:
 *
 * <div class="field__wrapper">
 *   <label class="field__label" for="this-field">My Super Label</label>
 *   <input name="this-field">
 * </div>
 *
 * The javascript init, with options thrown in:
 * $('.field__wrapper').floatLabel({
 *   activeClass: 'activated',
 *   focusClass: 'zenified'
 * });
 */
(function ($) {
  $(document).ready(function () {

    // Set plugin method name and defaults
    var pluginName = 'floatLabel',
        defaults = {
          activeClass: 'is-active',
          focusClass: 'has-focus'
        };

    // plugin constructor
    function Plugin (element, options) {
      var $element = $(element);
      this.element = element;

      // Set up internals for tracking, just in case.
      this._defaults = defaults;
      this._name = pluginName;

      // Set up a couple of internals to keep track of input and label.
      this._input = _findInput($element);
      this._label = _findLabel($element);

      // Use the init options, and extend them over the defaults.
      this.options = $.extend(true, defaults, options);

      // Do it now.
      this.init();
    }

    //
    Plugin.prototype._onKeyUp = function (ev) {
      // On empty value, inactivate the label.
      if (this._input.val() === '') {
        this._label.removeClass(this.options.activeClass);
      }
      else {
        this._label.addClass(this.options.activeClass);
      }
      ev && ev.preventDefault();
    };

    Plugin.prototype._onFocus = function (ev) {
      this._label.addClass(this.options.focusClass);
      this._onKeyUp();
      ev && ev.preventDefault();
    };

    Plugin.prototype._onBlur = function (ev) {
      this._label.removeClass(this.options.focusClass);
      this._onKeyUp();
      ev && ev.preventDefault();
    };

    Plugin.prototype.init = function () {
      this._input.on('keyup change', $.proxy(this._onKeyUp, this));
      this._input.on('blur', $.proxy(this._onBlur, this));
      this._input.on('focus', $.proxy(this._onFocus, this));
    };

    // Lightweight constructor, preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName,
          new Plugin(this, options));
        }
      });
    };

    // Utility: find a input that we want to alter the label for.
    function _findInput(el) {
      if ($(el).find('input, textarea').length) {
        return $(el).find('input, textarea');
      }
      else {
        return $(el).find('select');
      }
      return false;
    }

    // Utility: find a input that we want to alter the label for.
    function _findLabel(el) {
      return $(el).find('label');
    }

  });
})(jQuery);
