# LET'Sえいごパズル!

## 内容

1. `game`フォルダ
	- サーバーの`server3.js`とゲーム部分の`mainC3.js`があり、ゲームに使う画像や音が入っています。
2. `puzzle`フォルダ
    - パズル台のプログラム`infrared31.ino`が入っています。
3. `cube`フォルダ
    - パズル台のプログラム`epuzzle_129.ino`と、メモリ書き込み用の`abcwrite_beta.ino`が入っています。
4. `boarddefs.h`
    - [Arduino-IRremote](https://github.com/z3t0/Arduino-IRremote)ライブラリのなかの`boarddefs.h`を改造して、10番ピンを使えるようにしたものです。

## 準備

1. Google Chromeをインストール
2. ArduinoIDEをインストール
    - [Arduino-IRremote](https://github.com/z3t0/Arduino-IRremote)をインストール
    - [SoftI2CMaster](https://github.com/felias-fogg/SoftI2CMaster)をインストール
    - [MCUFRIEND_kbv](https://github.com/prenticedavid/MCUFRIEND_kbv)をインストール
    - [Adafruit-MCP23017](https://github.com/adafruit/Adafruit-MCP23017-Arduino-Library)をインストール
    - `Arduino-IRremote`の中の`boarddefs.h`をフォルダ内の`boarddefs.h`に置き換える
3. node.jsをインストール
4. `npm install`コマンドで必要なライブラリを`game`内にインストール
5. enchant.jsを公式サイトからダウンロードして、`enchant.js`ファイルを`game`フォルダに入れる
6. `puzzle`フォルダ内の`infrared32`をパズル台に入れる
7. `cube`フォルダ内の`epuzzle_133`をキューブに入れる（メモリにデータが書き込まれている前提）

## 実行方法

1. ターミナルを立ち上げて、`game`フォルダの中の`server3.js`を`node`で実行
2. Google Chromeで [http://localhost:4740/](http://localhost:4740/) を開く

## 動作環境

|   ソフトウェア  |  バージョン  |
|:--------------|:---------------|
| Google Chrome | v69.0.3497.100 |
| ArduinoIDE    | v1.8.5         |
| node.js       | v9.4.0         |
| enchant.js    | v0.8.3         |

## 素材URL

- 音声はProject Shtookaのものを使わせていただきました。　[Shtooka](http://swac-collections.org/download.php)
- 画像はイラストレインのものを使わせていただきました。　[イラストレイン](https://illustrain.com/)
- 音楽の卵　フリー音楽素材　BGMに使用しました。　[音楽の卵](http://ontama-m.com/ongaku_kawaii.html)

##補足説明資料

- [補足説明](https://github.com/shotaro27/LetsEigoPuzzle/blob/master/letseigo.pdf)
- [ノート](https://github.com/shotaro27/LetsEigoPuzzle/blob/master/eigonote.pdf)

##URL

- [ver.4](https://youtu.be/NaKyxNWOZd4)
- [ver.4.1](https://youtu.be/6gHKgkAUkWE)