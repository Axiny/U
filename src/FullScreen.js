class FullScreen {

    #static = false;
    #target = null;

    constructor ( target ) {

        target = target || document.getElementsByTagName('body')[0];

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