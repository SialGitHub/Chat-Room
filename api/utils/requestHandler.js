module.exports = class RequestHandler {
  constructor (payload) {
    this.payload = payload
    return { resultCode: '0', payload }
  }
}
