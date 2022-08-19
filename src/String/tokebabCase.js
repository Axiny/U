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

export default toKebabCase;