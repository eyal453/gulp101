var Whatever;
(function (Whatever) {
    var Services;
    (function (Services) {
        var Woot = (function () {
            function Woot() {
            }
            Woot.prototype.wootWoot = function () {
                alert("woot woot!!");
            };
            return Woot;
        })();
        Services.Woot = Woot;
    })(Services = Whatever.Services || (Whatever.Services = {}));
})(Whatever || (Whatever = {}));
