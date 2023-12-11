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
const {
  newPost,
  postsEnd,
  modifyPost,
  messageParameters,
  messageInvalidUser } = require('./mocks/post');
const {
  Authorization,
  invalidToken,
  messageNotFound,
  messageInvalidToken } = require('./mocks/authorization');

const { createToken } = require('../src/utils/jwt.utils');
const { modify } = require('../src/callModel/blogPost.callModel');

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

  it('Testa se a rota get /post/:id não retorna a postagem do id se não tiver o token', async function () {
    const response = await (chai.request(app).get('/post/1'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota get /post/:id não retorna a postagem do id se o token for invalido', async function () {
    const response = await (chai.request(app).get('/post/1').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });

  it('Testa se a rota put /post/:id não retorna a postagem do id caso não exista o usuario', async function () {
    const response = await (chai.request(app).put('/post/1').set({ 
      Authorization
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidUser);
  });

  it('Testa se a rota put /post/:id não retorna a postagem do id se não tiver o token', async function () {
    const response = await (chai.request(app).put('/post/1'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota put /post/:id não retorna a postagem do id se o token for invalido', async function () {
    const response = await (chai.request(app).put('/post/1').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });

  it('Testa se a rota put /post/:id não consegue alterar a postagem do id caso falte o parametro content', async function () {
    const { password: _, ...userWithoutPassword } = allUsers[0];
    const token = createToken(userWithoutPassword);

    const response = await (chai.request(app).put('/post/1').set({ 
      Authorization: token,
    }).send({
      title: 'Alterando post',
    }));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal(messageParameters);
  });

  it('Testa se a rota put /post/:id não consegue alterar a postagem do id caso falte o parametro title', async function () {
    const { password: _, ...userWithoutPassword } = allUsers[0];
    const token = createToken(userWithoutPassword);

    sinon.stub(Model, 'findOne').resolves(modifyPost);

    const response = await (chai.request(app).put('/post/1').set({ 
      Authorization: token,
    }).send({
      content: 'Alterando o post'
    }));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal(messageParameters);
  });

  it('Testa se a rota put /post/:id consegue alterar a postagem do id', async function () {
    const { password: _, ...userWithoutPassword } = allUsers[0];
    const token = createToken(userWithoutPassword);
    
    sinon.stub(Model, 'update')
    sinon.stub(Model, 'findOne').resolves(modifyPost);

    const response = await (chai.request(app).put('/post/1').set({ 
      Authorization: token,
    }).send({
      title: 'Alterando post',
      content: 'Alterando o post'
    }));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(modifyPost);
  });

  it('Testa se a rota delete /post/:id consegue excluir a postagem do id', async function () {
    const { password: _, ...userWithoutPassword } = allUsers[0];
    const token = createToken(userWithoutPassword);
    
    sinon.stub(Model, 'destroy')

    const response = await (chai.request(app).delete('/post/1').set({ 
      Authorization: token,
    }));

    expect(response.status).to.be.equal(204);
    expect(response.body).to.deep.equal({});
  });

  it('Testa se a rota put /post/:id não retorna a postagem do id caso não exista o usuario', async function () {
    const response = await (chai.request(app).put('/post/1').set({ 
      Authorization
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidUser);
  });

  it('Testa se a rota put /post/:id não retorna a postagem do id se não tiver o token', async function () {
    const response = await (chai.request(app).put('/post/1'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageNotFound);
  });

  it('Testa se a rota put /post/:id não retorna a postagem do id se o token for invalido', async function () {
    const response = await (chai.request(app).put('/post/1').set({ 
      'Authorization': invalidToken
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(messageInvalidToken);
  });
});
