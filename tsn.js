goog.provide('tsn');

goog.require('lime.Director');

goog.require('tsn.scenes');
goog.require('tsn.text');
goog.require('lime.transitions.Dissolve');

var scene;
var director,
time,
timer;

tsn.start = function() {
    director = new lime.Director(document.body,1024,768);
    init(new tsn.s1());
    director.makeMobileWebAppCapable();
    
    var init = function (s) {   
        console.log("hallo");
        scene = s;
        var moves_in = false;
        timer = new tsn.text(40, 40, 900, 80, '10', 0);
        scene.appendChild(timer);
        director.replaceScene(scene);       
        
        
        time = 10.0;
        lime.scheduleManager.scheduleWithDelay(runTimer, parent.bottomBlock, 100);
        
        lime.scheduleManager.callAfter(function() {
            
            if (!moves_in) {
                gameover();
            }   
        }, parent.bottomBlock, 10000);
    };

    



    var gameover = function () {
        // without this line the timer would keep running after the game is lost
        lime.scheduleManager.unschedule(runTimer,parent.bottomBlock);        
        director.replaceScene(new tsn.end(), lime.transitions.Dissolve, 3);
        
    };

    var runTimer = function () {
        time -= 0.1;
        scene.removeChild(timer);
        timer = new tsn.text(40, 40, 900, 40, time.toFixed(1), 0);
        scene.appendChild(timer); 
    };
}; //end of tsn.start

goog.exportSymbol('tsn.start', tsn.start);