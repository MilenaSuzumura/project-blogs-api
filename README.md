# Blogs API

Blogs API é um projeto focado em desenvolver uma API e um banco de dados para a produção de conteúdo para um blog.

<strong>OBS:</strong> ESSE PROJETO FOI DESENVOLVIDO NA TRYBE.

## Técnologias usadas
* JavaScript;
* Higher Order Functions;
* Node.js;
* Express.js;
* Sequelize.js;
* Json web tokens;
* DotEnv;
* Joi;
* Docker;
* MySQL;
* Jest;
* Mock;
* Sinon;
* Chai;
* Chai-http.

## Rotas, entradas e saídas

<details>
<summary>Endpoint POST /login</summary><br />
Utilizado para quando o usuário vai acessar sua conta. O banco de dados exige que o usuário insira o email e senha correta e irá retornar um token temporário como confirmação de que está correto.

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-post-login" src="/images-readme/post-login-exemplo-de-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saída-correta-post-login" src="/images-readme/post-login-exemplo-de-saida.png">

#### Inserindo informações incorretas
Existem dois cenários onde a saída acima pode não ser retornada: caso o email ou/e senha estejam incorretas e caso falte uma das duas informações. Ambas possuem retornos diferentes.

<strong>Retorno para email ou/e senha incorretas:</strong>
```
{
  "message": "Invalid fields"
}
```

<strong>Retorno para caso falte alguma das duas informações:</strong>
```
{
  "message": "Some required fields are missing"
}
```

</details>

<details>
<summary>Endpoint POST /user</summary><br />
Utilizado para criar um novo usuário. Para isso, necessita de um nome, email, senha e uma imagem. Assim como o login, retornará um token caso todas as informações enviadas foram validadas corretamente.

##### Informações necessárias:
* <strong>displayName:</strong> É o nome e sobrenome. Deve ser enviado como string e o mínimo de caracters é 8. É obrigatório.
* <strong>email:</strong> É o email e deve ser enviado como string. É obrigatório.
* <strong>password:</strong> É a senha. Deve ser enviado como string e deve conter no mínimo 6 caracter. É obrigatório.
* <strong>image:</strong> É uma imagem ou foto de usuário e deve ser enviado como string. Esse é o único que não é obrigatório. 

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-post-user" src="/images-readme/post-user-exemplo-de-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saída-correta-post-user" src="/images-readme/post-login-exemplo-de-saida.png">

#### Inserindo informações incorretas
Existem dois cenários onde a saída acima pode não ser retornada: caso não preencha os requisitos necessários(explicados nas Informações Necessárias acima) e caso falte alguma das informações obrigatórias. Cada um deles terá uma mensagem diferente avisando o motivo de estar incorreta.

<strong>Exemplo caso não preencha os requisitos necessários:</strong>
```
{
  "message": "\"password\" length must be at least 6 characters long"
}
```

<strong>Exemplo caso esteja faltando alguma das informações obrigatórias</strong>
```
{
  "message": "\"password\" is required"
}
```

</details>

<details>
<summary>Endpoint GET /user</summary><br />
Utilizado para retornar as informações de todos os usuários que contém no banco de dados, porém é necessário ter um token para isso.

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-get-user" src="/images-readme/get-user-exemplo-de-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saida-correta-get-user" src="/images-readme/get-user-exemplo-de-saida.png">


#### Inserindo informações incorretas
Existem duas formas para o banco de dados não ser acessado. Não contendo um token ou tendo um token inválido.

<strong>Exemplo caso não contenha o token:</strong>
```
{
  "message": "Token not found"
}
```

<strong>Exemplo caso o token tenha expirado ou seja inválido:</strong>
```
{
  "message": "Expired or invalid token"
}
```

</details>

<details>
<summary>Endpoint GET /user/:id</summary><br />
Utilizado para retornar as informações do usuário com o id que está no url que contém no banco de dados, porém é necessário ter um token para isso.

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-get-user-id" src="/images-readme/get-user-id-exemplo-de-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saida-correta-get-user-id" src="/images-readme/get-user-id-exemplo-resposta.png">

<strong>Caso não exista usuário com aquele id no banco de dados, o retorno será:</strong>
```
{
  "message": "User does not exist"
}
```

<strong>Exemplo caso não contenha o token:</strong>
```
{
  "message": "Token not found"
}
```

<strong>Exemplo caso o token tenha expirado ou seja inválido:</strong>
```
{
  "message": "Expired or invalid token"
}
```

</details>

<details>
<summary>Endpoint POST /categories</summary><br />
Utilizado para criar uma nova categoria. Para isso, necessita de um nome e de um token valido. Caso as informações estejam corretas, retornara as informações da nova categoria.

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-post-categories" src="/images-readme/post-categories-exemplo-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saida-correta-post-categories" src="/images-readme/post-categories-exemplo-saida.png">

#### Inserindo informações incorretas
Existem quatro cenários onde a saída acima pode não ser retornada: não conter o nome da categoria, a string name estar vazia, caso não tenha o token e um token invalido.

<strong>Exemplo caso não contenha o name:</strong>
```
{
  "message": "\"name\" is required"
}
```

