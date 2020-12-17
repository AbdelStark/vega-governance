console.log('loading notification service worker');

/*self.importScripts('subscriptions.js');
self.addEventListener('install', event => {
    const config = new URL(location).searchParams.get('config');
    //start(JSON.parse(config));
});


const GQL = {
    CONNECTION_INIT: 'connection_init',
    CONNECTION_ACK: 'connection_ack',
    CONNECTION_ERROR: 'connection_error',
    CONNECTION_KEEP_ALIVE: 'ka',
    START: 'start',
    STOP: 'stop',
    CONNECTION_TERMINATE: 'connection_terminate',
    DATA: 'data',
    ERROR: 'error',
    COMPLETE: 'complete'
}
const webSocket = new WebSocket("wss://lb.testnet.vega.xyz/query", "graphql-ws");
webSocket.onopen = event => {
    webSocket.send(JSON.stringify({
        type: GQL.CONNECTION_INIT,
    }))
}
webSocket.onMessage = event => {
    const data = JSON.parse(event.data)
    switch (data.type) {
        case GQL.CONNECTION_ACK: {
            console.log('success')
            break
        }
        case GQL.CONNECTION_ERROR: {
            console.error(data.payload)
            break
        }
        case GQL.CONNECTION_KEEP_ALIVE: {
            break
        }
        case GQL.DATA: {
            console.log(data.id, data.payload.errors, data.payload.data)
            break
        }
        case GQL.COMPLETE: {
            console.log('completed', data.id)
            break
        }
    }
}

const id = 1;
webSocket.send(JSON.stringify({
    type: GQL.START,
    id,
    payload: vegaQuery.subscription.proposal,
}))*/

/*function start(settings) {
    console.log('entering start');
    console.log(settings);
    proposalSubscription(settings.vega.governance.endpoint);
}

const eventCallback = (event) => {
    console.log('Handling event:', event);
    // handle event
};

const errorCallback = (error) => {
    console.log('Error:', error)
};

function proposalSubscription(vegaGraphQLEndpoint) {
    console.log('subscribing to: ', vegaGraphQLEndpoint);
    console.log('query: ', vegaQuery.subscription.proposal);
}*/