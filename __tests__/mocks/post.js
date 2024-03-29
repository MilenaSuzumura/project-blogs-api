const postsEnd = [
  {
    id: 1,
    title: "Post do Ano",
    content: "Melhor post do ano",
    userId: 1,
    published: "2011-08-01T19:58:00.000Z",
    updated: "2011-08-01T19:58:51.000Z",
    user: {
      id: 1,
      displayName: "Lewis Hamilton",
      email: "lewishamilton@gmail.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    categories: [
      {
        id: 1,
        name: "Inovação"
      }
    ]
  },
  {
    id: 2,
    title: "Vamos que vamos",
    content: "Foguete não tem ré",
    userId: 1,
    published: "2011-08-01T19:58:00.000Z",
    updated: "2011-08-01T19:58:51.000Z",
    user: {
      id: 1,
      displayName: "Lewis Hamilton",
      email: "lewishamilton@gmail.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    categories: [
      {
        id: 2,
        name: "Escola"
      }
    ]
  }
]

const newPost = {
  title: 'Melhor jogo do ano',
  content: 'Melhor jogo do ano',
  categoryIds: [1],
}

const modifyPost = {
  id: 1,
  title: "Alterando post",
  content: "Alterando o post",
  userId: 1,
  published: "2011-08-01T19:58:00.000Z",
  updated: "2023-12-06T17:00:15.000Z",
  user: {
    id: 1,
    displayName: "Lewis Hamilton",
    email: "lewishamilton@gmail.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  categories: [
    {
      id: 1,
      name: "Inovação"
    }
  ]
};

const messageParameters = { "message": "Some required fields are missing" }

const messageInvalidUser = { "message": "Unauthorized user" }

module.exports = { postsEnd, newPost, modifyPost, messageParameters, messageInvalidUser }