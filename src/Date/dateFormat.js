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

    }

    for (const k in opt) {

        const ret = new RegExp("(" + k + ")").exec(format);

        if (ret) {

            format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
            
        }

    }

    return format;

}

export default dateFormat;