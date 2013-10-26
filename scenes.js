goog.provide('tsn.scenes');

goog.require('lime.Scene');
goog.require('tsn.ninja');
goog.require('tsn.text');

tsn.s1 = function() {
    var scene = new lime.Scene();

    var player = new tsn.ninja(512,384);
    scene.appendChild(player);

    return scene;
};

tsn.end = function() {
    var scene = new lime.Scene();

    var text = new tsn.text(800, 70, 512, 384, 'You have died dishonorably', 0.4);
    scene.appendChild(text);
    scene.appendChild(new lime.Sprite().setSize(75, 75).setPosition(512, 500).setFill('assets/dead.png'));
    return scene;
};