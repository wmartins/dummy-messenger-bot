'use strict';

const PORT = process.env.PORT || 8080;

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: PORT });

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply(`Hello, I'm a dummy bot!`);
    }
});

server.route({
    method: 'GET',
    path: '/webhook',
    handler: (request, reply) => {
        console.log(request.query);
        if(request.query['hub.verify_token'] === 'my_token') {
            reply(request.query['hub.challenge']);
        } else {
            reply('Wrong token');
        }
    }
});

server.start((err) => {
    if(err) {
        throw err;
    }

    console.log(`Server up and running at: ${server.info.uri}`);
});
