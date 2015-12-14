var Whatever;
(function (Whatever) {
    var Services;
    (function (Services) {
        var Api = (function () {
            function Api() {
            }
            Api.prototype.callSomeService = function () {
                alert("meoooow...");
            };
            return Api;
        })();
        Services.Api = Api;
    })(Services = Whatever.Services || (Whatever.Services = {}));
})(Whatever || (Whatever = {}));
