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


<!-- ## Executando Testes
Para rodar todos os testes:

  `npm test`


Para rodar um teste específico:

  `npm test nomeDaFunção`

exemplo:
`npm test getEmployeesCoverage`


Para rodar os testes de cobertura:

  `npm run test:coverage` -->

## Função de cada Função
* <strong>getSpeciesByIds:</strong> Busca as espécies dos animais por meio de um id e retorna um array contendo todos os animais dessa espécie.

* <strong>getAnimalsOlderThan:</strong> Ao receber uma espécie e uma idade como parâmetro, retorna se todos os animais dessa espécie possuem essa idade ou são mais velhos.

* <strong>getEmployeeByName:</strong> Busca as pessoas colaboradoras pelo primeiro ou último nome delas.

* <strong>countAnimals:</strong> Conta a quantidade de espécies de animais residentes no zoológico

* <strong>calculateEntry:</strong> Calcula o valor total da entrada dos visitantes do zoológico

* <strong>getSchedule:</strong> Retorna um cronograma com os horários de visita disponíveis para cada espécie de animal

* <strong>getOldestFromFirstSpecies:</strong> Encontra o animal mais velho de uma espécie que é gerenciado por uma pessoa colaboradora

* <strong>getEmployeesCoverage:</strong> Busca as informações sobre a pessoa colaboradora e por quais espécies ela é responsável

* <strong>getAnimalMap:</strong> Faz o mapeamento geográfico dos animais de cada espécie e realiza filtros de localização, nome em ordem alfabética e sexo.

#### Funções que foram criados apenas os testes:
* <strong>handlerElephants:</strong> Retorna informações dos elefantes referente ao argumento que foi passado como parâmetro

|   Argumento    | Informação                                                                    |
|     :---:      | :---                                                                          |
|    `count`     | retorna a quantidade de elefantes                                             |
|    `names`     | retorna um array com a relação dos nomes de todos os elefantes                |
|  `averageAge`  | retorna a média de idade dos elefantes                                        |
|   `location`   | retorna a localização dos elefantes dentro do Zoológico                       |
|  `popularity`  | retorna a popularidade dos elefantes                                          |
| `availability` | retorna um array com a relação de dias em que é possível visitar os elefantes |


* <strong>getOpeningHours:</strong> Mostra os horários abertos do zoológico de cada dia da semana.
