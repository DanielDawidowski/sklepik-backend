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
};

module.exports = Mutations;
