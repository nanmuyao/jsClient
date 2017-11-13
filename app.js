mySocket = null;

require("src/net.js");

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
//        this.sprite = new cc.Sprite(res.HelloWorld_png);
//        this.sprite.attr({
//            x: size.width / 2,
//            y: size.height / 2
//        });
//        this.addChild(this.sprite, 0);
        // initNet();
//        initUI();

//         Create the button
        button = new ccui.Button(res.HelloWorld_png, res.HelloWorld_png);
        button.setPosition(size.width / 2, size.height/2 - 20);
                                      index = 0;

        createWebSocket("ws://192.168.0.101:8888/");

        button.addClickEventListener(
        function ()
        {
            // var sendMsgInteval = function()
            // {
            //     cc.log("===================sendMsgInteval", index);
            //     // send msg to server
            //     if(mySocket){
            //         mySocket.send("Hello WebSocket, I'm a text message." + index);
            //     }
            //     index = index + 1;
            //     if (index == 5)
            //     {
            //         cc.log("================= 关闭socket");
            //         clearInterval();
            //         mySocket.close();
            //     }
            // }
            // setInterval(sendMsgInteval, 1000);

            ws = getWSInstance();
            ws.send("Hello WebSocket, I'm a text message." + 99);
        });

        button.setVisible(true);
        button.setName("button");
        this.addChild(button,100);
        return true;
    }
});

var initNet = function()
{
    cc.log("111111111");
    this._wsiSendText = new WebSocket("ws://192.168.0.101:8888/");
    this._wsiSendText.onopen = function(evt) {
        cc.log("链接成功了");
    };

    this._wsiSendText.onmessage = function(evt) {
        var textStr = "response text msg: "+evt.data;
        cc.log(textStr);

    };

    this._wsiSendText.onerror = function(evt) {
        cc.log("_wsiSendText Error was fired");
        if (cc.sys.isObjectValid(this)) {

        } else {
            cc.log("WebSocket test layer was destroyed!");
        }
    };

    this._wsiSendText.onclose = function(evt) {
        cc.log("_wsiSendText websocket instance closed.");
        this._wsiSendText = null;
    };

    mySocket = this._wsiSendText;

}

var initUI = function()
{
    // Create the button
    this.button = new ccui.Button("ccs-res/cocosui/animationbuttonnormal.png", "ccs-res/cocosui/animationbuttonpressed.png");
    this.button.setPosition(100, 100);
    this.button.setPressedActionEnabled(true);
    this.button.addClickEventListener(function () {
                                 cc.log("Button clicked, position = (" + button.x + ", " + button.y + ")");
                                 });
    this.button.setName("button");
    this.addChild(this.button,0);
    this.button.setZoomScale(-0.5);
}

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
