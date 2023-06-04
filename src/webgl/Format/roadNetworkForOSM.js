import bufferDataLengthForOSM from './bufferDataLengthForOSM';

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
        const type = feature.geometry.type;
        let pointLength = 0;

        switch ( type ) {

            case 'MultiLineString' : {

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

                break;

            }

            case 'Point':
            case 'LineString' : {

                for (let j = 0; j < coordinates.length; j++) {

                    const point = coordinates[j];

                    vertex[vi++] = point[0];
                    vertex[vi++] = point[1];

                }

                pointLength += coordinates.length;

            }

            default : {

                throw new Error ('[roadNetworkReaderForOSM]: the feature.geometry.type is not supported, please use the "MultiLineString" or "LineString" and try again.');

            }

        }


    }

    return { vertex, indices }

}

export default roadNetworkReaderForOSM;