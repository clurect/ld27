function text (sx,sy,x,y,text) {
    return new lime.Layer().setPosition(x,y)
    .appendChild(new lime.RoundedRect().setSize(sx,sy).setFill(100,100,100,.2).setRadius(10))
    .appendChild(new lime.Label().setSize(sx,sy).setFontSize(60).setText(text));
}