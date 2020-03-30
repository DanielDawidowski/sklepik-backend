const Mutations = {
    async createEvent(parent, args, ctx, info) {
        // Check if logged in
        const event = await ctx.db.mutation.createEvent({
            data: {
                ...args
            }
        }, info); 

        console.log(event);

        return event;
    },
    updateEvent(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args };
        // remove the ID from the updates
        delete updates.id;
        // run the update method 
        return ctx.db.mutation.updateEvent({
            data: updates,
            where: {
                id: args.id
            }
        }, info);
    },
    async deleteEvent(parent, args, ctx, info) {
        const where = { id: args.id };
        // 1. find the item
        const event = await ctx.db.query.event({ where }, `{ id title }`);
        // const event = await ctx.db.query.event({ where }, `{ id title user { id }}`) zmanienic na górny

        // 2. Check if they own that item, or have the permissions

        // const ownsItem = item.user.id === ctx.request.userId;
        // const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN', 'ITEMDELETE'].includes(permission));
        
        // if(!ownsItem && !hasPermissions) {
        //     throw new Error('You don\'t have permission to do that!')
        // }

        // 3. Delete it!
        return ctx.db.mutation.deleteEvent({ where }, info);
    },
};

module.exports = Mutations;
