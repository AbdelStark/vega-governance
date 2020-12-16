const listProposals = `
query {
  proposals {
    id
    datetime
    party { id }
    reference
    state
    terms { closingDatetime, enactmentDatetime}
    yesVotes { value, party { id }, datetime}
    noVotes { value, party { id }, datetime}
  }
}
`;

const query = {
    listProposals: listProposals,
}

export{
    query,
}