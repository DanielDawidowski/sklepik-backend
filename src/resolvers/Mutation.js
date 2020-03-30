const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { randomBytes } = require('crypto');
// const { promisify } = require('util');
// const { hasPermission } = require('../utils');
// const stripe = require('../stripe');

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
    async signup(parent, args, ctx, info) {
        // lowercase ther email
        args.email = args.email.toLowerCase();
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create uesr in db
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                // permissions: { set: ['USER'] },
            }
        }, info)
        // create JWT toek for them
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // We set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        // Finally we return the user to the browser
        return user;
    },
};

module.exports = Mutations;
