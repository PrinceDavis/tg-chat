const generateMessage  = (from, text) => {
  return {
    from,
    text,
    createAt: new Date().getTime()
  };
};

const generateLocationMessage = (from, coords) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createAt: new Date().getTime()
  }
};


module.exports = {generateMessage, generateLocationMessage}
