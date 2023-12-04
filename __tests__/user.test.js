const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');

chai.use(chaiHttp);

const { expect } = chai;
const { Model } = require('sequelize');

chai.use(chaiHttp);

const { allUsers } = require('./mocks/user');
const {
  Authorization,
  invalidToken,
  messageNotFound,
  messageInvalidToken } = require('./mocks/authorization');

describe('Teste a rota /user', () => {
  beforeEach(() => sinon.restore());

  it('Testa se a rota get /user retorna todos os usuarios', async function () {
    sinon.stub(Model, 'findAll').resolves(allUsers);

    const response = await (chai.request(app).get('/user').set({ 
      Authorization,
    }));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allUsers);
  });

  it('Testa se a rota get /user não retorna todos os usuarios se não tiver o token', async function () {
    const response = await (chai.request(app).get('/user'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota get /user não retorna todos os usuarios se o token for invalido', async function () {
    const response = await (chai.request(app).get('/user').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });

  it('Testa se a rota get /user/:id retorna o usuario do id', async function () {
    sinon.stub(Model, 'findOne').resolves(allUsers[1]);

    const response = await (chai.request(app).get('/user/1').set({
      Authorization,
    }));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.not.deep.equal(allUsers[0]);
    expect(response.body).to.deep.equal(allUsers[1]);
  });

  it('Testa se a rota get /user/:id não retorna o usuario do id se não tiver o token', async function () {
    const response = await (chai.request(app).get('/user/1'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota get /user/id não retorna o usuario do id se o token for invalido', async function () {
    const response = await (chai.request(app).get('/user/1').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });

  it('Testa se a rota delete /user/me não exclui o usuario se não tiver o token', async function () {
    const response = await (chai.request(app).delete('/user/me'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota delete /user/me não exclui o usuario se o token for invalido', async function () {
    const response = await (chai.request(app).delete('/user/me').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });

  it('Testa se a rota delete /user/me deleta o usuario', async function () {
    sinon.stub(Model, 'destroy').resolves(null);

    const response = await (chai.request(app).delete('/user/me').set({
      Authorization,
    }));

    expect(response.status).to.be.equal(204);
    expect(response.body).to.deep.equal({});
  });
})

/*    


  });

  it('Testa se o usuario não consegue logar em sua conta sem informar o email', async function () {
    const response = await (chai.request(app).post('/login').send({
      email: '',
      password: '123456'
    }));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'Some required fields are missing' });
  });

  it('Testa se o usuario não consegue logar em sua conta sem informar a senha', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const response = await (chai.request(app).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: ''
    }));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'Some required fields are missing' });
  });

  it('Testa se o usuario não consegue logar em sua conta sem o email correto', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const response = await (chai.request(app).post('/login').send({
      email: 'sadlasda@admin.com',
      password: '123456'
    }));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'Invalid fields' });
  });

  it('Testa se o usuario não consegue logar em sua conta sem informar a senha', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const response = await (chai.request(app).post('/login').send({
      email: 'lewishamilton@gmail.com',
      password: 'ssadjasjdj'
    }));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'Invalid fields' });
  }); */
