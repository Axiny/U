import Type from "./Type"
import Fetch from "./Fetch"
import FileLoader from "./FileLoader"
import FullScreen from "./FullScreen"

import radomBoolean from "./radomBoolean"

import { tokebabCase } from "./String/index"
import { dateFormat } from "./Date/index"

import WebGL from "./webgl"
import { bufferDataLengthForOSM } from "./webgl"
import { roadNetworkReaderForOSM } from "./webgl"

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

    },

    WebGL

}

export {

    bufferDataLengthForOSM,
    dateFormat,
    Fetch,
    FileLoader,
    FullScreen,
    radomBoolean,
    roadNetworkReaderForOSM,
    tokebabCase,
    Type
    
}