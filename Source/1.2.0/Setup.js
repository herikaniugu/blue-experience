function Setup() {
    // CLEAR
    Clear();
    // SETUP
    if (Engine.VERSION > "1.0") {
        // UPDATE
        Preload(["Engine.js?version=1.0"]).script();
    } else if (App.VERSION == "1.2.0") {
        // DRAW
        App.draw = Draw().create(Width(), Height()).full().add();
        // BRIDGE
        Script().preload(Resources(Path(["Source", App.VERSION, "Bridge"]), "bridge").files(["Load", "Menu", "About", "Value", "Main"])).response(function(total, count) {
            if (count == 1) App.draw.open(App.source.load); App.draw.progress = count / total;
        });
        // AD
        App.draw.ad = { count: 0, active: false, preload: new Function(), publish: new Function(), click: new Function(), close: new Function(), display: new Function() };
        if ("Android" in window) {
            App.draw.ad.publish = function() { if (Android.publish) Android.publish(); };
        } else if (navigator.userAgent.toLowerCase().indexOf("kaios") >= 0) {
            Preload(Resources(Path(["Source", App.VERSION, "Library"]), "js").files([["kaiads", "v4", "min"].join(".")])).script(function() {
                if (window.getKaiAd) {
                    App.draw.ad.preload = function() {
                        console.log("Ad preparing...");
                        getKaiAd({
                            publisher: "3f32437a-1031-418c-aefc-9453e698e584",
                            app: App.NAME,
                            test: App.DEBUG ? 1 : 0,
                            onerror: function(error) { App.draw.ad.error = error; },
                            onready: function(ad) {
                                App.draw.ad.error = 0;
                                App.draw.ad.active = true;
                                App.draw.ad.publish = function() {
                                    if (App.draw.ad.active) ad.call("display");
                                        else App.draw.ad.preload();
                                };
                                ad.on("click", function() { App.draw.ad.click(); });
                                ad.on("display", function() { App.draw.ad.display(); });
                                ad.on("close", function() { App.draw.ad.active = false; App.draw.ad.close(); });
                            }
                        });
                    };
                    App.draw.ad.preload();
                }
            });
        }
    }
}