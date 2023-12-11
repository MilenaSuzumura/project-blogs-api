const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');

chai.use(chaiHttp);

const { expect } = chai;
const { Model } = require('sequelize');

chai.use(chaiHttp);

const { categories, newCategory, newCategoryId } = require('./mocks/categories');
const {
  Authorization,
  invalidToken,
  messageNotFound,
  messageInvalidToken } = require('./mocks/authorization');

describe('Teste a rota /categories', () => {
  beforeEach(() => sinon.restore());

  it('Testa se a rota post /categories cria uma nova categoria', async function () {
    sinon.stub(Model, 'create').resolves(newCategory);
    sinon.stub(Model, 'findOne').resolves(newCategoryId);

    const response = await (chai.request(app).post('/categories').send(newCategory).set({ 
        Authorization,
      }));

    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal(newCategory);
  });

  it('Testa se a rota get /categories retorna todas as categorias', async function () {
    sinon.stub(Model, 'findAll').resolves(categories);

    const response = await (chai.request(app).get('/categories').set({ 
      Authorization,
    }));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(categories);
  });

  it('Testa se a rota get /categories não retorna todas as categorias se não tiver o token', async function () {
    const response = await (chai.request(app).get('/categories'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota get /categories não retorna todas as categorias se o token for invalido', async function () {
    const response = await (chai.request(app).get('/categories').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });
})
