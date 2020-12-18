const proposalChangeTypes = {
    NewMarket: 'New Market',
    UpdateMarket: 'Update Market',
    UpdateNetworkParameter: 'Update Network Parameter',
    NewAsset: 'New Asset',
    Unknown: 'Unknown',
}

function guessProposalChangeType(proposal){
    const change = proposal.terms.change;
    if(change.hasOwnProperty('instrument')){
        return  proposalChangeTypes.NewMarket;
    }else if(change.hasOwnProperty('marketId')){
        return proposalChangeTypes.UpdateMarket;
    }else if(change.hasOwnProperty('networkParameter')){
        return proposalChangeTypes.UpdateNetworkParameter;
    }else if(change.hasOwnProperty('source')){
        return proposalChangeTypes.NewAsset;
    }else {
        return proposalChangeTypes.Unknown;
    }
}

export {
    guessProposalChangeType,
    proposalChangeTypes
}

