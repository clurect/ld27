goog.provide('tsn.exit');

goog.require('lime.Sprite');

tsn.exit = function (x,y) {
    goog.base(this);
    this.setSize(100, 150)
        .setPosition(x, y)
        .setFill('assets/door.png');
};

goog.inherits(tsn.exit, lime.Sprite);