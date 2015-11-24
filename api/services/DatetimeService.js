module.exports = {


  /**
   * Format a JSON-formatted date into time ago format.
   *
   * @required {String} date   e.g. 138818Z
   * 
   * @return {String}         e.g. "10 days ago"
   */
  getTimeAgo: function (options) {
    var Datetime = require('machinepack-datetime');


    var niceTimeAgoString = Datetime.timeFrom({
      toWhen: Datetime.parse({
        datetime: options.date
      }).execSync(),
      fromWhen: new Date().getTime()
    }).execSync();

    return niceTimeAgoString;
  },

  /**
   * Transform total seconds into hoursMinutesSeconds format 
   * as well as hours, minutes, seconds.
   * 
   * @required {Integer} totalSeconds   e.g. 543323
   * 
   * @return {String}         e.g. "1h 2m 3s"
   * @return {Integer}        e.g. 1
   */

  getHoursMinutesSeconds: function(options) {
    
    var hours = Math.floor(options.totalSeconds/ 60 / 60);
    var minutes = Math.floor(options.totalSeconds / 60 % 60);
    var seconds = options.totalSeconds % 60;

    var hoursMinutesSeconds = hours + 'h ' + minutes + 'm ' + seconds + 's ';

    return {
      hoursMinutesSeconds: hoursMinutesSeconds,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

};