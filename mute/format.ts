namespace Format {

    window.addEventListener("load", init);


    let textInput: HTMLInputElement;
    let displayParagraph: HTMLParagraphElement;

    function init(_event: Event): void {

        displayParagraph = <HTMLParagraphElement>document.querySelector("#display");

        textInput = <HTMLInputElement>document.querySelector("#textInput");

        if (!textInput) {
            textInput = <HTMLInputElement>document.querySelector("#textInput");
        }

        textInput.addEventListener("input", onInputText);

        document.querySelector("#widthInput")?.addEventListener("input", onInputWidth);

        (<HTMLButtonElement>document.querySelector("#copy")).onclick = onCopy;

        displayParagraph.style.width = (<HTMLInputElement>document.querySelector("#widthInput")).value + "px";

        const observer = new MutationObserver((element) => {
            let hasContent: boolean = element[0]?.target.textContent != "";

            (<HTMLButtonElement>document.querySelector("#copy")).toggleAttribute("disabled", !hasContent);
            (<HTMLButtonElement>document.querySelector("#generate")).toggleAttribute("disabled", !hasContent);
        });

        // call `observe()`, passing it the element to observe, and the options object
        observer.observe(displayParagraph, {
            subtree: true,
            childList: true,
        });

        var button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#generate");


        button.addEventListener(
            "click",
            function handleClick(event) {
                //(<HTMLAudioElement>document.querySelector("audio")).play();
                try {
                    //(<HTMLAudioElement>document.querySelector("audio")).play();
                } catch (error) {
                    console.warn(error);
                }

                //console.log(concatArray(<string[]>Array.from(extractLinesFromTextNode(displayParagraph.firstChild))));
                (<HTMLDivElement>document.querySelector("#output")).innerHTML = concatArray(<string[]>Array.from(extractLinesFromTextNode(displayParagraph.firstChild)));
            }
        );
    }

    function onCopy() {
        navigator.clipboard.writeText((<HTMLDivElement>document.querySelector("#output")).innerText);
    }

    function concatArray(_input: string[]): string {
        let output: string = "";

        _input.forEach(element => { output = output.concat(element + "<br />") });

        return output;
    }


    function onInputText(this: HTMLInputElement, ev: Event) {
        displayParagraph.textContent = textInput.value + "";
    }


    function onInputWidth(this: HTMLInputElement, ev: Event) {
        console.log("input width");
        displayParagraph.style.width = this.value + "px";
    }


    function extractLinesFromTextNode(_input: HTMLElement) {

        if (_input.nodeType !== 3) {

            throw (new Error("Lines can only be extracted from text nodes."));

        }

        // BECAUSE SAFARI: None of the "modern" browsers seem to care about the actual
        // layout of the underlying markup. However, Safari seems to create range
        // rectangles based on the physical structure of the markup (even when it
        // makes no difference in the rendering of the text). As such, let's rewrite
        // the text content of the node to REMOVE SUPERFLUOS WHITE-SPACE. This will
        // allow Safari's .getClientRects() to work like the other modern browsers.
        _input.textContent = collapseWhiteSpace(_input.textContent || " ") || " ";

        // A Range represents a fragment of the document which contains nodes and
        // parts of text nodes. One thing that's really cool about a Range is that we
        // can access the bounding boxes that contain the contents of the Range. By
        // incrementally adding characters - from our text node - into the range, and
        // then looking at the Range's client rectangles, we can determine which
        // characters belong in which rendered line.
        var textContent = _input.textContent;
        var range = document.createRange();
        var lines = [];
        var lineCharacters = [];

        // Iterate over every character in the text node.
        for (var i = 0; i < textContent.length; i++) {

            // Set the range to span from the beginning of the text node up to and
            // including the current character (offset).
            range.setStart(_input, 0);
            range.setEnd(_input, (i + 1));

            // At this point, the Range's client rectangles will include a rectangle
            // for each visually-rendered line of text. Which means, the last
            // character in our Range (the current character in our for-loop) will be
            // the last character in the last line of text (in our Range). As such, we
            // can use the current rectangle count to determine the line of text.
            var lineIndex = (range.getClientRects().length - 1);

            // If this is the first character in this line, create a new buffer for
            // this line.
            if (!lines[lineIndex]) {

                lines.push(lineCharacters = []);

            }

            // Add this character to the currently pending line of text.
            lineCharacters.push(textContent.charAt(i));

        }

        // At this point, we have an array (lines) of arrays (characters). Let's
        // collapse the character buffers down into a single text value.
        lines = lines.map(
            function operator(characters) {

                return (collapseWhiteSpace(characters.join("")));

            }
        );

        // DEBUGGING: Draw boxes around our client rectangles.
        //drawRectBoxes(range.getClientRects());

        return (lines);

    }


    /**
    * I normalize the white-space in the given value such that the amount of white-
    * space matches the rendered white-space (browsers collapse strings of white-space
    * down to single space character, visually, and this is just updating the text to
    * match that behavior).
    */
    function collapseWhiteSpace(value?: string) {

        return (value?.trim().replace(/\s+/g, " "));

    }
}

