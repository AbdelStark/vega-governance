const proposalSubscriptionQuery = `
subscription { 
    busEvents(batchSize: 1, types: [Proposal]) { 
        type 
    }
}
`;

const vegaQuery = {
    subscription: {
        proposal: proposalSubscriptionQuery,
    }
}