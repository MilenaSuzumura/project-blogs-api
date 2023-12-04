const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');

chai.use(chaiHttp);

const { expect } = chai;
const { Model } = require('sequelize');

chai.use(chaiHttp);

const { allUsers } = require('./mocks/user');
const Authorization = require('./mocks/authorization');

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
