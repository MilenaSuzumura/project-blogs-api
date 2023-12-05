const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');

chai.use(chaiHttp);

const { expect } = chai;
const { Model } = require('sequelize');
const User = require('../src/models/User');

chai.use(chaiHttp);

const { allUsers } = require('./mocks/user');
const { categories } = require('./mocks/categories');
const { newPost, postsEnd } = require('./mocks/post');
const {
  Authorization,
  invalidToken,
  messageNotFound,
  messageInvalidToken } = require('./mocks/authorization');

describe('Teste a rota /post', () => {
  beforeEach(() => sinon.restore());

  it('Testa se a rota post /post cria uma nova postagem', async function () {
    sinon.stub(Model, 'create').resolves(newPost);

    const response = await (chai.request(app).post('/post').send(newPost).set({
        Authorization,
      }))

    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal(newPost);
  });

  it('Testa se a rota post /post não cria uma nova postagem se não tiver o token', async function () {
    const response = await (chai.request(app).post('/post'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota  post /post não cria uma nova postagem se o token for invalido', async function () {
    const response = await (chai.request(app).post('/post').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });

  it('Testa se a rota get /post retorna todas postagens', async function () {
    sinon.stub(Model, 'findAll').resolves(postsEnd);


    const response = await (chai.request(app).get('/post').set({ 
      Authorization,
    }));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(postsEnd);
  });

  it('Testa se a rota get /post não retorna todas as postagens se não tiver o token', async function () {
    const response = await (chai.request(app).get('/post'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota get /post não retorna todas as postagens se o token for invalido', async function () {
    const response = await (chai.request(app).get('/post').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });

  it('Testa se a rota get /post/:id retorna a postagem do id', async function () {
    sinon.stub(Model, 'findOne').resolves(postsEnd[0]);


    const response = await (chai.request(app).get('/post/1').set({ 
      Authorization,
    }));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(postsEnd[0]);
  });

  it('Testa se a rota get /post não retorna a postagem do id se não tiver o token', async function () {
    const response = await (chai.request(app).get('/post/1'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota get /post não retorna a postagem do id se o token for invalido', async function () {
    const response = await (chai.request(app).get('/post/1').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });

  /* it('Testa se a rota get /post não retorna a postagem do id se não tiver o token', async function () {
    const response = await (chai.request(app).get('/post/1'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota get /post não retorna a postagem do id se o token for invalido', async function () {
    const response = await (chai.request(app).get('/post/1').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  }); */


 /* 
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
  }); */
});
