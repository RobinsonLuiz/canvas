function index(domError, domSuccess, domBankError, campos, route, modal, domActive = null, method = 'POST', routeSession = false) {
    fetch(route, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
    })
        .then(res => res.json()) // expecting a json response
        .then(json => {
            if (json) {
                const user = json;
                let error_register = document.querySelector(domError);
                let success_register = document.querySelector(domSuccess);
                let bank = document.querySelector(domBankError);
                let verificaAtivo = false;
                if (domActive != null) {
                    var active = document.querySelector(domActive);
                    verificaAtivo = true;
                }
                if (!user.register) {
                    if (user.OK == false) return error_register.removeAttribute('hidden');
                    else {
                        if (verificaAtivo) {
                            if (user.OK == "desatived") {
                                error_register.setAttribute('hidden', 'hidden');
                                active.removeAttribute('hidden');
                            } else {
                                if (user.OK == 'errorBank') {
                                    error_register.setAttribute('hidden', 'hidden');
                                    success_register.setAttribute('hidden', 'hidden');
                                    bank.removeAttribute('hidden');
                                } else {
                                    error_register.setAttribute('hidden', 'hidden');
                                    bank.setAttribute('hidden', 'hidden');
                                    success_register.removeAttribute('hidden');
                                    setTimeout(() => {
                                        window.location = `http://localhost/${routeSession}` + JSON.stringify(user.OK);
                                        let success_register = document.querySelector(domSuccess);
                                        success_register.setAttribute('hidden', 'hidden');
                                        $(modal).modal('hide');
                                    }, 1500);
                                }
                            };
                        } else {
                            error_register.setAttribute('hidden', 'hidden');
                            success_register.removeAttribute('hidden');
                            setTimeout(() => {
                                let success_register = document.querySelector(domSuccess);
                                success_register.setAttribute('hidden', 'hidden');
                                $(modal).modal('hide');
                            }, 1500);
                        }
                    };
                } else {
                    if (user.register == false) return error_register.removeAttribute('hidden');
                    else {
                        if (user.register == 'cadastrado') {
                            success_register.setAttribute('hidden', 'hidden');
                            error_register.removeAttribute('hidden');
                        } else {
                            error_register.setAttribute('hidden', 'hidden');
                            success_register.removeAttribute('hidden');
                            setTimeout(() => {
                                let success_register = document.querySelector(domSuccess);
                                success_register.setAttribute('hidden', 'hidden');
                                $(modal).modal('hide');
                            }, 1500);
                        }
                    }
                };
            }
        })
        .catch(err => { return false });
}

let btnRegister = document.querySelector('.btn-modal-register');
btnRegister.addEventListener('click', function (event) {
    event.preventDefault();
    index('.error', '.success', '.bankerror', pegaCampos(), 'verifica/', '#myModal');
});

let btnLogin = document.querySelector('.btn-modal-login');

btnLogin.addEventListener('click', function (event) {
    event.preventDefault();
    index('.error-login', '.success-login', '.bankerror', pegaCamposLogin(), 'login/', '#loginModal', '.success-active', 'POST', 'administrador/session/');
});