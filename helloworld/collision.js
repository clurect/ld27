function collide(a, b) {
    var aleft = a.getPosition().x
    , bleft = b.getPosition().x,
    aright = a.getPosition().x + a.getSize().width, 
    bright = b.getPosition().x + b.getSize().width,
    atop = a.getPosition().y, 
    btop = b.getPosition().y,
    abottom = atop + a.getSize().height, 
    bbottom = btop + b.getSize().height;
    
    if (abottom < btop) return 1;
    if (atop > bbottom) return 1;
    
    if (aright < bleft) return 1;
    if (aleft > bright) return 1;

    return 0;
}