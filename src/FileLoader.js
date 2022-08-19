import Fetch from './Fetch';

class FileLoader {

    #options = {

        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    }

    #feth = null;

    constructor () {

        this.#feth = new Fetch();

    }

    setOptions ( options ) {

        this.#options = Object.assign(this.#options, options);

    }

    async stringBlob ( url, options ) {

        const opts = Object.assign(this.#options, options);

        const response = await this.#feth.get( url, opts );
        const str = (await response.text()).toString();

        return str;

    }

    async xml ( url, options ) {

        const str = await this.stringBlob(url, options);
        const xml = await new DOMParser().parseFromString(str, "text/xml");

        return xml

    }

    async json ( url, options ) {

        const str = await this.stringBlob(url, options);
        const json = JSON.parse(str);

        return json;

    }

}

export default FileLoader