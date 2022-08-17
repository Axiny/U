import Type from "./Type"

class FullScreen {

    #static = false;
    #target = null;

    constructor ( target ) {

        if (Type.isHTMLElement(target)) {

            this.#target = target;

        }

    }

    open () {

        this.#target.requsetFullScreen();
        this.#static = true;

    }

    close () {

        document.exitFullscreen();
        this.#static = false;

    }

    toggle () {

        this.#static ? this.close() : this.open();

    }

}

export default FullScreen;