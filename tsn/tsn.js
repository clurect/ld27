//set main namespace
goog.provide('tsn');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.Polygon');
goog.require('lime.RoundedRect');

goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.Sequence');
goog.require('lime.transitions.Dissolve');

goog.require('goog.math');

// entrypoint
tsn.start = function(){

    var moves_in = false,
	    director = new lime.Director(document.body,1024,768),
	    scene = new lime.Scene(),
        background = new lime.Sprite().setFill('assets/scene1.png').setPosition(0, 0).setSize(1024, 768).setAnchorPoint(0, 0),
	    character = new lime.Circle().setSize(150, 150).setFill('assets/ninja.png').setSize(75, 75).setPosition(512, 384),
        //title = text(800, 70, 512, 80, '10 second ninja'),
        exit = new lime.Sprite().setSize(100, 150).setPosition(50, 384).setFill('assets/door.png'),
        endGame = new lime.Scene().appendChild( text(800, 70, 512, 384, 'You have died dishonorably')),
        timer = text(80,80, 900, 80, '10', 1),
        deadsies = new lime.Sprite().setSize(75, 75).setPosition(512, 500).setFill('assets/dead.png'),
        enimee = make_enimee(512,175,100,100);
    endGame.appendChild(deadsies);
    //add character and title to the scene
    scene.appendChild(background);
    scene.appendChild(character);
    //scene.appendChild(title);
    scene.appendChild(exit);
    scene.appendChild(enimee.body);
    scene.appendChild(enimee.view);
    scene.appendChild(timer);
	director.makeMobileWebAppCapable();
    runTimer = function () {
        time -= 0.1;
        scene.removeChild(timer);
        timer = text(80, 80, 900, 80, time.toFixed(1),1);
        scene.appendChild(timer); 
    };
    var seqs = [];
    goog.events.listen(scene, ['mousedown','touchstart'],function(e){
        seqs.push(new lime.animation.MoveTo(e.position.x,e.position.y)); 
    });
    gameover = function() {
            console.log("HAlp");
            lime.scheduleManager.unschedule(runTimer,parent.bottomBlock);
            director.replaceScene(endGame, lime.transitions.Dissolve, 3);
    };
    var time = 10.0;
    lime.scheduleManager.scheduleWithDelay(runTimer, parent.bottomBlock, 100);
   
    var loopy = 
    function(dt) {
       
        if (enimee)  {
            if (goog.math.Box.intersects(character.getBoundingBox(),enimee.body.getBoundingBox())) {
                console.log('hit!');
                scene.removeChild(enimee.body);
                scene.removeChild(enimee.view);
                enimee=undefined;
                
            }
            else if (goog.math.Box.intersects(character.getBoundingBox(),enimee.view.getBoundingBox())) {
                gameover();
                lime.scheduleManager.unschedule(loopy,parent.bottomBlock);
            }
        }
    };
    
    lime.scheduleManager.schedule(loopy,parent.bottomBlock);
    goog.events.listen(exit, ['mouseup', 'touchend'], function(e) {
        // the final click has been made, move the character now
        moves_in = true;
        lime.scheduleManager.unschedule(runTimer,parent.bottomBlock);
        
        if (seqs.length > 1) {
            character.runAction(new lime.animation.Sequence(seqs));
        }
        else if (seqs.length === 1) {
            character.runAction(seqs[0]);
        }
        seqs=[];
    });
    lime.scheduleManager.callAfter(function() {
        
        if (!moves_in) {
            gameover();
        }   
    }, parent.bottomBlock, 10000);
    
	// set current scene active
	director.replaceScene(scene);

};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('tsn.start', tsn.start);
