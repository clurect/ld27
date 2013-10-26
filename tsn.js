goog.provide('tsn');

goog.require('lime.Director');

goog.require('tsn.scenes')
tsn.start = function() {

    var director = new lime.Director(document.body,1024,768);
    
    var scene = new tsn.end();
    
    director.makeMobileWebAppCapable();
    
    director.replaceScene(scene);


};

goog.exportSymbol('tsn.start', tsn.start);