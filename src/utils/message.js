const moment = require("moment");

const formatMsg = (userName, text) => {
    return {
        userName,
        text,
        time: moment().format("h:mm a")
    };
};

module.exports = formatMsg;