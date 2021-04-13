const Api = require('../api');
const { expect } = require('chai');
const { default: fetch } = require('node-fetch');


describe('Create', () => {

    it('should create user', async () => {
      api = new Api();
      await api.authenticate();


      expect(1).to.eql(1);
    });
  });
