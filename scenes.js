goog.provide('tsn.scenes');

goog.require('lime.Scene');
goog.require('lime.Sprite');

goog.require('tsn.ninja');
goog.require('tsn.text');
goog.require('tsn.enemy');
goog.require('tsn.exit');
goog.require('tsn.Level');

tsn.lvl1 = function() {
	var lvl = new tsn.Level();
    var scene = new lime.Scene();
	lvl.scene = scene;
	
    var ninja = new tsn.ninja(512,384),
    enemies = [new tsn.enemy(512, 175, 100, 100), new tsn.enemy(512, 675, 100, -100)],
    background = new lime.Sprite().setFill('assets/scene1.png')
        .setPosition(0, 0).setSize(1024, 768).setAnchorPoint(0, 0);
    exit = new tsn.exit(50, 384);
    
	lvl.enemies = enemies;
	lvl.ninja = ninja;
	lvl.exit = exit;
    scene.appendChild(background);
    enemies.forEach(function (data) {
        scene.appendChild(data);
        scene.appendChild(data.view);
    });
    scene.appendChild(exit);
    scene.appendChild(ninja);

    return lvl;
};

tsn.end = function() {
    var scene = new lime.Scene();

    var losing = new tsn.text(800, 70, 512, 384, 'You have died dishonorably', 0.4);
    scene.appendChild(losing);
    scene.appendChild(new lime.Sprite().setSize(75, 75).setPosition(512, 500).setFill('assets/dead.png'));
    return scene;
};

tsn.win = function() {
	return new lime.Scene().appendChild(new tsn.text(800, 70, 512, 384, 'You have defeated all!', 1));

};
