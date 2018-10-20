enchant();
var remote = io.connect('http://localhost:4740');
var fp = ["12", "13", "10", "11"];
window.onload = function () {
    console.log('Initialized');
    console.log('hello ' + enchant.ENV.BROWSER);
    console.log('enchantjsのバージョン：' + enchant.ENV.VERSION);
    var core = new Core(1536, 864);
    core.fps = 24;
    core.preload("marubatu.png", "eigo.png", "abc.png", "erobo.png", "button.png");
    var soundl = function (audioname, type) {
        return enchant.DOMSound.load(audioname + "." + type, "audio/" + type, function(){}, function(){});
    },
    hatsuon = [
        soundl("cat", "mp3"), soundl("dog", "mp3"), soundl("fish", "mp3"), soundl("star", "mp3"),
        soundl("bear", "mp3"), soundl("bird", "mp3"), soundl("frog", "mp3"), soundl("pig", "mp3"),
        soundl("ant", "mp3"), soundl("lion", "mp3"), soundl("ship", "mp3"), soundl("fox", "mp3"),
        soundl("bus", "mp3"), soundl("car", "mp3"), soundl("cake", "mp3"), soundl("desk", "mp3"),
    ];
    core.onload = function () {
        var ss = new Scene();
        var gs = new Scene();
        var cs = new DOMScene();
        var q = new Label();
        var a = new Label();
        var moji = new Label();
        var gb = new Label();
        var yb = new Label();
        var marubatu = new Sprite(500, 500);
        var im = new Sprite(600, 600);
        var sbtn = new Sprite(200, 200);
        var ybtn = new Sprite(200, 200);
        var gbtn = new Sprite(200, 200);
        var waku = [new Sprite(140, 180), new Sprite(140, 180), new Sprite(140, 180), new Sprite(140, 180)];
        var srobo = [new Sprite(200, 200), new Sprite(200, 200), new Sprite(200, 200)];
        var crobo = [new Sprite(200, 200), new Sprite(200, 200)];
        var cl = new Label();
        var resl = new Label();
        var titl = new Label();
        var stitl = new Label();
        srobo[0].scale(2, 2);
        srobo[1].scale(2, 2);
        srobo[2].scale(2, 2);
        crobo[0].scale(2, 2);
        crobo[1].scale(2, 2);
        sbtn.scale(0.5, 0.5);
        ybtn.scale(0.5, 0.5);
        gbtn.scale(0.5, 0.5);
        function starts() {
            titl.width = 1500;
            stitl.width = 1000;
            titl.x = (core.width - titl.width) / 2;
            titl.y = 100;
            titl.font = "bold 100px 'メイリオ'";
            titl.text = "Let'sえいごパズル！";
            titl.textAlign = "center";
            stitl.x = (core.width - stitl.width) / 2;
            stitl.y = 300;
            stitl.font = "55px 'メイリオ'";
            stitl.text = "   ボタンをおしてスタート";
            stitl.textAlign = "center";
            srobo[0].x = 300;
            srobo[1].x = (core.width - srobo[1].width) / 2;
            srobo[2].x = core.width - srobo[2].width - 300;
            srobo[0].y = 1000;
            srobo[1].y = 1000;
            srobo[2].y = 1000;
            srobo[0].image = core.assets["erobo.png"];
            srobo[1].image = core.assets["erobo.png"];
            srobo[2].image = core.assets["erobo.png"];
            srobo[0].frame = 1;
            srobo[1].frame = 5;
            srobo[2].frame = 2;
            sbtn.x = stitl.x + 50;
            sbtn.y = stitl.y + stitl.height / 2 - sbtn.height / 3;
            sbtn.image = core.assets["button.png"];
            sbtn.frame = 0;
            ss.addChild(titl);
            ss.addChild(stitl);
            ss.addChild(srobo[0]);
            ss.addChild(srobo[1]);
            ss.addChild(srobo[2]);
            ss.addChild(sbtn);
            srobo[0].tl.moveY(500, 16, enchant.Easing.BACK_EASEOUT);
            srobo[1].tl.moveY(500, 20, enchant.Easing.BACK_EASEOUT);
            srobo[2].tl.moveY(500, 24, enchant.Easing.BACK_EASEOUT);
            var an = false;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "c":
                        if (!an) {
                            an = true;
                            games();
                        }
                    break;
                }
            });
            ss.backgroundColor = "lightcyan";
            core.replaceScene(ss);
        }
        function games() {
            var ja = ["ねこ", "いぬ", "さかな", "ほし", "くま", "とり", "かえる", "ぶた", "あり", "らいおん", "ふね", "きつね", "バス", "くるま", "ケーキ", "つくえ"];
            var en = ["CAT[", "DOG[", "FISH", "STAR", "BEAR", "BIRD", "FROG", "PIG[", "ANT[", "LION", "SHIP", "FOX[", "BUS[", "CAR[", "CAKE", "DESK"];
            // var ja = ["らいおん"];
            // var en = ["LION"];
            var ans;
            var l = 0;
            var dt = "";
            var qn = 1;
            var sc = 0;
            var correct = 0;
            var mb1 = ["", "", "", "", ""];
            var mb2 = [false, false, false, false, false];
            var ques;
            moji.x = 20;
            moji.y = 100;
            moji.font = "80px 'メイリオ', Arial";
            moji.width = 1000;
            marubatu.image = core.assets["marubatu.png"];
            marubatu.x = core.width / 2 - marubatu.width / 2 - 100;
            marubatu.y = 50;
            marubatu.opacity = .5;
            q.width = 600;
            q.x = core.width - q.width;
            q.y = 200;
            q.font = "140px 'メイリオ', Arial";
            q.textAlign = "center";
            gbtn.x = -30;
            gbtn.y = 250;
            gbtn.image = core.assets["button.png"];
            gbtn.frame = 1;
            gb.width = 500;
            gb.font = "50px 'メイリオ', Arial";
            gb.x = 140;
            ybtn.x = -30;
            ybtn.y = 380;
            ybtn.image = core.assets["button.png"];
            ybtn.frame = 0;
            yb.width = 500;
            yb.font = "50px 'メイリオ', Arial";
            yb.x = 140;
            a.x = 100;
            a.y = 400;
            a.font = "150px Arial";
            a.width = 1000;
            im.x = core.width / 2 - im.width / 2 - 100;
            im.y = 0;
            im.image = core.assets["eigo.png"];
            waku[0].x = core.width / 2 - waku[0].width * 2 - 60;
            waku[0].y = 600;
            waku[0].image = core.assets["abc.png"];
            waku[1].x = core.width / 2 - waku[1].width - 30;
            waku[1].y = 600;
            waku[1].image = core.assets["abc.png"];
            waku[2].x = core.width / 2;
            waku[2].y = 600;
            waku[2].image = core.assets["abc.png"];
            waku[3].x = core.width / 2 + waku[3].width + 30;
            waku[3].y = 600;
            waku[3].image = core.assets["abc.png"];
            gs.addChild(q);
            // gs.addChild(a);
            gs.addChild(moji);
            gs.addChild(gb);
            gs.addChild(yb);
            gs.addChild(im);
            gs.addChild(gbtn);
            gs.addChild(ybtn);
            gs.addChild(waku[0]);
            gs.addChild(waku[1]);
            gs.addChild(waku[2]);
            gs.addChild(waku[3]);
            var aid = 0;
            var aen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            var anss = rands(aen);
            function question() {
                gs.removeChild(marubatu);
                var answer = anss[qn - 1];
                // var answer = Math.floor(Math.random() * ja.length);
                // var answer = 9;
                aid = answer;
                q.text = ja[answer];
                // q.text = answer;
                ans = en[answer];
                a.text = ans.replace("[", "☆");
                waku[0].frame = 27;
                waku[1].frame = 27;
                waku[2].frame = 27;
                waku[3].frame = 27;
                if (ans.search(/\[/) >= 0) {
                    waku[ans.search(/\[/)].frame = 26;
                }
                im.frame = answer;
                moji.text = "もんだい" + qn;
                // gb.y = gbtn.y + 40;
                gb.y = gbtn.y + 65;
                // gb.text = "はつおんを<br>きく";
                gb.text = "やりなおし";
                yb.y = ybtn.y + 40;
                // yb.y = ybtn.y + 65;
                // yb.text = "つぎに<br>すすむ";
                yb.text = "こたえ<br>あわせ";
                var ps = [0, 0, 0, 0];
                ps[0] = fp[0];
                ps[1] = fp[1];
                ps[2] = fp[2];
                ps[3] = fp[3];
                ques = rands(ps);
                remote.emit('emit_from_client', "w" + ques[0] + ans.charAt(0));
                remote.emit('emit_from_client', "w" + ques[1] + ans.charAt(1));
                remote.emit('emit_from_client', "w" + ques[2] + ans.charAt(2));
                remote.emit('emit_from_client', "w" + ques[3] + ans.charAt(3));
                remote.emit('emit_from_client', "w" + ques[0] + ans.charAt(0));
                remote.emit('emit_from_client', "w" + ques[1] + ans.charAt(1));
                remote.emit('emit_from_client', "w" + ques[2] + ans.charAt(2));
                remote.emit('emit_from_client', "w" + ques[3] + ans.charAt(3));
            }
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "a":
                        if (sc == 0) {
                            remote.emit('emit_from_client', "w" + ques[0] + ans.charAt(0));
                            remote.emit('emit_from_client', "w" + ques[1] + ans.charAt(1));
                            remote.emit('emit_from_client', "w" + ques[2] + ans.charAt(2));
                            remote.emit('emit_from_client', "w" + ques[3] + ans.charAt(3));
                            remote.emit('emit_from_client', "w" + ques[0] + ans.charAt(0));
                            remote.emit('emit_from_client', "w" + ques[1] + ans.charAt(1));
                            remote.emit('emit_from_client', "w" + ques[2] + ans.charAt(2));
                            remote.emit('emit_from_client', "w" + ques[3] + ans.charAt(3));
                        } else if (sc == 1) {
                            hatsuon[aid].play();
                        }
                        break;
                    case "b":
                        break;
                    case "c":
                        if (sc == 0) {
                            remote.emit('emit_from_client', "r" + fp[0]);
                            waku[0].tl.delay(3).then(function () {
                                this.frame = rand(25);
                            }).loop();
                            waku[1].tl.delay(3).then(function () {
                                this.frame = rand(25);
                            }).loop();
                            waku[2].tl.delay(3).then(function () {
                                this.frame = rand(25);
                            }).loop();
                            waku[3].tl.delay(3).then(function () {
                                this.frame = rand(25);
                            }).loop();
                        }
                        if (sc == 1) {
                            qn++;
                            if (qn == 6) {
                                sc = 2;
                                clears(correct, mb1, mb2);
                            } else {
                                sc = 0;
                                question();
                                l = 0;
                                dt = "";
                            }
                        }
                        break;
                    case "d":
                        break;
                    case "0":
                        moji.tl.delay(12).then(function () {
                            remote.emit('emit_from_client', "r" + fp[l]);
                        });
                        break;
                    default:
                        if (data != "a" && data != "b" && data != "c" && data != "d") {
                            dt = dt.concat(data);
                            l++;
                            if (l == 4) {
                                l = 0;
                                if (dt.indexOf(ans.charAt(0)) != -1 && dt.indexOf(ans.charAt(1)) != -1 && dt.indexOf(ans.charAt(2)) != -1 && dt.indexOf(ans.charAt(3)) != -1) {
                                    // moji.text = dt.replace("[", "☆");
                                    waku[0].tl.clear();
                                    waku[1].tl.clear();
                                    waku[2].tl.clear();
                                    waku[3].tl.clear();
                                    waku[0].frame = ans.charCodeAt(0) - 65;
                                    waku[1].frame = ans.charCodeAt(1) - 65;
                                    waku[2].frame = ans.charCodeAt(2) - 65;
                                    waku[3].frame = ans.charCodeAt(3) - 65;
                                    mb1[qn - 1] = ans;
                                    if (dt == ans) {
                                        marubatu.frame = 0;
                                        gs.addChild(marubatu);
                                        mb2[qn - 1] = true;
                                        correct++;
                                    } else {
                                        marubatu.frame = 1;
                                        gs.addChild(marubatu);
                                    }
                                    sc = 1;
                                    gb.y = gbtn.y + 40;
                                    // gb.y = gbtn.y + 65;
                                    gb.text = "はつおんを<br>きく";
                                    // gb.text = "やりなおし";
                                    yb.y = ybtn.y + 40;
                                    // yb.y = ybtn.y + 65;
                                    yb.text = "つぎに<br>すすむ";
                                    // yb.text = "こたえ<br>あわせ";
                                    hatsuon[aid].play();
                                } else {
                                    dt = "";
                                    moji.tl.delay(12).then(function () {
                                        remote.emit('emit_from_client', "r" + fp[0]);
                                    });
                                }
                            } else {
                                remote.emit('emit_from_client', "r" + fp[l]);
                            }
                        }
                        break;
                }
            });
            gs.backgroundColor = "lightyellow";
            core.replaceScene(gs);
            question();
        }
        function clears(cor, res1, res2) {
            resl.width = 1000;
            resl.x = 150;
            resl.y = -50;
            resl.font = "80px Arial";
            resl.color = "navy";
            resl.text = "<ol>";
            for (var m = 0; m < res1.length; m++) {
                resl.text += "<li style='margin-bottom:-20px'>";
                if (res2[m]) {
                    resl.text += "◯ ";
                } else {
                    resl.text += "✕ ";
                }
                resl.text += res1[m].replace("[", "");
                resl.text += "</li>";
            }
            resl.text += "</ol>";
            cl.width = 1500;
            cl.x = 200;
            cl.y = 600;
            cl.font = "60px Arial";
            cl.text = "5もんちゅう<span style='font-weight:bold;'>" + cor + "</span>もんせいかいだよ！<br/>";
            if (cor == 5) {
                cl.text += "おめでとう！";
            } else {
                cl.text += "ぜんもんせいかいめざして、がんばろう！";
            }
            crobo[0].x = 700;
            crobo[0].y = 200;
            crobo[0].image = core.assets["erobo.png"];
            crobo[0].frame = 4;
            crobo[1].x = 1100;
            crobo[1].y = 200;
            crobo[1].image = core.assets["erobo.png"];
            crobo[1].frame = 3;
            crobo[0].tl.rotateTo(15, 8).delay(4).rotateTo(-15, 8).delay(4).loop();
            crobo[1].tl.rotateTo(-15, 8).delay(4).rotateTo(15, 8).delay(4).loop();
            cs.addChild(resl);
            cs.addChild(cl);
            cs.addChild(crobo[0]);
            cs.addChild(crobo[1]);
            var an = true;
            remote.on("emit_from_server", function (data) {
                switch (data) {
                    case "c":
                        if (an) {
                            location.reload();
                        }
                    break;
                }
            });
            cs.backgroundColor = "aliceblue";
            core.replaceScene(cs);
        }
        starts();
        // clears(3, ["a", "b", "c", "LION", "d"], [false, false, true, true, false]);
    };
    core.start();
};

function rand(n) {
	return Math.floor(Math.random() * (n + 1));
}

function rands(a) {
    var s = a;
    for(var i = a.length - 1; i > 0; i--){
        var r = rand(i);
        var tmp = s[i];
        s[i] = s[r];
        s[r] = tmp;
	}
    return s;
}