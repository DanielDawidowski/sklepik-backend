const { forwardTo } = require('prisma-binding');

const Query = {
   events: forwardTo('db'),
   event: forwardTo('db'),
   eventsConnection: forwardTo('db'),
   me(parent, args, ctx, info) {
    // check if there is a current user ID
        if(!ctx.request.userId) {
            return null
        }
        return ctx.db.query.user({
            where: { id: ctx.request.userId }
        }, info)
    },
    bookings: forwardTo('db'),
    booking: forwardTo('db'),
    // async users(parent, args, ctx, info) {
    //     // 1. Check if they are logged in
    //     if(!ctx.request.userId) {
    //         throw new Error('You must be logged in')
    //     }
    //     console.log(ctx.request.userId)

    //     // 3. if they do, query all the users
    //     return ctx.db.query.users({}, info);
    // },
    // async events(parent, args, ctx, info) {
    //     const events = await ctx.db.query.events();
    //     return events;
    // }
};

module.exports = Query;
