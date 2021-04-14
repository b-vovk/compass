const fetch = require('node-fetch');
const { expect } = require('chai');

describe('Search listings', () => {
  const host = 'https://www.compass.com';

  it('Should search 5 most expensive listings in Manhattan within unique neighborhood', async () => {
    const uniqueNeighborhood = [];
    const result = [];

    await fetch(`${host}/api/v3/listings/search/list/relations`, {
      method: 'POST',
      body: JSON.stringify({
        searchQuery: {
          start: 0,
          num: 24,
          sortOrder: 3,
          listingTypes: [2],
          agentSearch: true,
          saleStatuses: [9, 12],
          geography: 'nyc',
          locations: [
            {
              neighborhood: 'Manhattan',
              geography: 'nyc',
            },
          ],
          locationIds: [21425],
        },
        relationTypes: [0],
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        json.listingRelations.forEach((listing) => {
          if (
            !uniqueNeighborhood.includes(listing.listing.location.neighborhood)
          ) {
            result.push(listing.listing.navigationPageLink);
            uniqueNeighborhood.push(listing.listing.location.neighborhood);
          }
        });
        return result;
      });

    expect(result[0]).to.eql(
      '/listing/park-avenue-manhattan-ny-10022/581627238821485497/'
    );
    expect(result[1]).to.eql(
      '/listing/park-place-manhattan-ny-10007/745581251884455121/'
    );
    expect(result[2]).to.eql(
      '/listing/west-57th-street-manhattan-ny-10019/603508162443855905/'
    );
    expect(result[3]).to.eql(
      '/listing/east-63rd-street-manhattan-ny-10065/632555562041153225/'
    );
    expect(result[4]).to.eql(
      '/listing/25-columbus-circle-unit-ph80-manhattan-ny-10019/297656107245729169/'
    );

    console.log(result.slice(0, 5));
  });
});
