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
    core.preload("marubatu.png", "eigo.png", "abc.png", "erobo.png", "button.png", "down.png", "sea.png", "seaisland.png", "searobo.png", "seastage.png", "boat.png", "boat2.png", "fukidashi1.png", "fukidashi2.png", "gamestart.png", "gamestart2.png", "mode.png", "selectmode.png", "game.png", "gameclear.png", "start.png", "startbubble.png", "startfish.png", "startyacht.png", "lets.png", "letseigo.png", "letspuzzle.png", "icon.png", "setbutton.png", "exp1.png", "exp2.png", "exp3.png", "exp4.png", "expapple.png", "applet.png", "item.png", "res1.png", "complete.png", "load.png", "loadrobo.png", "loadsea.png", "loadisland.png", "loadships.png", "loadsky.png", "selectsky.png", "selectsea.png");
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
    core.preload("loadingrobo.png");
    var loadScene = new Scene();
    core.loadingScene = loadScene;
    var label = new Label();
    var loadingrobo = new Sprite(1160,200);
    loadingrobo.x = (coreW - loadingrobo.width) / 2;
    loadingrobo.y = 300;
	loadScene.addEventListener('progress', function(e) {
		var progress = e.loaded / e.total;
		progress *= 100;
        progress = Math.round(progress);
        loadingrobo.image = core.assets['loadingrobo.png'];
        label.width = 1500;
        label.x = (coreW - label.width) / 2;
        label.y = 600;
        label.textAlign = "center";
        label.font = "50px 'HGP創英角ﾎﾟｯﾌﾟ体'";
		label.text = "よみこみちゅう…" + progress;
		label.color = 'black';
	});
    loadScene.addChild(loadingrobo);
    loadScene.addChild(label);
	loadScene.addEventListener('load', function(e) {
		core.removeScene(core.loadingScene);
		core.dispatchEvent(e);
	});
    core.onload = function () {
        var fp = ["12", "10", "13", "08", "14"];
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
        var hint = [
            "こたつでまるく<br>なるよ！",
            "うれしいと<br>しっぽをふるよ！",
            "うみでおよいで<br>いるよ！",
            "そらでかがやいて<br>いるよ！",
            "はちみつが<br>すきだよ！",
            "そらを<br>とんでいるよ！",
            "◯◯◯のうたが<br>きこえてくるよ",
            "おとうとはれんがの<br>いえをたてました…",
            "くろくて<br>ちいさいよ！",
            "たてがみが<br>かっこいい～",
            "うみのうえを<br>はしっているよ！",
            "しっぽが<br>ふさふさだよ！",
            "たくさんのひとが<br>のれるよ！",
            "どうろを<br>はしっているよ！",
            "いちごやチョコが<br>のってるよ！",
            "そこで<br>べんきょうするよ！",
            "オレンジいろで<br>あまずっぱいよ！",
            "ピンクいろで<br>やわらかいよ！",
            "ジャムをつけても<br>おいしいよ！",
            "はしるのが<br>はやいよ！",
            "もじやえが<br>かけるよ！",
            "いろとりどりで<br>きれいだよ！",
            "せんろを<br>はしるよ！",
            "はたがたって<br>いるよ！",
            "あかくて<br>しんがあるよ！",
            "オレンジいろで<br>ながいよ！",
            "みみが<br>ながいよ！",
            "いろんなせかいが<br>でてくるよ！",
            "やいてたべると<br>おいしいよ！",
            "まるくて<br>へたがあるよ！",
            "きみどりいろで<br>あみめもよう！",
            "しろくて<br>まるいよ！",
            "うみにういて<br>いるよ！",
            "さかながいっぱい<br>およいでいるよ！",
            "あったかくて<br>まぶしいよ！",
            "きいろくて<br>すっぱいよ！",
            "たくさんのむと<br>せがのびるよ！",
            "ごはんのおかずに<br>なるよ！",
            "ふわふわのけは<br>セーターになるよ！",
            "かぞくがあつまる<br>ばしょだよ！",
            "シンデレラの<br>ガラスの…",
            "ゆみをひいて<br>おとをだすよ！",
            "ぎゅうにゅうは<br>おいしいなあ",
            "きいろくて<br>ながいよ！",
            "カラッとあげると<br>おいしいね！",
            "きざむとなみだが<br>でてくるよ…",
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
            var gamestart2 = new Sprite(140, 140);
            gamestart2.x = 30;
            gamestart2.y = 630;
            gamestart2.image = core.assets["gamestart2.png"];
            gamestart2.tl.scaleTo(1.2, 1.2, 20).scaleTo(0.5, 0.5, 1).loop();
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
            var isButton = false;
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
                startScene.addChild(gamestart2);
                bubblefish = 1;
                fish.opacity = 1;
                fish.tl.moveX(-500, 200).then(function() {
                    fish.tl.moveTo(coreW, rand(coreH) - 100, 1);
                }).loop();
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
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "b":
                        if (!isButton) {
                            isButton = true;
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
            var gamestart2 = new Sprite(140, 140);
            gamestart2.x = 1330;
            gamestart2.y = 530;
            gamestart2.image = core.assets["gamestart2.png"];
            gamestart2.tl.scaleTo(1.5, 1.5, 20).scaleTo(1, 1, 1).loop();
            expScene.addChild(gamestart2);
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
            startButton.opacity = 0;
            startText.opacity = 0;
            gamestart2.opacity = 0;
            for (var index = 0; index < cubeLength; index++) {
                displayedEnglish2[index] = new Sprite(140, 180);
                displayedEnglish2[index].x = 358 + 170 * index;
                displayedEnglish2[index].y = 250;
                displayedEnglish2[index].image = core.assets["applet.png"];
                displayedEnglish2[index].frame = displayedEnglish[index].frame;
                expScene.addChild(displayedEnglish2[index]);
            }
            var isButton = false;
            expapple.tl.delay(48).fadeOut(12).then(function() {
                expapple.tl.clear();
                for (var index2 = 0; index2 < cubeLength; index2++) {
                    displayedEnglish2[index2].tl.moveY(600, 24, enchant.Easing.BACK_EASEOUT)
                    .moveY(500, 20)
                    .moveX(358 + 170 * apple.indexOf(index2), 20)
                    .moveY(600, 20)
                    .then(function() {
                        exp2.tl.fadeIn(12);
                    }).delay(24).then(function() {
                        startButton.opacity = 1;
                        startText.opacity = 1;
                        gamestart2.opacity = 1;
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
                    });;
                }
            });
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "a":
                        if (!isButton) {
                            isButton = true;
                            core.popScene(expScene);
                            stages();
                        }
                    break;
                }
            });
            core.pushScene(expScene);
        }
        function stages() {
            var select = 0;
            var sky = new Sprite(coreW * 3, coreH);
            sky.x = 0;
            sky.y = 0;
            sky.image = core.assets["selectsky.png"];
            selectStage.addChild(sky);
            var whale = new Sprite(350, 250);
            whale.x = 1150;
            whale.y = 200;
            whale.image = core.assets["loadships.png"];
            whale.frame = 5;
            whale.opacity = 0;
            selectStage.addChild(whale);
            var ship = new Sprite(350, 250);
            ship.x = 1100;
            ship.y = 220;
            ship.image = core.assets["loadships.png"];
            ship.frame = 6;
            ship.opacity = 0;
            ship.scaleX = 0.5;
            ship.scaleY = 0.5;
            selectStage.addChild(ship);
            var sea = new Sprite(coreW * 3, coreH);
            sea.x = 0;
            sea.y = 0;
            sea.image = core.assets["selectsea.png"];
            selectStage.addChild(sea);
            var gull = new Sprite(350, 250);
            gull.x = core.width;
            gull.y = 250;
            gull.image = core.assets["loadships.png"];
            gull.frame = 3;
            selectStage.addChild(gull);
            var fish = new Sprite(500, 100);
            fish.x = coreW;
            fish.y = rand(300) + 500;
            fish.image = core.assets["startfish.png"];
            selectStage.addChild(fish);
            var fish2 = new Sprite(500, 100);
            fish2.x = -500;
            fish2.y = rand(300) + 500;
            fish2.scaleX = -1;
            fish2.image = core.assets["startfish.png"];
            selectStage.addChild(fish2);
            fish.tl.delay(rand(500)).moveX(-500, rand(300) + 120).then(function() {
                this.tl.moveTo(coreW, rand(300) + 500, 1);
            }).loop();
            fish2.tl.moveX(coreW, rand(300) + 120).then(function() {
                this.tl.moveTo(-500, rand(300) + 500, 1);
            }).delay(rand(500)).loop();
            gull.tl
            .moveX(-gull.width, 120).and().moveY(0, 120, enchant.Easing.BACK_EASEIN)
            .delay(rand(120) + 48).moveX(-gull.width, 1).moveY(rand(300), 1)
            .moveX(coreW, 120).and().moveY(0, 120, enchant.Easing.BACK_EASEIN)
            .delay(rand(120) + 48).moveX(coreW, 1).moveY(rand(300), 1)
            .loop();
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
            var gButton2 = new Sprite(140, 140);
            gButton2.x = 60;
            gButton2.y = 80;
            gButton2.image = core.assets["gamestart2.png"];
            gButton2.scaleX = 0.5;
            gButton2.scaleY = 0.5;
            selectStage.addChild(gButton2);
            var gButton = new Sprite(200, 200);
            gButton.scaleX = 0.5;
            gButton.scaleY = 0.5;
            gButton.x = 30;
            gButton.y = 50;
            gButton.image = core.assets["button.png"];
            gButton.frame = 0;
            selectStage.addChild(gButton);
            var yButton2 = new Sprite(140, 140);
            yButton2.x = 60;
            yButton2.y = 230;
            yButton2.image = core.assets["gamestart2.png"];
            yButton2.scaleX = 0.5;
            yButton2.scaleY = 0.5;
            selectStage.addChild(yButton2);
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
            var sButton2 = new Sprite(140, 140);
            sButton2.x = 60;
            sButton2.y = 380;
            sButton2.image = core.assets["gamestart2.png"];
            sButton2.scaleX = 0.5;
            sButton2.scaleY = 0.5;
            selectStage.addChild(sButton2);
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
                            sButton2.tl.scaleTo(1.2, 1.2, 1).scaleTo(0.5, 0.5, 20);
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
                            gButton2.tl.scaleTo(1.2, 1.2, 1).scaleTo(0.5, 0.5, 20);
                            if (stagenumber > 0 && select == 0) {
                                stagenumber--;
                                sea.tl.moveX(-stagenumber * coreW, 24);
                                sky.tl.moveX(-stagenumber * coreW, 24);
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
                                if (stagenumber == 1) {
                                    whale.tl.delay(24).fadeIn(1).and().moveY(170, 36).delay(24).moveY(200, 36).loop();
                                } else {
                                    whale.opacity = 0;
                                    whale.tl.clear();
                                }
                                if (stagenumber == 2) {
                                    ship.tl.delay(24).then(function() {
                                        ship.tl.clear();
                                        ship.tl.scaleTo(0.5, 0.5, 1).fadeIn(5)
                                        .moveY(170, 36).and().moveX(1200, 36)
                                        .and().scaleTo(2, 2, 36).and().fadeOut(36).moveTo(1100, 220, 1).loop();
                                    });
                                } else {
                                    ship.opacity = 0;
                                    ship.tl.clear();
                                }
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
                            yButton2.tl.scaleTo(1.2, 1.2, 1).scaleTo(0.5, 0.5, 20);
                            if (stagenumber < 2 && select == 0) {
                                stagenumber++;
                                sea.tl.moveX(-stagenumber * coreW, 24);
                                sky.tl.moveX(-stagenumber * coreW, 24);
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
                                if (stagenumber == 1) {
                                    whale.tl.delay(24).fadeIn(1).and().moveY(170, 36).delay(24).moveY(200, 36).loop();
                                } else {
                                    whale.opacity = 0;
                                    whale.tl.clear();
                                }
                                if (stagenumber == 2) {
                                    ship.tl.delay(24).then(function() {
                                        ship.tl.clear();
                                        ship.tl.scaleTo(0.5, 0.5, 1).fadeIn(5)
                                        .moveY(170, 36).and().moveX(1200, 36)
                                        .and().scaleTo(2, 2, 36).and().fadeOut(36).moveTo(1100, 220, 1).loop();
                                    });
                                } else {
                                    ship.opacity = 0;
                                    ship.tl.clear();
                                }
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
            var loadsky = new Sprite(1536, 864);
            loadsky.x = 0;
            loadsky.y = 0;
            loadsky.image = core.assets["loadsky.png"];
            gameScene.addChild(loadsky);
            var whaleorship;
            var loadwhale = new Sprite(350, 250);
            loadwhale.x = core.width;
            loadwhale.y = 250;
            loadwhale.image = core.assets["loadships.png"];
            gameScene.addChild(loadwhale);
            var loadship = new Sprite(350, 250);
            loadship.x = core.width;
            loadship.y = 250;
            loadship.image = core.assets["loadships.png"];
            loadship.frame = 1;
            gameScene.addChild(loadship);
            var loadsea = new Sprite(1536, 864);
            loadsea.x = 0;
            loadsea.y = 0;
            loadsea.image = core.assets["loadsea.png"];
            gameScene.addChild(loadsea);
            var loadgull = new Sprite(350, 250);
            loadgull.x = core.width;
            loadgull.y = 250;
            loadgull.image = core.assets["loadships.png"];
            loadgull.frame = 3;
            gameScene.addChild(loadgull);
            var loadfish = new Sprite(500, 100);
            loadfish.x = coreW;
            loadfish.y = rand(300) + 500;
            loadfish.image = core.assets["startfish.png"];
            gameScene.addChild(loadfish);
            var loadfish2 = new Sprite(500, 100);
            loadfish2.x = -500;
            loadfish2.y = rand(300) + 500;
            loadfish2.scaleX = -1;
            loadfish2.image = core.assets["startfish.png"];
            gameScene.addChild(loadfish2);
            var loadisland = new Sprite(1536, 864);
            loadisland.x = 0;
            loadisland.y = 0;
            loadisland.image = core.assets["loadisland.png"];
            gameScene.addChild(loadisland);
            var load = new Sprite(1536, 864);
            load.x = 0;
            load.y = 0;
            load.image = core.assets["load.png"];
            gameScene.addChild(load);
            var loadalphabet = new Label();
            loadalphabet.x = 515;
            loadalphabet.y = 190;
            loadalphabet.font = "bold 350px Arial";
            loadalphabet.color = "white";
            loadalphabet.width = 500;
            loadalphabet.textAlign = "center";
            gameScene.addChild(loadalphabet);
            var loadrobo = new Sprite(300, 270);
            loadrobo.x = 600;
            loadrobo.y = 600;
            loadrobo.image = core.assets["loadrobo.png"];
            gameScene.addChild(loadrobo);
            var loadhint = new Label();
            loadhint.x = 1030;
            loadhint.y = 365;
            loadhint.font = "50px HGP創英角ﾎﾟｯﾌﾟ体";
            loadhint.width = 500;
            loadhint.textAlign = "center";
            gameScene.addChild(loadhint);
            //問題番号表示
            var game = new Sprite(1536, 864);
            game.x = 0;
            game.y = 0;
            game.image = core.assets["game.png"];
            game.opacity = 0;
            game.frame = stagenumber;
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
            Japanese.opacity = 0;
            gameScene.addChild(Japanese);
            //英語（通常は表示しない）
            var English = new Label();
            English.width = 600;
            English.x = coreW - Japanese.width;
            English.y = 350;
            English.font = "90px Arial Black";
            English.textAlign = "center";
            English.opacity = 0;
            var mode1;
            if (mode == 0) {
                mode1 = 0;
                gameScene.addChild(English);
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
            greenButton.opacity = 0;
            gameScene.addChild(greenButton);
            var greenText = new Label();
            greenText.width = 500;
            greenText.font = "50px 'HGP創英角ｺﾞｼｯｸUB', Arial";
            greenText.x = 140;
            greenText.opacity = 0;
            gameScene.addChild(greenText);
            //黄色ボタン
            var yellowButton = new Sprite(200, 200);
            yellowButton.scaleX = 0.5;
            yellowButton.scaleY = 0.5;
            yellowButton.x = -30;
            yellowButton.y = 610;
            yellowButton.image = core.assets["button.png"];
            yellowButton.frame = 2;
            yellowButton.opacity = 0;
            gameScene.addChild(yellowButton);
            var yellowText = new Label();
            yellowText.width = 500;
            yellowText.font = "50px 'HGP創英角ｺﾞｼｯｸUB', Arial";
            yellowText.x = 140;
            yellowText.opacity = 0;
            gameScene.addChild(yellowText);
            var yellow2Button = new Sprite(200, 200);
            yellow2Button.scaleX = 0.5;
            yellow2Button.scaleY = 0.5;
            yellow2Button.x = -30;
            yellow2Button.y = 480;
            yellow2Button.image = core.assets["button.png"];
            yellow2Button.frame = 1;
            yellow2Button.opacity = 0;
            gameScene.addChild(yellow2Button);
            var yellow2Text = new Label();
            yellow2Text.width = 500;
            yellow2Text.font = "50px 'HGP創英角ｺﾞｼｯｸUB', Arial";
            yellow2Text.x = 140;
            yellow2Text.opacity = 0;
            gameScene.addChild(yellow2Text);
            //絵
            var picture = new Sprite(600, 600);
            picture.x = 390;
            picture.y = 40;
            picture.image = core.assets["eigo.png"];
            picture.opacity = 0;
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
            var writep;
            var color;
            var wl = 5;
            var needp = [];
            var moved = false;
            var initd = false;
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
                    displayedEnglish[index].opacity = 0;
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
                fpa = answerWord;
                fpst = stringCounter(fpa, "[");
                while (fpa.lastIndexOf("[") >= 0) {
                    fpa = fpa.slice(0, fpa.lastIndexOf("["));
                }
                fpa = fpa.slice(rstart, rstart + 5);
                alphabetPosition = rands2(fpa).join("");
                console.log(fpa);
                for (var index = 0; index < fpst; index++) {
                    alphabetPosition = alphabetPosition.concat("[");
                }
                moved = false;
                initd = false;
                game.opacity = 0;
                Japanese.opacity = 0;
                greenButton.opacity = 0;
                greenText.opacity = 0;
                yellowButton.opacity = 0;
                yellowText.opacity = 0;
                yellow2Button.opacity = 0;
                yellow2Text.opacity = 0;
                picture.opacity = 0;
                English.opacity = 0;
                color = (questionIndex - (tryAgain? 0:1)) % 3;
                game.frame = color;
                load.frame = color;
                writep = 0;
                needp = [0, 1, 2, 3, 4];
                wl = 5;
                var symbolalphabet = fpa.charAt(rand(fpa.length - 1));
                console.log(symbolalphabet);
                load.opacity = 1;
                loadrobo.opacity = 1;
                loadhint.opacity = 1;
                loadsea.opacity = 1;
                loadsky.opacity = 1;
                loadisland.opacity = 1;
                loadship.opacity = 1;
                loadwhale.opacity = 1;
                loadfish.opacity = 1;
                loadfish2.opacity = 1;
                loadgull.opacity = 1;
                whaleorship = rand(1);
                if (whaleorship == 1) {
                    loadwhale.tl.moveX(-loadwhale.width, 480).delay(479).moveX(coreW, 1).loop();
                    loadship.tl.delay(479).moveX(-loadship.width, 480).moveX(coreW, 1).loop();
                } else {
                    loadship.tl.moveX(-loadwhale.width, 480).delay(479).moveX(coreW, 1).loop();
                    loadwhale.tl.delay(479).moveX(-loadship.width, 480).moveX(coreW, 1).loop();
                }
                loadfish.tl.delay(rand(500)).moveX(-500, rand(300) + 120).then(function() {
                    loadfish.tl.moveTo(coreW, rand(300) + 500, 1);
                }).loop();
                loadfish2.tl.moveX(coreW, rand(300) + 120).then(function() {
                    loadfish2.tl.moveTo(-500, rand(300) + 500, 1);
                }).delay(rand(500)).loop();
                loadgull.tl
                .moveX(-loadgull.width, 120).and().moveY(0, 120, enchant.Easing.BACK_EASEIN)
                .delay(rand(120) + 48).moveX(-loadgull.width, 1).moveY(rand(300), 1)
                .moveX(coreW, 120).and().moveY(0, 120, enchant.Easing.BACK_EASEIN)
                .delay(rand(120) + 48).moveX(coreW, 1).moveY(rand(300), 1)
                .loop();
                loadalphabet.text = symbolalphabet;
                loadrobo.frame = rand(3) + color * 4;
                loadrobo.tl.moveY(100, 12, enchant.Easing.QUINT_EASEOUT).moveY(600, 12, enchant.Easing.QUINT_EASEOUT).loop();
                load.tl.delay(12).then(function () {
                    loadalphabet.opacity = 1;
                    this.frame += 3;
                }).delay(12).then(function () {
                    loadalphabet.opacity = 0;
                    this.frame -= 3;
                }).loop();
                loadhint.text = symbolalphabet + "がはいる<br>えいごだよ！";
                loadhint.tl.delay(96).then(function () {
                    this.y = 365;
                    this.text = hint[answer];
                    if (initd) {
                        gameinitok();
                    }
                }).delay(96).then(function () {
                    this.text = "なにが<br>でてくるかな？";
                    if (initd) {
                        gameinitok();
                    }
                }).delay(96).then(function () {
                    this.text = symbolalphabet + "がはいる<br>えいごだよ！";
                    if (initd) {
                        gameinitok();
                    }
                }).loop();
                remote.emit('emit_from_client', "w" + fp[0] +
                String.fromCharCode(alphabetPosition.charCodeAt(0) - 32 +
                32 * color));
            }
            function gameinitok() {
                moved = true;
                game.opacity = 1;
                load.opacity = 0;
                loadrobo.opacity = 0;
                loadhint.opacity = 0;
                loadsea.opacity = 0;
                loadsky.opacity = 0;
                loadisland.opacity = 0;
                loadship.opacity = 0;
                loadwhale.opacity = 0;
                loadfish.opacity = 0;
                loadfish2.opacity = 0;
                loadgull.opacity = 0;
                load.tl.clear();
                loadrobo.tl.clear();
                loadship.tl.clear();
                loadwhale.tl.clear();
                loadhint.tl.clear();
                loadfish.tl.clear();
                loadfish2.tl.clear();
                loadgull.tl.clear();
                loadwhale.x = coreW;
                loadship.x = coreW;
                loadgull.x = coreW;
                loadfish.x = coreW;
                loadfish2.x = -loadfish2.width;
                Japanese.opacity = 1;
                greenButton.opacity = 1;
                greenText.opacity = 1;
                yellowButton.opacity = 1;
                yellow2Button.opacity = 0.3;
                yellowText.opacity = 1;
                picture.opacity = 1;
                English.opacity = 1;
                for (var index = 0; index < answerWord.length; index++) {
                    displayedEnglish[index].opacity = 1;
                }
            }
            var answerInput, isCorrect;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                case "c":
                    if (moved) {
                        if (stageScene == 1) {
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
                    }
                    break;
                case "d":
                    break;
                case "e":
                    if (moved) {
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
                case "1":
                    // remote.emit('emit_from_client', writep.toString());
                    writep++;
                    if (writep < wl) {
                        remote.emit('emit_from_client', "w" + fp[needp[writep] % cubeLength] +
                        String.fromCharCode(alphabetPosition.charCodeAt(needp[writep] % cubeLength) - 32 + 32 * color));
                    } else {
                        writep = 0;
                        wl = needp.length;
                        // remote.emit('emit_from_client', "000");
                        remote.emit('emit_from_client', "w" + fp[needp[0] % cubeLength] +
                        String.fromCharCode(alphabetPosition.charCodeAt(needp[0] % cubeLength) - 32 + 32 * color));
                    }
                    break;
                case "2":
                    // remote.emit('emit_from_client', writep.toString());
                    writep++;
                    if (writep < wl) {
                        remote.emit('emit_from_client', "w" + fp[needp[writep] % cubeLength] +
                        String.fromCharCode(alphabetPosition.charCodeAt(needp[writep] % cubeLength) - 32 + 32 * color));
                    } else {
                        writep = 0;
                        wl = needp.length;
                        // remote.emit('emit_from_client', "000");
                        remote.emit('emit_from_client', "w" + fp[needp[0] % cubeLength] +
                        String.fromCharCode(alphabetPosition.charCodeAt(needp[0] % cubeLength) - 32 + 32 * color));
                    }
                    break;
                case "=":
                    needp.splice(writep, 1);
                    wl--;
                    // remote.emit('emit_from_client', JSON.stringify(needp));
                    // remote.emit('emit_from_client', writep.toString());
                    if (writep < wl) {
                        remote.emit('emit_from_client', "w" + fp[needp[writep] % cubeLength] +
                        String.fromCharCode(alphabetPosition.charCodeAt(needp[writep] % cubeLength) - 32 + 32 * color));
                    } else {
                        if (needp.length == 0) {
                            initd = true;
                        } else {
                            writep = 0;
                            wl = needp.length;
                            remote.emit('emit_from_client', "w" + fp[needp[0] % cubeLength] +
                            String.fromCharCode(alphabetPosition.charCodeAt(needp[0] % cubeLength) - 32 + 32 * color));
                        }
                    }
                    break;
                default:
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
                            yellowText.opacity = 1;
                            if (isCorrect) {
                                marubatu.frame = 0;
                                marubatu.opacity = 0.5;
                                stageScene = 1;
                                yellow2Text.opacity = 1;
                                yellow2Button.opacity = 1;
                                yellow2Text.y = yellow2Button.y + 65;
                                yellow2Text.text = addStroke("もういちど");
                                yellowText.y = yellowButton.y + 40;
                                yellowText.text = addStroke("つぎに<br>すすむ");
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