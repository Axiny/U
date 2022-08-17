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

export default Type