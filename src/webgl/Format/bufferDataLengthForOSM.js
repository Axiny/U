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

export default bufferDataLengthForOSM;