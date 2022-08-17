class Type {

    static get ( p ) {

        const type = Object.prototype.toString.call(p);
        
        return type.slice(8, type.length - 1);

    }

    static isObject ( p ) {

        return Type.get(p) === 'Object';

    }

    static isArray ( p ) {

        return Type.get(p) === 'Array';

    }

    static isString ( p ) {

        return Type.get(p) === 'String';

    }

    static isDate ( p ) {

        return Type.get(p) === 'Date';

    }

    static isFunction ( p ) {

        return Type.get(p) === 'Function';

    }

    static isNumber ( p ) {

        return Type.get(p) === 'Number';

    }

    static isBoolean ( p ) {

        return Type.get(p) === 'Boolean';
        
    }

    static isJSON ( p ) {

        return Type.get(p) === 'JSON'

    }

    static isUndefined ( p ) {

        return Type.get(p) === 'Undefined'

    }

    static isNull ( p ) {

        return Type.get(p) === 'Null';

    }

}

// restful api
// see https://en.wikipedia.org/wiki/Representational_state_transfer
const REST_API = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
    HEAD: 'HEAD',
    TRACE: 'TRACE',
    CONNECT: 'CONNECT',
};

/**
 * Fetch
 * 
 * use the accessing and manipulating parts of the HTTP pipeline
 * see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * 
 * @author Axiny
 * @date 2022/8/17
 */
class Fetch {

    #options = {
        default : {},
        get : {},
        post : {},
        delete : {},
        put : {}
    }

    constructor () {

        for (const key in this.#options) {

            this.#options[key].headers = new Headers();

        }

    }

    setHeaders () {

        const opt = this.#options;
        const arg = arguments;
        const length = arg.length;

        switch (length) {

            case 1 : {

                if (Type.isObject(arg[0])) {

                    this.setHeaders('default', arg[0]);
                    break;

                }

            }

            case 2 : {

                if (Type.isString(arg[0])) { /// rest method or key

                    if (Type.isString(arg[1])) {

                        this.setHeaders('default', arg[0], arg[1]);
                        break;

                    } else if (Type.isObject(arg[1])) {

                        for (const key in arg[1]) {

                            this.setHeaders(arg[0], key, arg[1][key]);

                        }

                        break;

                    }

                }

            }

            case 3 : {

                const method = arg[0];
                const key = arg[1];
                const value = arg[2];

                if (Type.isString(method) && Type.isString(key) && Type.isString(value)) {

                    opt[method].set(key, value);
                    break;

                }

            }

            default : {

                console.warn('the param type is not undefined, please check your arguments and try again.');

            }

        }

    }

    getHeaders () {

        const opts = this.getOptions(...arguments);
        return opts.headers;

    }

    setOptions () {

        const opts = this.#options;
        const arg = arguments;
        const length = arguments.length;

        switch (length) {

            case 1 : { 

                this.setOptions('default', arg[0]);
                break;

            }

            case 2 : {

                const method = arg[0];
                const opt = arg[1];

                if (Type.Object(opt)) {

                    if (arg[1].hasOwnProperty('headers')) {

                        this.setHeaders(method, opt.headers);
                        delete opt.headers;

                    }

                    this.#options[method] = Object.assign(opt, opts[method]);

                    break;

                }

            }

            default : {

                console.warn('the param type is not undefined, please check your arguments and try again.');

            }

        }

    }

    getOptions () {

        const opts = this.#options;
        const arg = arguments;
        const length = arguments.length;

        switch (length) {

            case 0 : {

                return this.getOptions('default');

            }

            case 1 : {

                const method = arg[0];

                if (Type.isString(method)) {

                    return opts[method];

                }

            }

            default : {

                console.warn('the param type is not undefined, please check your arguments and try again.');

            }

        }

    }

    async access ( url, options ) {

        this.setOptions(options);
        const opt = this.getOptions();

        const p = await fetch(url, opt);

        return p;

    }

    async rest ( url, method, options = {} ) {

        const met = method.toLowerCase();
        const opt = Object.assign(this.#options[met], options, { method });

        const p = await this.access(url, opt);
        return p;

    }

    async get ( url, options ) {

        return await this.rest(url, REST_API.GET, options);

    }

    async post ( url, data, options ) {

        const opt = Object.assign(options, { body: data });
        return await this.rest(url, REST_API.POST, opt);

    }

    async put ( url, data, options ) { 

        const opt = Object.assign(options, { body: data });
        return await this.rest(url, REST_API.PUT, opt);

    }

    async delete ( url, options ) {

        return await this.rest(url, REST_API.DELETE, options);

    }

}

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

        const str = await this.stringBlob (url, options);
        const json = JSON.parse(str);

        return json;

    }

}

var index = {

    Fetch,
    FileLoader,
    Type

};

export { Fetch, FileLoader, Type, index as default };
