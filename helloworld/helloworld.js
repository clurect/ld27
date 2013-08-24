//set main namespace
goog.provide('helloworld');


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
helloworld.start = function(){

    var moves_in = false;
	var director = new lime.Director(document.body,1024,768),
	    scene = new lime.Scene(),

	    character = new lime.Circle().setSize(150,150).setFill('assets/shuriken.png').setSize(75,75).setPosition(512,384),
        //title = text(800, 70, 512, 80, '10 second ninja'),
        exit = new lime.Sprite().setSize(40,300).setPosition(0,384).setFill('#0c0'),
        endGame = new lime.Scene().appendChild( text(800, 70, 512, 384, 'You have died dishonorably')),
        timer = text(80,80, 900, 80, '10');
        //eni = new lime.Sprite().setSize(75,75).setPosition(512,175).setFill('#d00');
        //var triangle = new lime.Polygon().addPoints(512,200, 450,300, 550,300).setFill('#c0c');

        var enimee = {
            body : new lime.Sprite().setSize(75,75).setPosition(512,175).setFill('#d00'),
            view : new lime.Polygon().addPoints(512,200, 450,300, 550,300).setFill('#c0c'),
            
        };
    
    //add character and title to the scene
    scene.appendChild(character);
    //scene.appendChild(title);
    scene.appendChild(exit);
    scene.appendChild(enimee.body);
    scene.appendChild(enimee.view);
    scene.appendChild(timer);
	director.makeMobileWebAppCapable();
    runTimer = function () {
        time-=.1;
        scene.removeChild(timer);
        timer = text(80,80, 900, 80, time.toFixed(1));
        scene.appendChild(timer); 
    }
    var seqs = [];
    goog.events.listen(scene, ['mousedown','touchstart'],function(e){
        seqs.push(new lime.animation.MoveTo(e.position.x,e.position.y)); 
    });
    var time = 10.0;
    lime.scheduleManager.scheduleWithDelay(runTimer, parent.bottomBlock, 100);
    gameover = function() {
        director.replaceScene(endGame, lime.transitions.Dissolve, 3);
    }
    
    
    lime.scheduleManager.schedule(function(dt) {
       
        
        if (enimee)  {
            if (goog.math.Box.intersects(this.getBoundingBox(),enimee.body.getBoundingBox())) {
                console.log('hit!');
                scene.removeChild(enimee.body);
                scene.removeChild(enimee.view)
                enimee=undefined;
                
            }
            else if (goog.math.Box.intersects(this.getBoundingBox(),enimee.view.getBoundingBox())) {
                gameover();
            }
        }
    },character);
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
        lime.scheduleManager.unschedule(runTimer,parent.bottomBlock);
        if (!moves_in) {
            gameover();
        }   
    }, this, 10000)
	// set current scene active
	director.replaceScene(scene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('helloworld.start', helloworld.start);
