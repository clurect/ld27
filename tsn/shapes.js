function text (sx,sy,x,y,text,op) {
    return new lime.Layer().setPosition(x,y)
    .appendChild(new lime.RoundedRect().setSize(sx,sy).setFill(100,100,100,op).setRadius(10))
    .appendChild(new lime.Label().setSize(sx,sy).setFontSize(60).setText(text));
}
function make_enimee (x,y, dx, dy) {
    return {
        body : new lime.Sprite().setSize(75,75).setPosition(x,y).setFill('assets/enimee.png'),
        view : new lime.Polygon().addPoints(x,y, x-dx,y+dy, x+dx,y+dy).setFill(247,247,43,0.4),
    };
}