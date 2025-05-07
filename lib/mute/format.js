"use strict";
var Format;
(function (Format) {
    window.addEventListener("load", init);
    let textInput;
    let displayParagraph;
    function init(_event) {
        var _a;
        displayParagraph = document.querySelector("#display");
        textInput = document.querySelector("#textInput");
        if (!textInput) {
            textInput = document.querySelector("#textInput");
        }
        textInput.addEventListener("input", onInputText);
        (_a = document.querySelector("#widthInput")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", onInputWidth);
        document.querySelector("#copy").onclick = onCopy;
        displayParagraph.style.width = document.querySelector("#widthInput").value + "px";
        const observer = new MutationObserver((element) => {
            var _a;
            let hasContent = ((_a = element[0]) === null || _a === void 0 ? void 0 : _a.target.textContent) != "";
            document.querySelector("#copy").toggleAttribute("disabled", !hasContent);
            document.querySelector("#generate").toggleAttribute("disabled", !hasContent);
        });
        observer.observe(displayParagraph, {
            subtree: true,
            childList: true,
        });
        var button = document.querySelector("#generate");
        button.addEventListener("click", function handleClick(event) {
            try {
            }
            catch (error) {
                console.warn(error);
            }
            document.querySelector("#output").innerHTML = concatArray(Array.from(extractLinesFromTextNode(displayParagraph.firstChild)));
        });
    }
    function onCopy() {
        navigator.clipboard.writeText(document.querySelector("#output").innerText);
    }
    function concatArray(_input) {
        let output = "";
        _input.forEach(element => { output = output.concat(element + "<br />"); });
        return output;
    }
    function onInputText(ev) {
        displayParagraph.textContent = textInput.value + "";
    }
    function onInputWidth(ev) {
        console.log("input width");
        displayParagraph.style.width = this.value + "px";
    }
    function extractLinesFromTextNode(_input) {
        if (_input.nodeType !== 3) {
            throw (new Error("Lines can only be extracted from text nodes."));
        }
        _input.textContent = collapseWhiteSpace(_input.textContent || " ") || " ";
        var textContent = _input.textContent;
        var range = document.createRange();
        var lines = [];
        var lineCharacters = [];
        for (var i = 0; i < textContent.length; i++) {
            range.setStart(_input, 0);
            range.setEnd(_input, (i + 1));
            var lineIndex = (range.getClientRects().length - 1);
            if (!lines[lineIndex]) {
                lines.push(lineCharacters = []);
            }
            lineCharacters.push(textContent.charAt(i));
        }
        lines = lines.map(function operator(characters) {
            return (collapseWhiteSpace(characters.join("")));
        });
        return (lines);
    }
    function collapseWhiteSpace(value) {
        return (value === null || value === void 0 ? void 0 : value.trim().replace(/\s+/g, " "));
    }
})(Format || (Format = {}));
//# sourceMappingURL=format.js.map