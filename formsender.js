/**
 * @param {string} formID
 * @param {string} url
 * @param {boolean} bootstrap
 */
function Formsender(formID, url, bootstrap = false) {
    let self = this;
    self.form = formID;
    self.element = document.getElementById(self.form);
    self.url = url;
    self.bootstrap = bootstrap;
    self.verifyset = [];
    self.reloadVerify = function () {
        const a = randomInt(9);
        const b = randomInt(9);
        self.verifyset = [a, b];
        self.element.querySelector('[data-formsender="label"]').innerText = `What is ${a.toString()} times ${b.toString()}?`;
    };
    self.checkVerify = function () {
        let verifycode = self.element.querySelector('[data-formsender="input"]');
        if (self.verifyset[0] * self.verifyset[1] === parseInt(verifycode.value)) {
            verifycode.setCustomValidity('');
        } else {
            verifycode.setCustomValidity('invalid');
        }
    }
    self.getData = function () {
        let output = {};
        let data = new FormData(self.element);
        data.forEach(function (value, key) {
            output[key] = value;
        });
        return output;
    }
    self.disable = function () {
        self.element.querySelector('FIELDSET').setAttribute('disabled', 'true');
    }
    self.enable = function () {
        self.element.querySelector('FIELDSET').removeAttribute('disabled');
    }
    self.submitHTML = self.element.querySelector('[type="submit"]').innerHTML;
    self.reset = function () {
        self.element.reset();
        self.reloadVerify();
        if (self.bootstrap) {
            self.element.classList.remove('was-validated');
        }
        self.enable();
        self.element.querySelector('[type="submit"]').innerHTML = self.submitHTML;
        self.customcode['reset']();
    }
    self.error = function (input = 'error: form was not submitted') {
        if (self.customcode['error']) {
            self.element.append(self.customcode);
        } else {
            alert(input);
        }
        self.enable();
        self.element.querySelector('[type="submit"]').innerHTML = self.submitHTML;
    }
    self.sendForm = function () {
        let data = self.getData();
        self.disable();
        let submit = self.element.querySelector('[type="submit"]');
        // button load html
        if (submit.nodeName == 'BUTTON') {
            if (self.customcode['load']) {
                submit.innerHTML = self.customcode['load'];
            } else {
                submit.innerHTML = 'Sending...';
            }
        } else {
            if (self.customcode['load']) {
                console.log('custom loading is only compatible with button[type="submit"]');
            } else {
                submit.innerHTML = 'Sending...';
            }
        }
        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data)
        }).then(response => {
            self.reset();
        }).catch(error => {
            self.error(error);
        });
    }
    // custom additions
    self.customcode = {};
    self.custom = function (type, input) {
        self.customcode[type] = input;
    }
    // main
    if (self.element.contains(self.element.querySelector('[data-formsender="label"]'))) {
        self.reloadVerify();
    }
    // on submit
    self.element.addEventListener('submit', function (event) {
        event.preventDefault();
        self.checkVerify();
        if (!this.checkValidity()) {
            event.stopPropagation();
        } else {
            self.sendForm();
        }
        if (self.bootstrap) {
            this.classList.add('was-validated');
        }
    }, false);
}

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}