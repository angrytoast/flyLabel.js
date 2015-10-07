# jQuery floatLabel

## Origin
This is a fork of flyLabel.js - [DEMO](http://space150.github.com/flyLabel.js)

A lot of the original code is reused. The main change is around the flexibliity of the plugin. The original plugin relied on have a specific `.fly-group` for the wrapper. This version is a refactor to allow calling it on any wrapper selector.

## Use it

``` html
<script src="/demo/vendor/jquery.min.js"></script>
<script src="/dist/flyLabel.min.js"></script>
<script>
  if (Modernizr.placeholder) {
    $('.field__wrapper').floatLabel();
  }
</script>
```
