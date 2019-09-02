enchant();
var remote = io.connect('http://localhost:4740');
function readCookie(key) {
	var dim = document.cookie.split(';'), dimvalue;
	for (var i = 0; i < dim.length; i++) {
		dimvalue = dim[i].split('=');
		if (dimvalue[0].trim() == key) {
			return dimvalue[1].trim();
		}
	}
}
window.onload = function () {
    console.log('Initialized');
    console.log('hello ' + enchant.ENV.BROWSER);
    console.log('enchantjsのバージョン：' + enchant.ENV.VERSION);
    var coreW = 1536, coreH = 864;
    var core = new Core(coreW, coreH);
    core.fps = 24;
    core.preload("marubatu.png", "eigo.png", "abc.png", "erobo.png", "button.png", "down.png", "sea.png", "seaisland.png", "searobo.png", "seastage.png", "boat.png", "boat2.png", "fukidashi1.png", "fukidashi2.png", "gamestart.png", "gamestart2.png", "mode.png", "selectmode.png", "game.png", "gameclear.png", "start.png", "startbubble.png", "startfish.png", "startyacht.png", "lets.png", "letseigo.png", "letspuzzle.png", "icon.png", "setbutton.png", "exp1.png", "exp2.png", "exp3.png", "exp4.png", "expapple.png", "applet.png", "item.png", "res1.png", "complete.png");
    var soundLoad = function (audioname, type) {
        return enchant.DOMSound.load(audioname + "." + type, "audio/" + type, function(){}, function(){});
    },
    voice = [
        soundLoad("cat", "mp3"), soundLoad("dog", "mp3"), soundLoad("fish", "mp3"), soundLoad("star", "mp3"),
        soundLoad("bear", "mp3"), soundLoad("bird", "mp3"), soundLoad("frog", "mp3"), soundLoad("pig", "mp3"),
        soundLoad("ant", "mp3"), soundLoad("lion", "mp3"), soundLoad("ship", "mp3"), soundLoad("fox", "mp3"),
        soundLoad("bus", "mp3"), soundLoad("car", "mp3"), soundLoad("cake", "mp3"), soundLoad("desk", "mp3"),
        soundLoad("orange", "mp3"), soundLoad("peach", "mp3"), soundLoad("bread", "mp3"), soundLoad("horse", "mp3"),
        soundLoad("pencil", "mp3"), soundLoad("flower", "mp3"), soundLoad("train", "mp3"), soundLoad("castle", "mp3"),
        soundLoad("apple", "mp3"), soundLoad("carrot", "mp3"), soundLoad("rabbit", "mp3"), soundLoad("book", "mp3"),
        soundLoad("corn", "mp3"), soundLoad("tomato", "mp3"), soundLoad("melon", "mp3"), soundLoad("egg", "mp3"),
        soundLoad("island", "mp3"), soundLoad("sea", "mp3"), soundLoad("sun", "mp3"), soundLoad("lemon", "mp3"),
        soundLoad("milk", "mp3"), soundLoad("meat", "mp3"), soundLoad("sheep", "mp3"), soundLoad("house", "mp3"),
        soundLoad("shoes", "mp3"), soundLoad("violin", "mp3"), soundLoad("cow", "mp3"), soundLoad("banana", "mp3"),
        soundLoad("potato", "mp3"), soundLoad("onion", "mp3"),
    ];
    var startv = soundLoad("kurukuru", "mp3");
    var gamev = soundLoad("kobitonokitchen", "mp3");
    var clearv = soundLoad("tanosimi", "mp3");
    core.onload = function () {
        var fp = ["12", "10", "13", "09", "14"];
        var cubeLength = 5, qNumber = 3;
        var stagenumber = 0;
        var mode = 0;
        var japaneseWord = ["ねこ", "いぬ", "さかな", "ほし", "くま", "とり", "かえる", "ぶた", "あり", "らいおん", "ふね", "きつね", "バス", "くるま", "ケーキ", "つくえ", "オレンジ", "もも", "パン", "うま", "えんぴつ", "はな", "でんしゃ", "おしろ", "りんご", "にんじん", "うさぎ", "ほん", "とうもろこし", "トマト", "メロン", "たまご", "しま", "うみ", "たいよう", "レモン", "ぎゅうにゅう", "にく", "ひつじ", "いえ", "くつ", "バイオリン", "うし", "ばなな", "じゃがいも", "たまねぎ"];
        var englishWord = ["CAT", "DOG", "FISH", "STAR", "BEAR", "BIRD", "FROG", "PIG", "ANT", "LION", "SHIP", "FOX", "BUS", "CAR", "CAKE", "DESK", "ORANGE", "PEACH", "BREAD", "HORSE", "PENCIL", "FLOWER", "TRAIN", "CASTLE", "APPLE", "CARROT", "RABBIT", "BOOK", "CORN", "TOMATO", "MELON", "EGG", "ISLAND", "SEA", "SUN","LEMON", "MILK", "MEAT", "SHEEP", "HOUSE", "SHOES", "VIOLIN", "COW", "BANANA", "POTATO", "ONION"];
        var stageWord = [
            // ["DOG", "CORN", "CARROT"],
            ["CAT", "DOG", "FISH", "BEAR", "BIRD", "FROG", "PIG",
            "ANT","LION", "FOX", "HORSE", "RABBIT", "SHEEP", "COW"],
            ["CAKE", "ORANGE", "PEACH", "BREAD", "APPLE", "CARROT",
            "CORN", "TOMATO", "MELON", "EGG", "LEMON", "MILK", "MEAT", "BANANA", "ONION", "POTATO"],
            ["STAR", "SHIP", "BUS", "CAR", "DESK", "PENCIL", "FLOWER",
            "TRAIN", "CASTLE", "BOOK", "ISLAND", "SEA", "SUN", "HOUSE",
            "SHOES", "VIOLIN"],
        ];
        // var japaneseWord = ["オレンジ", "えんぴつ", "はな", "おしろ", "にんじん", "うさぎ"];
        // var englishWord = ["ORANGE", "PENCIL", "FLOWER", "CASTLE", "CARROT", "RABBIT"];
        // var japaneseWord = ["らいおん"];
        // var englishWord = ["LION"];
        var word = [rands(stageWord[0]), rands(stageWord[1]), rands(stageWord[2]),
        rands(stageWord[0]), rands(stageWord[1]), rands(stageWord[2])];
        if (readCookie("WORD0") !== undefined) {
            word[0] = JSON.parse(readCookie("WORD0"));
        }
        if (readCookie("WORD1") !== undefined) {
            word[1] = JSON.parse(readCookie("WORD1"));
        }
        if (readCookie("WORD2") !== undefined) {
            word[2] = JSON.parse(readCookie("WORD2"));
        }
        if (readCookie("WORD3") !== undefined) {
            word[3] = JSON.parse(readCookie("WORD3"));
        }
        if (readCookie("WORD4") !== undefined) {
            word[4] = JSON.parse(readCookie("WORD4"));
        }
        if (readCookie("WORD5") !== undefined) {
            word[5] = JSON.parse(readCookie("WORD5"));
        }
        word[0] = word[0].slice(0, 9);
        word[1] = word[1].slice(0, 9);
        word[2] = word[2].slice(0, 9);
        word[3] = word[3].slice(0, 9);
        word[4] = word[4].slice(0, 9);
        word[5] = word[5].slice(0, 9);
        console.log(word[0]);
        var worditem = [[], [], [], [], [], []];
        if (readCookie("ITEM0") !== undefined) {
            worditem[0] = JSON.parse(readCookie("ITEM0"));
        }
        if (readCookie("ITEM1") !== undefined) {
            worditem[1] = JSON.parse(readCookie("ITEM1"));
        }
        if (readCookie("ITEM2") !== undefined) {
            worditem[2] = JSON.parse(readCookie("ITEM2"));
        }
        if (readCookie("ITEM3") !== undefined) {
            worditem[3] = JSON.parse(readCookie("ITEM3"));
        }
        if (readCookie("ITEM4") !== undefined) {
            worditem[4] = JSON.parse(readCookie("ITEM4"));
        }
        if (readCookie("ITEM5") !== undefined) {
            worditem[5] = JSON.parse(readCookie("ITEM5"));
        }
        var startScene = new DOMScene();
        var expScene = new DOMScene();
        var expScene2 = new DOMScene();
        var selectStage = new DOMScene();
        var gameScene = new DOMScene();
        var clearScene = new DOMScene();
        var iniscene = new DOMScene();
        var iniscene2 = new DOMScene();
        var resScene = new DOMScene();
        function init() {
            var logo = new Sprite(coreW, coreH)
            logo.x = 0;
            logo.y = 0;
            logo.image = core.assets["icon.png"];
            logo.opacity = 0;
            iniscene.addChild(logo);
            var iButton = new Sprite(coreW, coreH);
            iButton.x = 0;
            iButton.y = 0;
            iButton.image = core.assets["setbutton.png"];
            iniscene2.addChild(iButton);
            var gamestart2 = new Sprite(140, 140);
            gamestart2.x = 1096;
            gamestart2.y = 630;
            gamestart2.image = core.assets["gamestart2.png"];
            gamestart2.tl.scaleTo(2, 2, 20).scaleTo(1, 1, 1).loop();
            iniscene2.addChild(gamestart2);
            logo.tl.fadeIn(24).delay(48).fadeOut(24).delay(12).then(function() {
                core.replaceScene(iniscene2);
            });
            var isButton = false;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "f":
                        if (!isButton) {
                            isButton = true;
                            startState();
                        }
                    break;
                }
            });
            iniscene2.backgroundColor = "lightyellow";
            core.replaceScene(iniscene);
        }
        function startState() {
            var sea = new Sprite(coreW * 3, coreH);
            sea.x = 0;
            sea.y = 0;
            sea.image = core.assets["start.png"];
            startScene.addChild(sea);
            var fish = new Sprite(500, 100);
            fish.x = coreW;
            fish.y = rand(coreH);
            fish.image = core.assets["startfish.png"];
            fish.opacity = 0;
            startScene.addChild(fish);
            //タイトル
            var lets = new Sprite(1536, 864);
            lets.x = 0;
            lets.y = 0;
            lets.image = core.assets["lets.png"];
            startScene.addChild(lets);
            var eigo = new Sprite(1536, 864);
            eigo.x = 0;
            eigo.y = 0;
            eigo.image = core.assets["letseigo.png"];
            startScene.addChild(eigo);
            var puzzle = new Sprite(1536, 864);
            puzzle.x = 0;
            puzzle.y = 0;
            puzzle.image = core.assets["letspuzzle.png"];
            startScene.addChild(puzzle);
            //スタートボタン
            var startButton = new Sprite(200, 200);
            startButton.scaleX = 0.5;
            startButton.scaleY = 0.5;
            startButton.x = 0;
            startButton.y = 600;
            startButton.image = core.assets["button.png"];
            startButton.frame = 2;
            var startText = new Label();
            startText.width = 1000;
            startText.x = -200;
            startText.y = startButton.y + 60;
            startText.font = "70px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            startText.color = "blue";
            startText.text = "スタート";
            startText.textAlign = "center";
            //スタート画面で出てくるロボット
            var startRobot = new Sprite(450, 450);
            startRobot.x = -500;
            startRobot.y = 300;
            startRobot.image = core.assets["startyacht.png"];
            startScene.addChild(startRobot);
            var bubblefish = 0;
            eigo.x = -1000;
            eigo.y = 180;
            eigo.rotation = 30;
            puzzle.x = 1100;
            puzzle.y = -250;
            puzzle.rotation = 30;
            lets.opacity = 0;
            lets.tl.fadeIn(12);
            eigo.tl.delay(24).moveX(0, 36).and().moveY(0, 36, enchant.Easing.CUBIC_EASEIN).and().rotateTo(0, 36);
            puzzle.tl.delay(72).moveX(0, 36).and().moveY(0, 36, enchant.Easing.CUBIC_EASEIN).and().rotateTo(0, 36);
            startRobot.tl.delay(12)
            .moveX(1100, 48).and().moveY(-500, 48, enchant.Easing.CUBIC_EASEIN).and().rotateTo(-30, 48)
            .rotateTo(0, 1).moveTo(1536, 100, 1)
            .moveX(100, 48).and().moveY(900, 48, enchant.Easing.CUBIC_EASEIN).and().rotateTo(-30, 48)
            .scaleTo(0.9, 0.9, 1).rotateTo(-15, 1).moveTo(850, -500, 1).moveY(-30, 24, enchant.Easing.BOUNCE_EASEOUT).then(function() {
                startScene.addChild(startButton);
                startScene.addChild(startText);
                bubblefish = 1;
                fish.opacity = 1;
                fish.tl.moveX(-500, 200).then(function() {
                    fish.tl.moveTo(coreW, rand(coreH) - 100, 1);
                }).loop();
            });
            var b = 0;
            startScene.on("enterframe", function() {
                if (bubblefish) {
                    b++;
                    if(b == 10) {
                        b = 0;
                        var bubble = new Sprite(50, 50);
                        bubble.x = rand(coreW);
                        bubble.y = rand(coreH);
                        bubble.scaleX = rand(40) / 20;
                        bubble.scaleY = bubble.scaleX;
                        bubble.image = core.assets["startbubble.png"];
                        this.addChild(bubble);
                        bubble.tl.moveY(0, 72).then(function() {
                            startScene.removeChild(bubble);
                        });
                    }
                    
                }
            });
            //ゲームスタート
            var isButton = false;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "f":
                        if (!isButton) {
                            isButton = true;
                            sea.y = -coreH;
                            startScene.y = coreH;
                            exps();
                        }
                    break;
                }
            });
            startv.volume = 0.8;
            startv.play();
            core.replaceScene(startScene);
        }
        function exps() {
            var displayedEnglish = [];
            var displayedEnglish2 = [];
            var apple = "31042";
            for (var index = 0; index < cubeLength; index++) {
                displayedEnglish[index] = new Sprite(140, 180);
                displayedEnglish[index].x = 358 + 170 * index;
                displayedEnglish[index].y = 250;
                displayedEnglish[index].image = core.assets["applet.png"];
                displayedEnglish[index].frame = apple.indexOf(index);
                expScene.addChild(displayedEnglish[index]);
            }
            var exp1 = new Sprite(1536, 864);
            exp1.x = 0;
            exp1.y = 0;
            exp1.image = core.assets["exp1.png"];
            expScene.addChild(exp1);
            var expapple = new Sprite(1536, 864);
            expapple.x = 0;
            expapple.y = 0;
            expapple.image = core.assets["expapple.png"];
            expScene.addChild(expapple);
            var exp2 = new Sprite(1536, 864);
            exp2.x = 0;
            exp2.y = 0;
            exp2.image = core.assets["exp2.png"];
            exp2.opacity = 0;
            expScene.addChild(exp2);
            var startButton = new Sprite(200, 200);
            startButton.scaleX = 0.8;
            startButton.scaleY = 0.8;
            startButton.x = 1300;
            startButton.y = 500;
            startButton.image = core.assets["button.png"];
            startButton.frame = 2;
            expScene.addChild(startButton);
            var startText = new Label();
            startText.width = 1000;
            startText.x = 900;
            startText.y = startButton.y + 200;
            startText.font = "70px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            startText.color = "blue";
            startText.text = "つぎへ";
            startText.textAlign = "center";
            expScene.addChild(startText);
            for (var index = 0; index < cubeLength; index++) {
                displayedEnglish2[index] = new Sprite(140, 180);
                displayedEnglish2[index].x = 358 + 170 * index;
                displayedEnglish2[index].y = 250;
                displayedEnglish2[index].image = core.assets["applet.png"];
                displayedEnglish2[index].frame = displayedEnglish[index].frame;
                expScene.addChild(displayedEnglish2[index]);
            }
            expapple.tl.delay(48).fadeOut(12).then(function() {
                expapple.tl.clear();
                for (var index2 = 0; index2 < cubeLength; index2++) {
                    displayedEnglish2[index2].tl.moveY(600, 24, enchant.Easing.BACK_EASEOUT)
                    .moveY(500, 20)
                    .moveX(358 + 170 * apple.indexOf(index2), 20)
                    .moveY(600, 20)
                    .then(function() {
                        exp2.tl.fadeIn(12);
                    });
                }
            });
            var isButton = false;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "e":
                        if (!isButton) {
                            isButton = true;
                            core.popScene(expScene);
                            exps2();
                        }
                    break;
                }
            });
            core.pushScene(expScene);
        }
        function exps2() {
            var displayedEnglish = [];
            var displayedEnglish2 = [];
            var apple = "31042";
            for (var index = 0; index < cubeLength; index++) {
                displayedEnglish[index] = new Sprite(140, 180);
                displayedEnglish[index].x = 358 + 170 * index;
                displayedEnglish[index].y = 250;
                displayedEnglish[index].image = core.assets["applet.png"];
                displayedEnglish[index].frame = apple.indexOf(index);
                expScene2.addChild(displayedEnglish[index]);
            }
            displayedEnglish[1].frame = 5;
            var exp1 = new Sprite(1536, 864);
            exp1.x = 0;
            exp1.y = 0;
            exp1.image = core.assets["exp1.png"];
            expScene2.addChild(exp1);
            var expapple = new Sprite(1536, 864);
            expapple.x = 0;
            expapple.y = 0;
            expapple.image = core.assets["exp3.png"];
            expScene2.addChild(expapple);
            var exp2 = new Sprite(1536, 864);
            exp2.x = 0;
            exp2.y = 0;
            exp2.image = core.assets["exp4.png"];
            exp2.opacity = 0;
            expScene2.addChild(exp2);
            var startButton = new Sprite(200, 200);
            startButton.scaleX = 0.8;
            startButton.scaleY = 0.8;
            startButton.x = 1300;
            startButton.y = 500;
            startButton.image = core.assets["button.png"];
            startButton.frame = 2;
            expScene2.addChild(startButton);
            var startText = new Label();
            startText.width = 1000;
            startText.x = 900;
            startText.y = startButton.y + 200;
            startText.font = "70px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            startText.color = "blue";
            startText.text = "つぎへ";
            startText.textAlign = "center";
            expScene2.addChild(startText);
            displayedEnglish3 = new Sprite(140, 0);
            displayedEnglish3.image = core.assets["applet.png"];
            displayedEnglish3.frame = apple.indexOf(1);
            for (var index = 0; index < cubeLength; index++) {
                displayedEnglish2[index] = new Sprite(140, 180);
                displayedEnglish2[index].x = 358 + 170 * index;
                displayedEnglish2[index].y = 250;
                displayedEnglish2[index].image = core.assets["applet.png"];
                displayedEnglish2[index].frame = displayedEnglish[index].frame;
                expScene2.addChild(displayedEnglish2[index]);
            }
            expScene2.addChild(displayedEnglish3);
            expapple.tl.delay(48).fadeOut(12).then(function() {
                exp2.tl.fadeIn(12);
                expapple.tl.clear();
                for (var index2 = 0; index2 < cubeLength; index2++) {
                    displayedEnglish2[index2].tl.moveY(600, 24, enchant.Easing.BACK_EASEOUT);
                }
                displayedEnglish2[1].tl.then(function() {
                    displayedEnglish3.x = displayedEnglish2[1].x;
                    displayedEnglish3.y = displayedEnglish2[1].y;
                    displayedEnglish3.tl.repeat(function() {
                        this.height += 5;
                    }, 36);
                });
            });
            var isButton = false;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "e":
                        if (!isButton) {
                            isButton = true;
                            stages();
                        }
                    break;
                }
            });
            core.pushScene(expScene2);
        }
        function stages() {
            var sButtonX = [1170, 1130, 1200];
            var select = 0;
            var sea = new Sprite(coreW * 3, coreH);
            sea.x = 0;
            sea.y = 0;
            sea.image = core.assets["sea.png"];
            selectStage.addChild(sea);
            var boat = new Sprite(coreW, coreH);
            boat.x = 0;
            boat.y = 0;
            boat.image = core.assets["boat.png"];
            selectStage.addChild(boat);
            var searobo = new Sprite(coreW, coreH);
            searobo.x = 0;
            searobo.y = 200;
            searobo.image = core.assets["searobo.png"];
            selectStage.addChild(searobo);
            searobo.tl.moveY(0, 12);
            var boat2 = new Sprite(coreW, coreH);
            boat2.x = 0;
            boat2.y = 0;
            boat2.image = core.assets["boat2.png"];
            selectStage.addChild(boat2);
            var seastage = new Sprite(coreW, coreH);
            seastage.x = 0;
            seastage.y = 0;
            seastage.image = core.assets["seastage.png"];
            selectStage.addChild(seastage);
            seastage.opacity = 0;
            seastage.tl.fadeIn(24);
            var seaisland = new Sprite(coreW * 3, coreH);
            seaisland.x = 0;
            seaisland.y = 0;
            seaisland.image = core.assets["seaisland.png"];
            selectStage.addChild(seaisland);
            var gButton = new Sprite(200, 200);
            gButton.scaleX = 0.5;
            gButton.scaleY = 0.5;
            gButton.x = 30;
            gButton.y = 50;
            gButton.image = core.assets["button.png"];
            gButton.frame = 0;
            selectStage.addChild(gButton);
            var yButton = new Sprite(200, 200);
            yButton.scaleX = 0.5;
            yButton.scaleY = 0.5;
            yButton.x = 30;
            yButton.y = 200;
            yButton.image = core.assets["button.png"];
            yButton.frame = 1;
            selectStage.addChild(yButton);
            var gText = new Label();
            gText.width = 1000;
            gText.x = 240;
            gText.y = gButton.y + 65;
            gText.font = "55px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            gText.color = "blue";
            gText.text = addStroke("まえのステージへ");
            selectStage.addChild(gText);
            var yText = new Label();
            yText.width = 1000;
            yText.x = gText.x;
            yText.y = yButton.y + 65;
            yText.font = "55px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            yText.color = "blue";
            yText.text = addStroke("つぎのステージへ");
            selectStage.addChild(yText);
            var fukidashi1 = new Sprite(coreW, coreH);
            fukidashi1.x = 0;
            fukidashi1.y = 0;
            fukidashi1.image = core.assets["fukidashi1.png"];
            fukidashi1.frame = 0;
            selectStage.addChild(fukidashi1);
            fukidashi1.opacity = 0;
            fukidashi1.tl.fadeIn(18);
            var sButton = new Sprite(200, 200);
            sButton.scaleX = 0.5;
            sButton.scaleY = 0.5;
            sButton.x = 30;
            sButton.y = 350; // 470
            sButton.image = core.assets["button.png"];
            sButton.frame = 2;
            selectStage.addChild(sButton);
            var sText = new Label();
            sText.width = 1000;
            sText.x = gText.x;
            sText.y = sButton.y + 65;
            sText.font = "55px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            sText.color = "blue";
            sText.text = addStroke("ステージをきめる");
            selectStage.addChild(sText);
            var selectmode = new Sprite(500, 100);
            selectmode.x = 200;
            selectmode.y = 100;
            selectmode.image = core.assets["selectmode.png"];
            selectmode.frame = 0;
            selectmode.opacity = 0;
            selectStage.addChild(selectmode);
            var easymode = new Sprite(500, 100);
            easymode.x = 200;
            easymode.y = 100;
            easymode.image = core.assets["mode.png"];
            easymode.frame = 0;
            easymode.opacity = 0;
            selectStage.addChild(easymode);
            var normalmode = new Sprite(500, 100);
            normalmode.x = 800;
            normalmode.y = 100;
            normalmode.image = core.assets["mode.png"];
            normalmode.frame = 1;
            normalmode.opacity = 0;
            selectStage.addChild(normalmode);
            var gamestart2 = new Sprite(140, 140);
            gamestart2.x = sButton.x + 30;
            gamestart2.y = sButton.y + 30;
            gamestart2.image = core.assets["gamestart2.png"];
            gamestart2.opacity = 0;
            selectStage.addChild(gamestart2);
            core.replaceScene(selectStage);
            stagenumber = 0;
            var isButton = false;
            remote.on("emit_from_server", function (data) {
                if (core.currentScene == selectStage) {
                    switch (data) {
                        case "e":
                            if (isButton) {
                                isButton = false;
                                sea.y = -coreH;
                                // seaisland.y = -coreH;
                                selectStage.y = coreH;
                                select = 1;
                                // var answerlist =
                                // rands(word[stagenumber + mode1 * 3].filter(itemA => worditem[stagenumber + mode1 * 3].indexOf(itemA) == -1));
                                // while (answerlist.length < 3) {
                                //     var witem = worditem[stagenumber + mode1 * 3].filter(
                                //         itemA => answerlist.indexOf(itemA) == -1
                                //     ); 
                                //     answerlist.push(witem[Math.floor(Math.random() * witem.length)]);
                                // }
                                // clears(2, answerlist.slice(0, 3), [true, false, true]);
                                startv.stop();
                                games();
                            }
                            if (!isButton && select == 0) {
                                isButton = true;
                                mode = 0;
                                select = 1;
                                fukidashi1.image = core.assets["fukidashi2.png"];
                                fukidashi1.frame = 0;
                                gText.opacity = 0;
                                yText.color = "navy";
                                yText.text = addStroke("もどる");
                                sText.color = "navy";
                                sText.text = addStroke("ゲームスタート");
                                selectmode.opacity = 1;
                                easymode.opacity = 1;
                                normalmode.opacity = 1;
                                gamestart2.opacity = 1;
                                gamestart2.scaleX = 0.5;
                                gamestart2.scaleY = 0.5;
                                gamestart2.tl.scaleTo(1.2, 1.2, 20).scaleTo(0.5, 0.5, 1).loop();
                            }
                        break;
                        case "a":
                            if (stagenumber > 0 && select == 0) {
                                stagenumber--;
                                sea.tl.moveX(-stagenumber * coreW, 24);
                                seaisland.tl.moveX(-stagenumber * coreW, 24);
                                searobo.frame = stagenumber;
                                searobo.y = 200;
                                searobo.tl.moveY(0, 12);
                                seastage.frame--;
                                seastage.opacity = 0;
                                seastage.tl.fadeIn(24);
                                fukidashi1.frame--;
                                fukidashi1.opacity = 0;
                                fukidashi1.tl.fadeIn(18);
                            }
                            if (select == 1) {
                                if (mode == 0) {
                                    mode = 1;
                                    selectmode.x = 800;
                                    selectmode.frame = 1;
                                } else {
                                    mode = 0;
                                    selectmode.x = 200;
                                    selectmode.frame = 0;
                                }
                            }
                        break;
                        case "c":
                            if (stagenumber < 2 && select == 0) {
                                stagenumber++;
                                sea.tl.moveX(-stagenumber * coreW, 24);
                                seaisland.tl.moveX(-stagenumber * coreW, 24);
                                searobo.frame = stagenumber;
                                searobo.y = 200;
                                searobo.tl.moveY(0, 12);
                                seastage.frame++;
                                seastage.opacity = 0;
                                seastage.tl.fadeIn(24);
                                fukidashi1.frame++;
                                fukidashi1.opacity = 0;
                                fukidashi1.tl.fadeIn(18);
                            }
                            if (select == 1) {
                                gText.opacity = 1;
                                yText.color = "blue";
                                yText.text = addStroke("つぎのステージへ");
                                sText.color = "blue";
                                sText.text = addStroke("ステージをきめる");
                                selectmode.opacity = 0;
                                easymode.opacity = 0;
                                normalmode.opacity = 0;
                                gamestart2.opacity = 0;
                                fukidashi1.image = core.assets["fukidashi1.png"];
                                fukidashi1.frame = stagenumber;
                                select = 0;
                                isButton = false;
                            }
                        break;
                    }
                }
            });
        }
        function games() {
            var sea = new Sprite(coreW * 3, coreH);
            sea.x = 0;
            sea.y = 0;
            sea.image = core.assets["sea.png"];
            sea.frame = stagenumber;
            gameScene.addChild(sea);
            var cubePlace = 0;
            var yourAnswer = "";
            var questionIndex = 1;
            var stageScene = 0;
            var correct = 0;
            var mb1 = [], mb2 = [true, true, true];
            var alphabetPosition;
            //問題番号表示
            var game = new Sprite(1536, 864);
            game.x = 0;
            game.y = 0;
            game.image = core.assets["game.png"];
            gameScene.addChild(game);
            var counter = new Label();
            counter.x = 40;
            counter.y = 30;
            counter.color = "white";
            counter.font = "200px Arial Black";
            counter.width = 300;
            counter.textAlign = "center";
            gameScene.addChild(counter);
            //日本語
            var Japanese = new Label();
            Japanese.width = 600;
            Japanese.x = coreW - Japanese.width;
            Japanese.y = 200;
            Japanese.textAlign = "center";
            gameScene.addChild(Japanese);
            //英語（通常は表示しない）
            var English = new Label();
            English.width = 600;
            English.x = coreW - Japanese.width;
            English.y = 350;
            English.font = "90px Arial Black";
            English.textAlign = "center";
            var mode1;
            if (mode == 0) {
                gameScene.addChild(English);
                mode1 = 0;
            } else {
                mode1 = 1;
            }
            // gameScene.addChild(English);
            //緑ボタン
            var greenButton = new Sprite(200, 200);
            greenButton.scaleX = 0.5;
            greenButton.scaleY = 0.5;
            greenButton.x = -30;
            greenButton.y = 350;
            greenButton.image = core.assets["button.png"];
            greenButton.frame = 0;
            gameScene.addChild(greenButton);
            var greenText = new Label();
            greenText.width = 500;
            greenText.font = "50px 'HGP創英角ｺﾞｼｯｸUB', Arial";
            greenText.x = 140;
            gameScene.addChild(greenText);
            //黄色ボタン
            var yellowButton = new Sprite(200, 200);
            yellowButton.scaleX = 0.5;
            yellowButton.scaleY = 0.5;
            yellowButton.x = -30;
            yellowButton.y = 610;
            yellowButton.image = core.assets["button.png"];
            yellowButton.frame = 2;
            gameScene.addChild(yellowButton);
            var yellowText = new Label();
            yellowText.width = 500;
            yellowText.font = "50px 'HGP創英角ｺﾞｼｯｸUB', Arial";
            yellowText.x = 140;
            gameScene.addChild(yellowText);
            var yellow2Button = new Sprite(200, 200);
            yellow2Button.scaleX = 0.5;
            yellow2Button.scaleY = 0.5;
            yellow2Button.x = -30;
            yellow2Button.y = 480;
            yellow2Button.image = core.assets["button.png"];
            yellow2Button.frame = 1;
            gameScene.addChild(yellow2Button);
            var yellow2Text = new Label();
            yellow2Text.width = 500;
            yellow2Text.font = "50px 'HGP創英角ｺﾞｼｯｸUB', Arial";
            yellow2Text.x = 140;
            gameScene.addChild(yellow2Text);
            //絵
            var picture = new Sprite(600, 600);
            picture.x = 390;
            picture.y = 40;
            picture.image = core.assets["eigo.png"];
            gameScene.addChild(picture);
            var marubatu = new Sprite(500, 500);
            marubatu.image = core.assets["marubatu.png"];
            marubatu.x = picture.x + 50;
            marubatu.y = picture.y + 50;
            marubatu.opacity = 0;
            gameScene.addChild(marubatu);
            //英語表示
            var displayedEnglish = [];
            var answerWord;
            // stageWord[0] = [1, 28, 25];
            var answerList =
            rands(word[stagenumber + mode * 3].filter(itemA => worditem[stagenumber + mode * 3].indexOf(itemA) == -1));
            while (answerList.length < 3) {
                var witem = worditem[stagenumber + mode * 3].filter(
                    itemA => answerList.indexOf(itemA) == -1
                ); 
                answerList.push(witem[Math.floor(Math.random() * witem.length)]);
            }
            // var answerList = [1, 28, 25];
            var answer;
            var rstart;
            var fpa, fpst;
            var tryAgain = true;
            //問題表示・判定関数
            function question() {
                marubatu.opacity = 0;
                answer = englishWord.indexOf(answerList[questionIndex - 1]);
                // var answer = Math.floor(Math.random() * japaneseWord.length);
                // var answer = 9;
                Japanese.text = japaneseWord[answer];
                if (Japanese.text.length >= 4) {
                    Japanese.font = "90px 'HGP創英角ｺﾞｼｯｸUB', Arial";
                } else {
                    Japanese.font = "140px 'HGP創英角ｺﾞｼｯｸUB', Arial";
                }
                // Japanese.text = answer;
                answerWord = answerList[questionIndex - 1];
                English.text = answerWord;
                while (answerWord.length < cubeLength) {
                    answerWord = answerWord + "[";
                }
                displayedEnglish = [];
                for (var index = 0; index < answerWord.length; index++) {
                    displayedEnglish[index] = new Sprite(140, 180);
                    // displayedEnglish[index].x = coreW / 2 + (index - answerWord.length / 2) * (displayedEnglish[0].width + 30);
                    //(coreW - (displayedEnglish[0].width + 30) * cubeLength - 30) / 2 + (displayedEnglish[0].width + 30) * index+ 15 の簡略化
                    displayedEnglish[index].x = 500 + 170 * index;
                    displayedEnglish[index].y = 650;
                    displayedEnglish[index].image = core.assets["abc.png"];
                    gameScene.addChild(displayedEnglish[index]);
                }
                rstart = 0;
                if (answerWord.length > cubeLength) {
                    rstart = rand(answerWord.length - cubeLength);
                }
                for (var index = 0; index < answerWord.length; index++) {
                    if (index < rstart || index >= rstart + cubeLength) {
                        displayedEnglish[index].frame = answerWord.charCodeAt(index) - 37;
                    } else {
                        displayedEnglish[index].frame = 27;
                    }
                }
                var starnum = 0;
                while (answerWord.indexOf("[", starnum) >= 0) {
                    displayedEnglish[answerWord.indexOf("[", starnum)].frame = 26;
                    starnum = answerWord.indexOf("[", starnum) + 1;
                }
                picture.frame = answer;
                counter.text = questionIndex;
                // greenText.y = greenButton.y + 40;
                greenText.y = greenButton.y + 40;
                // greenText.text = "はつおんを<br>きく";
                greenText.text = addStroke("はつおんを<br>きく");
                yellowText.y = yellowButton.y + 40;
                // yellowText.y = yellowButton.y + 65;
                // yellowText.text = "つぎに<br>すすむ";
                yellowText.text = addStroke("こたえ<br>あわせ");
                yellow2Text.y = yellow2Button.y + 65;
                // yellow2Text.y = yellow2Button.y + 65;
                // yellow2Text.text = "もういちど";
                yellow2Text.text = addStroke("やりなおし");
                fpa = JSON.parse(JSON.stringify(fp));
                if (answerWord.indexOf("[") >= 0) {
                    fpst = fpa.splice(answerWord.indexOf("["), cubeLength - answerWord.indexOf("["));
                }
                alphabetPosition = rands2(fpa);
                var color = (questionIndex - (tryAgain? 0:1)) % 3;
                game.frame = color;
                for (var index = 0; index < cubeLength * 2; index++) {
                    if (answerWord.charAt(index % cubeLength + rstart) == '[') {
                        remote.emit('emit_from_client', "w" + fpst[index % cubeLength -
                        answerWord.indexOf("[")] + String.fromCharCode(59 + 32 * color));
                    } else {
                        remote.emit('emit_from_client', "w" + alphabetPosition[index % cubeLength] +
                        String.fromCharCode(answerWord.charCodeAt(index % cubeLength + rstart) - 32 +
                        32 * color));
                    }
                }
            }
            var answerInput, isCorrect;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                case "c":
                    if (stageScene == 0) {
                        for (var index = 0; index < cubeLength; index++) {
                            displayedEnglish[index + rstart].tl.clear();
                            displayedEnglish[index + rstart].frame = 27;
                        }
                        var starnum = 0;
                        while (answerWord.indexOf("[", starnum) >= 0) {
                            displayedEnglish[answerWord.indexOf("[", starnum)].frame = 26;
                            starnum = answerWord.indexOf("[", starnum) + 1;
                        }
                        Japanese.tl.clear();
                        counter.tl.clear();
                        for (var index = 0; index < cubeLength * 2; index++) {
                            if (answerWord.charAt(index % cubeLength + rstart) == '[') {
                                remote.emit('emit_from_client', "w" + fpst[index % cubeLength -
                                answerWord.indexOf("[")] + String.fromCharCode(59 + 32 *
                                ((questionIndex - (tryAgain? 0:1)) % 3)));
                            } else {
                                remote.emit('emit_from_client', "w" + alphabetPosition[index % cubeLength] +
                                String.fromCharCode(answerWord.charCodeAt(index % cubeLength + rstart) - 32 +
                                32 * ((questionIndex - (tryAgain? 0:1)) % 3)));
                            }
                        }
                    } else if (stageScene == 1) {
                        for (var index = 0; index < answerWord.length; index++) {
                            gameScene.removeChild(displayedEnglish[index]);
                        }
                        gamev.stop();
                        gamev.volume = 0.4;
                        gamev.play();
                        stageScene = 0;
                        tryAgain = !tryAgain;
                        question();
                        cubePlace = 0;
                        yourAnswer = "";
                    }
                    break;
                case "d":
                    break;
                case "e":
                    if (stageScene == 0) {
                        remote.emit('emit_from_client', "r" + fp[0]);
                        Japanese.tl.delay(48).then(function () {
                            remote.emit('emit_from_client', "r" + fp[0]);
                        }).loop();
                        for (var index = 0; index < cubeLength; index++) {
                            if (displayedEnglish[index + rstart].frame == 27) {
                                displayedEnglish[index + rstart].tl.delay(3).then(function () {
                                    this.frame = rand(25);
                                }).loop();
                            }
                        }
                        /*Japanese.tl.delay(48).then(function () {
                            if (cubePlace == 0) {
                                remote.emit('emit_from_client', "r" + fp[0]);
                            }
                        });*/
                    }
                    if (stageScene == 1) {
                        if (mb2[questionIndex - 1]) {
                            correct++;
                        }
                        questionIndex++;
                        if (questionIndex > qNumber) {
                            stageScene = 2;
                            gamev.stop();
                            clears(correct, mb1.slice(0, 3), mb2, mode1);
                        } else {
                            for (var index = 0; index < answerWord.length; index++) {
                                gameScene.removeChild(displayedEnglish[index]);
                            }
                            gamev.stop();
                            gamev.volume = 0.4;
                            gamev.play();
                            stageScene = 0;
                            tryAgain = true;
                            question();
                            cubePlace = 0;
                            yourAnswer = "";
                        }
                    }
                    break;
                case "f":
                    break;
                case "a":
                    gamev.volume = 0.1;
                    game.tl.delay(8).then(function() {
                        voice[answer].play();
                    }).delay(48).then(function() {
                        gamev.volume = 0.4;
                    });
                    break;
                case "b":
                    break;
                default:
                    if (data != "a" && data != "b" && data != "c" && data != "d") {
                        yourAnswer = yourAnswer.concat(data);
                        Japanese.tl.clear();
                        displayedEnglish[cubePlace + rstart].tl.clear();
                        displayedEnglish[cubePlace + rstart].frame = data.charCodeAt() - 65;
                        cubePlace++;
                        if (cubePlace != cubeLength) {
                            if (displayedEnglish[cubePlace + rstart].frame == 26) {
                                for (var cubenum = cubePlace; cubenum < cubeLength; cubenum++) {
                                    yourAnswer += '[';
                                }
                                cubePlace = cubeLength;
                            }
                        }
                        if (cubePlace == cubeLength) {
                            cubePlace = 0;
                            var stringcount = true;
                            for (var cubenum = 0; cubenum < cubeLength; cubenum++) {
                                stringcount
                                &=(stringCounter(yourAnswer, answerWord.charAt(cubenum + rstart))
                                == stringCounter(answerWord.substring(rstart, rstart + cubeLength), answerWord.charAt(cubenum + rstart)));
                            }
                            if (stringcount) {
                            // if (false) {
                                // counter.text = yourAnswer.replace("[", "☆");
                                answerInput = answerWord.substring(rstart, rstart + cubeLength);
                                isCorrect = true;
                                for (var index = 0; index < cubeLength; index++) {
                                    displayedEnglish[index + rstart].tl.clear();
                                    if (yourAnswer.charAt(index) == answerInput.charAt(index)) {
                                        displayedEnglish[index + rstart].frame = answerWord.charCodeAt(index + rstart) - 65;
                                    } else {
                                        displayedEnglish[index + rstart].frame = 27;
                                        isCorrect = false;
                                    }
                                }
                                mb1[questionIndex - 1] = answerWord;
                                Japanese.tl.clear();
                                if (isCorrect) {
                                    marubatu.frame = 0;
                                    marubatu.opacity = 0.5;
                                    stageScene = 1;
                                    yellow2Text.y = yellow2Button.y + 65;
                                    // yellowText.y = yellowButton.y + 65;
                                    yellow2Text.text = addStroke("もういちど");
                                    // yellowText.text = "こたえ<br>あわせ";
                                    yellowText.y = yellowButton.y + 40;
                                    // yellowText.y = yellowButton.y + 65;
                                    yellowText.text = addStroke("つぎに<br>すすむ");
                                    // yellowText.text = "こたえ<br>あわせ";
                                    gamev.volume = 0.1;
                                    game.tl.delay(8).then(function() {
                                        voice[answer].volume = 1;
                                        voice[answer].play();
                                    }).delay(48).then(function() {
                                        gamev.volume = 0.4;
                                    });
                                    greenText.y = greenButton.y + 40;
                                    // yellow2Text.y = yellow2Button.y + 65;
                                    greenText.text = addStroke("はつおんを<br>きく");
                                    // yellow2Text.text = "ヒントを<br>きく";
                                } else {
                                    marubatu.frame = 1;
                                    marubatu.opacity = 0.5;
                                    mb2[questionIndex - 1] = false;
                                    yourAnswer = "";
                                }
                            } else {
                                yourAnswer = "";
                                counter.tl.delay(6).then(function () {
                                    remote.emit('emit_from_client', "r" + fp[0]);
                                });
                            }
                        } else {
                            remote.emit('emit_from_client', "r" + fp[cubePlace]);
                            Japanese.tl.delay(48).then(function () {
                                remote.emit('emit_from_client', "r" + fp[cubePlace]);
                            }).loop();
                        }
                    }
                    break;
                }
            });
            // gameScene.backgroundColor = "red";
            /*gameScene.backgroundColor = "red; text-shadow:\
            1px 1px 0 #FFF, -1px -1px 0 #FFF,\
            -1px 1px 0 #FFF, 1px -1px 0 #FFF,\
            0px 1px 0 #FFF,  0-1px 0 #FFF,\
            -1px 0 0 #FFF, 1px 0 0 #FFF";*/
            gamev.volume = 0.4;
            gamev.play();
            core.replaceScene(gameScene);
            question();
        }
        function clears(cor, res1, res2, mode1) {
            var sea = new Sprite(coreW, coreH);
            sea.x = 0;
            sea.y = 0;
            sea.image = core.assets["sea.png"];
            sea.frame = stagenumber;
            clearScene.addChild(sea);
            var boat = new Sprite(coreW, coreH);
            boat.x = 400;
            boat.y = -200;
            boat.image = core.assets["boat.png"];
            clearScene.addChild(boat);
            var searobo = new Sprite(coreW, coreH);
            searobo.x = boat.x;
            searobo.y = boat.y;
            searobo.image = core.assets["searobo.png"];
            searobo.frame = stagenumber;
            clearScene.addChild(searobo);
            searobo.tl
            .moveY(boat.y - 100, 10, enchant.Easing.CUBIC_EASEOUT)
            .moveY(boat.y, 10, enchant.Easing.CUBIC_EASEIN).loop();
            var boat2 = new Sprite(coreW, coreH);
            boat2.x = boat.x;
            boat2.y = boat.y;
            boat2.image = core.assets["boat2.png"];
            clearScene.addChild(boat2);
            var gameclear = new Sprite(coreW, coreH);
            gameclear.x = 0;
            gameclear.y = 0;
            gameclear.image = core.assets["gameclear.png"];
            clearScene.addChild(gameclear);
            var seaisland = new Sprite(coreW, coreH);
            seaisland.x = 0;
            seaisland.y = 0;
            seaisland.image = core.assets["seaisland.png"];
            seaisland.frame = stagenumber;
            clearScene.addChild(seaisland);
            //ゲームの結果表示
            var resultText = new Label();
            resultText.width = 1000;
            resultText.x = 200;
            resultText.y = 60;
            resultText.font = "80px 'HGP創英角ｺﾞｼｯｸUB', Arial";
            resultText.color = "navy";
            resultText.text = "<ol>";
            var resnstar = [];
            for (var m = 0; m < res1.length; m++) {
                resultText.text += "<li style='margin-bottom:40px;'>";
                // resultText.text += "<li>";
                if (res2[m]) {
                    resultText.text += "○ ";
                } else {
                    resultText.text += "× ";
                }
                resultText.text += res1[m].replace(/\[/g, "");
                resnstar[m] = res1[m].replace(/\[/g, "");
                resultText.text += "</li>";
            }
            resultText.text += "</ol>";
            clearScene.addChild(resultText);
            //クリアメッセージ
            var clearMessage = new Label();
            clearMessage.width = 1500;
            clearMessage.x = 100;
            clearMessage.y = 550;
            clearMessage.font = "60px 'HGP創英角ｺﾞｼｯｸUB', Arial";
            clearMessage.text = qNumber + "もんちゅう<span style='font-weight:bold;'>" + cor + "</span>もんせいかいだよ！<br/>";
            // if (cor == qNumber) {
            //     clearMessage.text += "おめでとう！";
            // } else {
            //     clearMessage.text += "ぜんもんせいかいめざして、がんばろう！";
            // }
            clearScene.addChild(clearMessage);
            //クリア画面のロボット
            /*var clearRobot = [new Sprite(200, 200), new Sprite(200, 200)];
            var croboPosition = {
                x: [700, 1100],
                frame: [4, 3],
                motion: [15, -15]
            }
            for (var index = 0; index < clearRobot.length; index++) {
                clearRobot[index].scaleX = 2;
                clearRobot[index].scaleY = 2;
                clearRobot[index].x = croboPosition.x[index];
                clearRobot[index].y = 200;
                clearRobot[index].image = core.assets["erobo.png"];
                clearRobot[index].frame = croboPosition.frame[index];
                clearScene.addChild(clearRobot[index]);
                clearRobot[index].tl
                .rotateTo(croboPosition.motion[index], 8).delay(4)
                .rotateTo(0 - croboPosition.motion[index], 8).delay(4).loop();
            }*/
            var sButton = new Sprite(200, 200);
            sButton.scaleX = 0.5;
            sButton.scaleY = 0.5;
            sButton.x = 520;
            sButton.y = 650; // 470
            sButton.image = core.assets["button.png"];
            sButton.frame = 2;
            clearScene.addChild(sButton);
            var sText = new Label();
            sText.width = 1000;
            sText.x = 700;
            sText.y = sButton.y + 65;
            sText.font = "55px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            sText.color = "blue";
            sText.text = addStroke("つぎにすすむ");
            clearScene.addChild(sText);
            var isButton = true;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "e":
                        if (isButton) {
                            isButton = false;
                            results(resnstar, res2, mode1);
                        }
                    break;
                }
            });
            // clearScene.backgroundColor = "aliceblue";
            clearv.volume = 0.8;
            clearv.play();
            core.replaceScene(clearScene);
        }
        function results(res1, res2, mode1) {
            var sea = new Sprite(coreW, coreH);
            sea.x = 0;
            sea.y = 0;
            sea.image = core.assets["sea.png"];
            sea.frame = stagenumber;
            resScene.addChild(sea);
            var item = [];
            var res = new Sprite(coreW, coreH);
            res.x = 0;
            res.y = 0;
            res.image = core.assets["res1.png"];
            resScene.addChild(res);
            var sButton = new Sprite(200, 200);
            sButton.scaleX = 0.5;
            sButton.scaleY = 0.5;
            sButton.x = 1130;
            sButton.y = 610; // 470
            sButton.image = core.assets["button.png"];
            sButton.frame = 2;
            resScene.addChild(sButton);
            var sText = new Label();
            sText.width = 1000;
            sText.x = 480;
            sText.y = sButton.y + 40;
            sText.font = "55px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            sText.color = "blue";
            sText.textAlign = "right";
            sText.text = addStroke("トップに<br>もどる");
            resScene.addChild(sText);
            var gButton = new Sprite(200, 200);
            gButton.scaleX = 0.5;
            gButton.scaleY = 0.5;
            gButton.x = 10;
            gButton.y = 600; // 470
            gButton.image = core.assets["button.png"];
            gButton.frame = 0;
            resScene.addChild(gButton);
            var gText = new Label();
            gText.width = 1000;
            gText.x = 180;
            gText.y = gButton.y + 65;
            gText.font = "55px 'HGP創英角ﾎﾟｯﾌﾟ体'";
            gText.color = "blue";
            gText.text = addStroke("もういちど");
            resScene.addChild(gText);
            var comp = new Sprite(coreW, coreH);
            comp.x = 0;
            comp.y = 0;
            comp.image = core.assets["complete.png"];
            var itemf = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var index = 0; index < 9; index++) {
                item[index] = new Sprite(200, 200);
                item[index].x = 458 + 210 * (index % 3);
                item[index].y = 200 + 210 * Math.floor(index / 3);
                item[index].image = core.assets["item.png"];
                resScene.addChild(item[index]);
                if (worditem[stagenumber + mode1 * 3].indexOf(word[stagenumber + mode1 * 3][index]) != -1) {
                    item[index].frame = englishWord.indexOf(word[stagenumber + mode1 * 3][index]) + 48;
                } else if (res1.indexOf(word[stagenumber + mode1 * 3][index]) != -1) {
                    if(res2[res1.indexOf(word[stagenumber + mode1 * 3][index])]) {
                        item[index].frame = englishWord.indexOf(word[stagenumber + mode1 * 3][index]);
                        itemf[index] = englishWord.indexOf(word[stagenumber + mode1 * 3][index]) + 48;
                        item[index].tl.scaleTo(0, 1, 5).then(function() {
                            this.frame = itemf[word[stagenumber + mode1 * 3].indexOf(englishWord[this.frame])];
                        }).scaleTo(1, 1, 5);
                        worditem[stagenumber + mode1 * 3].push(word[stagenumber + mode1 * 3][index]);
                    } else {
                        item[index].frame = englishWord.indexOf(word[stagenumber + mode1 * 3][index]);
                        // item[index].frame = 0;
                    }
                } else {
                    console.log(word[stagenumber + mode1 * 3][index]);
                    console.log(res1);
                    item[index].frame = englishWord.indexOf(word[stagenumber + mode1 * 3][index]);
                    // item[index].frame = 0;
                }
            }
            var isButton = true;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "e":
                        if (isButton) {
                            isButton = false;
                            document.cookie = "ST=000";
                            location.reload();
                        }
                    break;
                    case "a":
                        if (isButton) {
                            isButton = false;
                            document.cookie = "ST=1" + stagenumber.toString() + mode1.toString();
                            location.reload();
                        }
                    break;
                }
            });
            console.log(mode1);
            document.cookie = "ITEM" + (stagenumber + mode1 * 3) + "=" + JSON.stringify(worditem[stagenumber + mode1 * 3]);
            document.cookie = "WORD" + (stagenumber + mode1 * 3) + "=" + JSON.stringify(word[stagenumber + mode1 * 3]);
            if (worditem[stagenumber + mode1 * 3].length == 9) {
                resScene.addChild(comp);
                comp.scale(0, 0);
                document.cookie = "ITEM" + (stagenumber + mode1 * 3) + "=; max-age=0";
                var newword = rands(stageWord[stagenumber]);
                newword = newword.slice(0, 9);
                document.cookie = "WORD" + (stagenumber + mode1 * 3) + "=" + JSON.stringify(newword);
                comp.tl.delay(24).scaleTo(1, 1, 12).then(function() {
                    worditem[stagenumber + mode1 * 3] = [];
                    word[stagenumber + mode1 * 3] = newword;
                });
            }
            core.replaceScene(resScene);
        }
        if (readCookie("ST").charAt(0) == "0") {
            init();
        } else {
            stagenumber = parseInt(readCookie("ST").charAt(1));
            mode = parseInt(readCookie("ST").charAt(2));
            games();
        }
        // clears(2, ["CAT", "HORSE", "RABBIT"], [false, true, true]);
        // stages();
    };
    core.start();
};

