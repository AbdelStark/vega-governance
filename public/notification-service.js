
console.log('loading notification service worker');
const webSocket = new WebSocket("wss://lb.testnet.vega.xyz/query", "graphql-ws");
webSocket.onopen = event => {
    console.log('web socket opened');
    console.log(event);
}
self.importScripts('subscriptions.js');
self.addEventListener('install', event => {
    const config = new URL(location).searchParams.get('config');
    start(JSON.parse(config));
});

function start(settings) {
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
}