import Type from "./Type"
import Fetch from "./Fetch"
import FileLoader from "./FileLoader"
import FullScreen from "./FullScreen"

import radomBoolean from "./radomBoolean"

import String from "./String/index"
import { toKebabCase } from "./String/index"

import Date from "./Date/index"
import { dateFormat } from "./Date/index"

import WebGL from "./webgl/index"
import { bufferDataLengthForOSM } from "./webgl/index"
import { roadNetworkReaderForOSM } from "./webgl/index"

export default {

    Fetch,
    FileLoader,
    FullScreen,
    Type,

    radomBoolean,

    Date,
    String,
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
    toKebabCase,
    Type
    
}