function rand(n) {
	return Math.floor(Math.random() * (n + 1));
}

function rands2(a) {
    var s = [];
    for (var i = 0; i < a.length; i++) {
        s[i] = a[i];
    }
    for(var i = a.length - 1; i > 0; i--){
        var r = rand(i);
        var tmp = s[i];
        s[i] = s[r];
        s[r] = tmp;
    }
    var j = true;
    for (var k = 0; k < a.length; k++) {
        if (s[k] != a[k]) {
            j = false;
        }
    }
    if (j) {
        return rands2(a);
    } else {
        return s;
    }
}

function rands(a) {
    var s = [];
    for (var i = 0; i < a.length; i++) {
        s[i] = a[i];
    }
    for(var i = a.length - 1; i > 0; i--){
        var r = rand(i);
        var tmp = s[i];
        s[i] = s[r];
        s[r] = tmp;
    }
    return s;
}

function　stringCounter(str,seq){
    return str.split(seq).length - 1;
}

function addStroke(labeltext, px = 1) {
    return "<span style='text-shadow:\
    " + px + "px " + px + "px 0 #FFF, -" + px + "px -" + px + "px 0 #FFF,\
    -" + px + "px " + px + "px 0 #FFF, " + px + "px -" + px + "px 0 #FFF,\
    0px " + px + "px 0 #FFF,  0-" + px + "px 0 #FFF,\
    -" + px + "px 0 0 #FFF, " + px + "px 0 0 #FFF;'>" + labeltext + "</span>";
}