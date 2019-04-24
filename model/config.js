const AV = require('../utils/av-live-query-weapp-min');

class Config extends AV.Object {
  get key() {
    return this.get('key');
  }
  set key(value) {
    this.set('key', value);
  }

  get value() {
    return this.get('value');
  }
  set value(value) {
    this.set('value', value);
  }
}

AV.Object.register(Config, 'Config');
module.exports = Config;