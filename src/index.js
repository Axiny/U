import Type from "./Type"
import Fetch from "./Fetch"
import FileLoader from "./FileLoader"
import FullScreen from "./FullScreen"

import radomBoolean from "./radomBoolean"

import { tokebabCase } from "./String/index"
import { dateFormat } from "./Date/index"

export default {

    Fetch,
    FileLoader,
    FullScreen,
    Type,

    radomBoolean,

    Date : {

        format: dateFormat

    },

    String : {

        tokebabCase

    }

}

export {

    dateFormat,
    Fetch,
    FileLoader,
    FullScreen,
    radomBoolean,
    tokebabCase,
    Type
    
}