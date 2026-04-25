import validator from 'validator';

export default class Contato{
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', (e) => this.validate(e));
        
    }

    validate(e){
        e.preventDefault();

        const el = e.target;
        
        const nameInput = el.querySelector('input[name="name"]');
        const lastNameInput = el.querySelector('input[name="lastname"]');
        const emailInput = el.querySelector('input[name="email"]');
        const phoneInput = el.querySelector('input[name="phonenumber"]');

        let error = false;

        if (!nameInput.value.trim()) {
            alert('Nome é obrigatório');
            error = true;
        }

        // Validação de email (só se ele não estiver vazio)
        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            alert('Email inválido');
            error = true;
        }

        // Pelo menos um dos dois deve existir
        if (!emailInput.value && !phoneInput.value) {
            alert('Pelo menos um contato deve ser preenchido: email ou telefone');
            error = true;
        }

        if(!error) el.submit();
    }
}