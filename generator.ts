namespace Generator {
    window.addEventListener("load", init);


    let vocab: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"/*.,/!§$%&/()="*/;
    let length: number = 18 * 2 * 2;
    let amountPasswords: number = 50;

    function init(_event: Event): void {


        for (let index: number = 0; index < amountPasswords; index++) {
            generate();
        }

    }


    function generate(): void {
        let output: string = "";

        for (let index: number = 0; index < length; index++) {
            output += vocab[Math.floor(Math.random() * vocab.length)];
        }

        console.log(output)
    }
}