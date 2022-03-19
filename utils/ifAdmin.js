const config = require('../config');
const admin_ids = config.ADMINS;
console.log(admin_ids);
const ifAdmin = (ctx) => {
  if (admin_ids.includes(ctx.from.id)) {
    return true;
  } else {
    return false;
  }
};

module.exports = ifAdmin;
