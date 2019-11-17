const request = require('request-promise-native')
const randomstring = require('randomstring')
const url = require('url')

const QSOPTIONS = {
  get: 'get',
  post: 'post',
  cookies: 'cookies',
  referer: 'referer',
  userAgent: 'user-agent',
  https: 'supportsHttps',
  anonymityLevel: 'anonymityLevel',
  protocol: 'protocol',
  port: 'port',
  country: 'country',
  maxCheckPeriod: 'maxCheckPeriod',
  websites: 'websites',
  minSpeed: 'minSpeed',
  notCountry: 'notCountry',
  ipPort: 'ipPort',
  curl: 'curl',
}

const GimmeProxy = {
  _userId: null,
  _timeout: null,
  _api_key: null,

  _host: 'http://gimmeproxy.com',
  _path: '/api/getProxy',
  _timeout_path: '/api/get/',

  config(config) {
    if (config.userId) this._userId = config.userId || randomstring.generate(32)
    if (config.timeout) this._timeout = config.timeout
    if (config.api_key) this._api_key = config.api_key
  },
  getProxy({ timeout, get = true, api_key = null, ...rest } = {}) {
    const _timeout = timeout || this._timeout || null
    const _api_key = api_key || this._api_key || null
    const options = {}

    if (_timeout) {
      this.config({});
      options.timeout = _timeout
    }
    if (_api_key) {
      options.api_key = api_key
    }
    if (get) {
      options.get = true
    }
    return request(url.resolve(this._host, 
      timeout ? url.resolve(this._timeout_path, this._userId) : this._path
    ), {
      qs: {
        ...options,
        ...Object.fromEntries(Object.entries(QSOPTIONS).filter(([key]) => rest[key]).map(([key, option]) => [option, rest[key]])),
      },
      json: true,
    })
  },
}

module.exports = GimmeProxy