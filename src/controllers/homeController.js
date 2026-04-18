const Home = require('../models/Home');

Home.create({
    title: 'Um título qualquer',
    description: 'Uma descrição qualquer'
})
    .then(dados => console.log(dados))
    .catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
    res.render('index');
    return;
};

exports.trataPost = (req, res) => {
    res.send('Ei, sou sua nova rota de POST!');
    return;
};