const mongoose = require('mongoose');
const validator = require('validator');

const contatoSchema = new mongoose.Schema({
    name: { type: String, required: true},
    lastname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phonenumber: { type: String, required: false, default: '' },
    createdIn: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', contatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.buscarPorId = async function(id) {
    if(typeof id !== 'string') return '';
    const user = await ContatoModel.findById(id);
    return user;
};

Contato.prototype.register = async function() {
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function(){
    this.cleanUp();
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if(!this.body.name) this.errors.push('Nome é um campo obrigatório');
    if(!this.body.email && !this.body.phonenumber) this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone');
};

Contato.prototype.cleanUp = function(){
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        lastname: this.body.lastname,
        email: this.body.email,
        phonenumber: this.body.phonenumber
    };
};

module.exports = Contato;