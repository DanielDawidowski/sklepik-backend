const { forwardTo } = require('prisma-binding');

const Query = {
   events: forwardTo('db'),
   event: forwardTo('db'),
   
    // async events(parent, args, ctx, info) {
    //     const events = await ctx.db.query.events();
    //     return events;
    // }
};

module.exports = Query;
