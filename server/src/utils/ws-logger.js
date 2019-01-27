const util = require('util')

module.exports = (packet, next) => {
  console.log(util.inspect(packet, false, null, true))
  next()
}
