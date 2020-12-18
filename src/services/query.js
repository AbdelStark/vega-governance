const listProposals = `
query {
  proposals {
    id
    datetime
    party {
      id
    }
    reference
    state
    terms {
      closingDatetime
      enactmentDatetime
      change {
        ... on NewMarket {
          instrument {
            code
          }
          decimalPlaces
          tradingMode {
            ... on ContinuousTrading {
              tickSize
            }
            ... on DiscreteTrading {
              tickSize
              duration
            }
          }
          riskParameters {
            ... on LogNormalRiskModel {
              tau
              riskAversionParameter
              params {
                r
                sigma
                mu
              }
            }
          }
        }
        ... on NewAsset {
          source {
            ... on BuiltinAsset {
              id
            }
          }
        }
      }
    }
    yesVotes {
      value
      party {
        id
      }
      datetime
    }
    noVotes {
      value
      party {
        id
      }
      datetime
    }
  }
}
`;

const listProposalsByParty = `

query Party($id: String!){
  party(id: $id) {
   query {
  proposals {
    id
    datetime
    party {
      id
    }
    reference
    state
    terms {
      closingDatetime
      enactmentDatetime
      change {
        ... on NewMarket {
          instrument {
            code
          }
          decimalPlaces
          tradingMode {
            ... on ContinuousTrading {
              tickSize
            }
            ... on DiscreteTrading {
              tickSize
              duration
            }
          }
          riskParameters {
            ... on LogNormalRiskModel {
              tau
              riskAversionParameter
              params {
                r
                sigma
                mu
              }
            }
          }
        }
        ... on NewAsset {
          source {
            ... on BuiltinAsset {
              id
            }
          }
        }
      }
    }
    yesVotes {
      value
      party {
        id
      }
      datetime
    }
    noVotes {
      value
      party {
        id
      }
      datetime
    }
  }
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