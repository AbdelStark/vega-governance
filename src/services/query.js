const listProposals = `
query{
  proposals {
    id
    datetime
    party { id }
    reference
    state
    terms { closingDatetime, enactmentDatetime,
      change 
      {
       ... on NewMarket {
          instrument { code }
          decimalPlaces
        }
        ... on NewAsset {
          source{
            ... on BuiltinAsset{
              id
            }
          }
        }
      }
    }
    yesVotes { value, party { id }, datetime}
    noVotes { value, party { id }, datetime}
  
  }
}
`;

const listProposalsByParty = `

query Party($id: String!){
  party(id: $id) {
    proposals {
      id
      datetime
      party { id }
      reference
      state
      terms { closingDatetime, enactmentDatetime,
        change 
        {
         ... on NewMarket {
            instrument { code }
            decimalPlaces
          }
          ... on NewAsset {
            source{
              ... on BuiltinAsset{
                id
              }
            }
          }
        }
      }
      yesVotes { value, party { id }, datetime}
      noVotes { value, party { id }, datetime}
    
    }
  }
}
`;

const query = {
    listProposals: listProposals,
    listProposalsByParty: listProposalsByParty,
}

export{
    query,
}