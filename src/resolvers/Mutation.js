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
    }
};

module.exports = Mutations;
