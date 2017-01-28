const moment = require('moment');

const generateMessage  = (from, text) => {
  return {
    from,
    text,
    createAt: moment().valueOf()
  };
};

const generateLocationMessage = (from, coords) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createAt: moment().valueOf()
  }
};


module.exports = {generateMessage, generateLocationMessage}