<strong>Exemplo caso name seja uma string vazia:</strong>
```
{
  "message": "\"name\" is not allowed to be empty"
}
```

<strong>Exemplo caso não contenha o token:</strong>
```
{
  "message": "Token not found"
}
```

<strong>Exemplo caso o token tenha expirado ou seja inválido:</strong>
```
{
  "message": "Expired or invalid token"
}
```

</details>

<details>
<summary>Endpoint GET /categories</summary><br />
Utilizado para retornar as informações de todas as categorias que contém no banco de dados, porém é necessário ter um token para isso.

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-get-categories" src="/images-readme/get-categories-exemplo-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saida-correta-get-categories" src="/images-readme/get-categories-exemplo-saida.png">

#### Inserindo informações incorretas
Existem dois cenários onde a saída acima pode não ser retornada: caso não tenha o token e um token invalido.

<strong>Exemplo caso não contenha o token:</strong>
```
{
  "message": "Token not found"
}
```

<strong>Exemplo caso o token tenha expirado ou seja inválido:</strong>
```
{
  "message": "Expired or invalid token"
}
```

</details>

<details>
<summary>Endpoint POST /post</summary><br />
Utilizado para criar um novo post. Para isso, necessita de um nome, email, senha e uma imagem. Assim como o login, retornará um token caso todas as informações enviadas foram validadas corretamente.

##### Informações necessárias:
* <strong>title:</strong> É o título do post e deve ser enviado como string. É obrigatório.
* <strong>content:</strong> É o conteúdo do post e deve ser enviado como string. É obrigatório.
* <strong>categoryIds:</strong> É um array de números com as categorias ao qual o post pertence e precisa ter pelo menos 1 id de categoria. É obrigatório.

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-post-post" src="/images-readme/post-post-exemplo-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saida-correta-post-post" src="/images-readme/post-post-exemplo-saida.png">

#### Inserindo informações incorretas
Existem dois cenários onde a saída acima pode não ser retornada: caso não preencha os requisitos necessários(explicados nas Informações Necessárias acima) e caso falte alguma das informações obrigatórias. Cada um deles terá uma mensagem diferente avisando o motivo de estar incorreta.

<strong>Exemplo caso não preencha os requisitos necessários:</strong>
```
{
  "message": "Some required fields are missing"
}
```

<strong>Exemplo caso esteja faltando alguma das informações obrigatórias</strong>
```
{
  "message": "\"content\" is required"
}
```

##### Além disso, pode ter os erros do token.

<strong>Exemplo caso não contenha o token:</strong>
```
{
  "message": "Token not found"
}
```

<strong>Exemplo caso o token tenha expirado ou seja inválido:</strong>
```
{
  "message": "Expired or invalid token"
}
```

</details>

</details>

<details>
<summary>Endpoint GET /post</summary><br />
Utilizado para retornar as informações de todas as postagens que contém no banco de dados, porém é necessário ter um token para isso.

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-get-post" src="/images-readme/get-post-exemplo-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saida-correta-get-post" src="/images-readme/get-post-exemplo-saida.png">


#### Inserindo informações incorretas
Existem dois cenários onde a saída acima pode não ser retornada: caso não tenha o token e um token invalido.

<strong>Exemplo caso não contenha o token:</strong>
```
{
  "message": "Token not found"
}
```

<strong>Exemplo caso o token tenha expirado ou seja inválido:</strong>
```
{
  "message": "Expired or invalid token"
}
```

</details>

<details>
<summary>Endpoint GET /post/:id</summary><br />
Utilizado para retornar as informações das postagens com o id que está no url que contém no banco de dados, porém é necessário ter um token para isso.

##### Exemplo de entrada:
<img alt="imagem-exemplo-de-entrada-correta-get-post-id" src="/images-readme/get-post-id-exemplo-entrada.png">

##### Exemplo de saída:
<img alt="imagem-exemplo-de-saida-correta-get-post-id" src="/images-readme/get-post-id-exemplo-saida.png">


#### Inserindo informações incorretas
Existem três cenários onde a saída acima pode não ser retornada: caso não exista post com aquele id, não tenha o token e um token invalido.

<strong>Caso não exista post com aquele no banco de dados, o retorno será:</strong>
```
{
  "message": "Post does not exist"
}
```

<strong>Exemplo caso não contenha o token:</strong>
```
{
  "message": "Token not found"
}
```

<strong>Exemplo caso o token tenha expirado ou seja inválido:</strong>
```
{
  "message": "Expired or invalid token"
}
```

</details>

<strong>OBS:</strong> Existe o Endpoint GET /search, porém não funciona.

## Utilizando o docker
Para criar os containers, execute: `docker-compose up -d`

Para abrir o terminar do container, execute: `docker exec -it blogs_api bash`

## Instalando Dependências
  `npm install`

## Banco de dados
Para criar o banco de dados, execute: `npm run prestart`

Para popular o banco de dados: `npm run seed`

## Aplicação Node:
Para executar a aplicação e acessar as rotas, execute: `npm run debug`


## Executando Testes
Para rodar todos os testes:

  `npm test`


Para rodar um teste específico:

  `npm test nomeDoArquivo`

exemplo:
`npm test post`


<strong>OBS:</strong> Os testes irão rodar com os testes de cobertura
