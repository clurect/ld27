goog.provide('tsn.ninja');

goog.require('lime.Circle');

tsn.ninja = function(x, y) {
    goog.base(this);
    this.setFill('assets/ninja.png')
        .setSize(75, 75)
        .setPosition(x, y);    
    
};

goog.inherits(tsn.ninja, lime.Circle);