import Type from "./Type"
import Fetch from "./Fetch"
import FileLoader from "./FileLoader"
import FullScreen from "./FullScreen"

import { tokebabCase } from "./String/index"
import { dateFormat } from "./Date/index"

export default {

    Fetch,
    FileLoader,
    FullScreen,
    Type,

    Date : {

        format: dateFormat

    },

    String : {

        tokebabCase

    }

}

export {

    Fetch,
    FileLoader,
    FullScreen,
    tokebabCase,
    dateFormat,
    Type
    
}