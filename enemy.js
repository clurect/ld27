goog.provide('tsn.enemy');

goog.require('lime.Sprite');
goog.require('lime.Polygon');

tsn.enemy = function (x, y, dx, dy) {
    goog.base(this);
    this.setSize(75, 75).setPosition(x, y);
    this.setFill('assets/enemy.png');
    this.view = new lime.Polygon().addPoints(x,y, x-dx,y+dy, x+dx,y+dy).setFill(247,247,43,0.4);

};

goog.inherits(tsn.enemy, lime.Sprite);