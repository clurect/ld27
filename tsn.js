goog.provide('tsn');

goog.require('lime.Director');

goog.require('tsn.scenes');
goog.require('tsn.text');
goog.require('lime.transitions.Dissolve');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.MoveTo');
goog.require('lime.GlossyButton');

var scene,
	level,
	director,
	time,
	timer,
	moves_in;

tsn.start = function() {
    director = new lime.Director(document.body,1024,768);
    init(new tsn.lvl1());
    director.makeMobileWebAppCapable();
    
    var init = function (s) {   
		var seqs = [];
		console.log(s.name);
		level = s;
        scene = s.scene;
        moves_in = false;
        timer = new tsn.text(40, 40, 900, 80, '10', 0);
        scene.appendChild(timer);
        director.replaceScene(scene);       
        
        
        time = 10.0;
        lime.scheduleManager.scheduleWithDelay(runTimer, parent.bottomBlock, 100);
		lime.scheduleManager.schedule(loopy,parent.bottomBlock);
		
		goog.events.listen(scene, ['mousedown', 'touchstart'], function(e) {
			seqs.push(new lime.animation.MoveTo(e.position.x, e.position.y)); 
		});
		goog.events.listen(level.exit, ['mouseup', 'touchend'], function(e) {
			// the final click has been made, move the character now
			moves_in = true;
			// allows player to see how quickly they won
			lime.scheduleManager.unschedule(runTimer,parent.bottomBlock);
			
			// one move action cannot be a sequence
			if (seqs.length > 1) {
				level.ninja.runAction(new lime.animation.Sequence(seqs));
			}
			else if (seqs.length === 1) {
				level.ninja.runAction(seqs[0]);
			}
			// the sequence will use the old move actions if not removed
			// this will most likely cause problems when extra levels are added
			seqs=[];
		});
    };
    var gameover = function () {
        // without this line the timer would keep running after the game is lost
        lime.scheduleManager.unschedule(runTimer,parent.bottomBlock); 
		lime.scheduleManager.unschedule(loopy,parent.bottomBlock);
		level = new tsn.end();
        director.replaceScene(level.scene, lime.transitions.Dissolve, 3);
		goog.events.listen(level.button, 'click', function(e) {
			console.log('been clicked');
			init(new tsn.lvl1()); 
		});
        
    };

    var runTimer = function () {
		time -= 0.1;
		if (time <=0.0 && !moves_in) {
			gameover();
			time=0.0;
		} 
        scene.removeChild(timer);
        timer = new tsn.text(40, 40, 900, 40, time.toFixed(1), 0);
        scene.appendChild(timer); 
    };

	
	var loopy = 
    function(dt) {
        if (level.enemies.length === 0) { 
            win();
        }
        var i;
        //checking collisions
        for (i = level.enemies.length - 1; i >= 0; i -= 1) {
            if (goog.math.Box.intersects(level.ninja.getBoundingBox(),level.enemies[i].getBoundingBox())) {
                scene.removeChild(level.enemies[i].view);
				scene.removeChild(level.enemies[i]);                
                level.enemies.splice(i,1);              
            }
            else if (goog.math.Box.intersects(level.ninja.getBoundingBox(),level.enemies[i].view.getBoundingBox())) {
                gameover();
                lime.scheduleManager.unschedule(loopy,parent.bottomBlock);
            }
        }
    };
    win = function () {
        lime.scheduleManager.unschedule(loopy, parent.bottomBlock);
        
		if (level.next.name === 'win') 
			director.replaceScene(level.next.scene, lime.transitions.Dissolve, 5);
		else 
			init(level.next);
    };
    
    
    
}; //end of tsn.start

goog.exportSymbol('tsn.start', tsn.start);