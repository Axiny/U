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

    static isHTMLElement ( p ) {

        if (typeof HTMLElement == 'object') {

            return p instanceof HTMLElement;

        } else {

            return p && typeof p === 'object' && p.nodeType === 1 && typeof p.nodeName === 'string';

        }

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

        const str = await this.stringBlob(url, options);
        const json = JSON.parse(str);

        return json;

    }

}

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

/**
 * radom create a boolean value
 * 
 * @returns {boolean}
 * 
 * @date 2020/6/4
 * @author Axiny
 */
function radomBoolean () {

    return Math.floor(Math.random() * 10) % 2 === 0;

}

/**
 * camelCase to KebaCase
 * 
 * @param {string} str - camelCase string
 *
 * @returns {string}
 * 
 * @author Axiny
 * @date 2022/8/19
 */
function toKebabCase ( str ) {

    return str.replace(/[A-Z]/g, i => {

        return '-' + i.toLowerCase();

    });

}

var String = {

    toKebabCase
    
};

/**
 * date format
 * 
 * @example
 * const time = new Date();
 * const format = "YYYY-MM-DD HH:MM:SS";
 * const formatString = dateFormat(format, time);
 * 
 * console.log(formatString);   /// 2022-08-19 12:30:04
 * 
 * @param {string} format 
 * @param {Date} date
 *  
 * @returns {string}
 * 
 * @date 2022/8/20
 * @update Axiny
 */
function dateFormat ( format, date ) {

    const opt = {

        "Y+": date.getFullYear().toString(),        // year
        "M+": (date.getMonth() + 1).toString(),     // mounth
        "D+": date.getDate().toString(),            // day
        "H+": date.getHours().toString(),           // hour
        "M+": date.getMinutes().toString(),         // minute
        "S+": date.getSeconds().toString()          // seconds

    };

    for (const k in opt) {

        const ret = new RegExp("(" + k + ")").exec(format);

        if (ret) {

            format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
            
        }

    }

    return format;

}

var Date = {

    format : dateFormat
    
};

/**
 * create by bunkyo university
 * 
 * calculate geojson data vertex and indices array length
 * 
 * @param {*} GeoJson - geo json data
 * @param {number} vertexLength - one vertex use the elements number
 * 
 * @returns { vertex: number, indices: number }
 * 
 * @author Axiny
 * @date 2022/7/12
 */
function bufferDataLengthForOSM (GeoJson, vertexLength) {

    const features = GeoJson.features;
    let vertex = 0, indices = 0;

    for (let i = 0; i < features.length; i++) {

        const coordinates = features[i].geometry.coordinates;
        let points = 0;

        for (let j = 0; j < coordinates.length; j++) {

            const len = coordinates[j].length;

            vertex += vertexLength * len;
            points += len;

        }

        indices += (points - 1) * 2;

    }

    return { vertex, indices };

}

/**
 * create by bunkyo university
 * 
 * openstreetmap roads network data reader
 * 
 * https://download.geofabrik.de/asia/japan.html
 * the data transfer use QGIS.exe
 * origin data is *.dbf file
 * 
 * @param {GeoJSON} GeoJson - geo json data
 * 
 * @return { vertex : Float32Array<number>, indices : Array<number> }
 * 
 * @author Axiny
 * @date 2022/7/4
 */
function roadNetworkReaderForOSM (GeoJson) {

    const { crs, features, name, type } = GeoJson;

    // vertex length is 2, beause the longitude and latitude data only
    // if need altitude data please check the param "vertexLength" is 3
    const Length = bufferDataLengthForOSM(GeoJson, 2);

    // vertex data
    const vertex = new Float32Array(Length.indices);
    let vi = 0;

    // indices data
    const indices = new Array(Length.indices);
    let ii = 0;
    let iCount = 0;

    for (let i = 0; i < features.length; i++) {

        const feature = features[i];
        const coordinates = feature.geometry.coordinates;
        let pointLength = 0;

        for (let j = 0; j < coordinates.length; j++) {

            const coordinate = coordinates[j];

            for (let k = 0; k < coordinate.length; k++) {

                const point = coordinate[k];

                vertex[vi++] = point[0];
                vertex[vi++] = point[1];
                // vertex[vi++] = 0;            // if need altitude please recode here

            }

            pointLength += coordinate.length;

        }

        // calculate the indices data
        for (let i = 0; i < pointLength - 1; i++) {

            indices[ii++] = iCount + i;
            indices[ii++] = iCount + i + 1;
    
        }

        iCount = iCount + pointLength;

    }

    return { vertex, indices }

}

var WebGL = {

    Format : {

        bufferDataLengthForOSM,
        roadNetworkReaderForOSM

    }

};

var index = {

    Fetch,
    FileLoader,
    FullScreen,
    Type,

    radomBoolean,

    Date,
    String,
    WebGL

};

export { Fetch, FileLoader, FullScreen, Type, bufferDataLengthForOSM, dateFormat, index as default, radomBoolean, roadNetworkReaderForOSM, toKebabCase };
