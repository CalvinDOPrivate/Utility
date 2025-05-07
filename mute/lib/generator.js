"use strict";
var Generator;
(function (Generator) {
    window.addEventListener("load", init);
    let vocab = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let length = 18 * 2 * 2;
    let amountPasswords = 50;
    function init(_event) {
        for (let index = 0; index < amountPasswords; index++) {
            generate();
        }
    }
    function generate() {
        let output = "";
        for (let index = 0; index < length; index++) {
            output += vocab[Math.floor(Math.random() * vocab.length)];
        }
        console.log(output);
    }
})(Generator || (Generator = {}));
//# sourceMappingURL=generator.js.map