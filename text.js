goog.provide('tsn.text');

goog.require('lime.Layer');
goog.require('lime.RoundedRect');
goog.require('lime.Label');

tsn.text = function (sx,sy,x,y,t,op) {
    return new lime.Layer().setPosition(x,y)
    .appendChild(new lime.RoundedRect().setSize(sx,sy).setFill(100,100,100,op).setRadius(10))
    .appendChild(new lime.Label().setSize(sx,sy).setFontSize(60).setText(t));
};