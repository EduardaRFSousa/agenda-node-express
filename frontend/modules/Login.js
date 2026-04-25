import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        this.validate = this.validate.bind(this);
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

        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        
        let error = false;

        if(!validator.isEmail(emailInput.value)){
            alert('Email inválido');
            error = true;
        }

        if(passwordInput.value.length < 6 || passwordInput.value.length > 12){
            alert('Senha deve ter entre 6 e 12 caracteres');
            error = true;
        }

        if(!error) el.submit();
    }
}