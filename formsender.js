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
        let elements = self.element.elements;
        for (i = 0; i < elements.length; i++) {
            let item = elements[i];
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(item.nodeName) && item.type != 'submit' && Object.keys(elements)[elements.length + i - 1] != 'verifycode') {
                output[Object.keys(elements)[elements.length + i - 1]] = item.value;
            }
        }
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
        self.enable();
        if (self.bootstrap) {
            self.element.classList.remove('was-validated');
        }
        self.reloadVerify();
        self.element.querySelector('[type="submit"]').innerHTML = self.submitHTML;
        self.customReset();
    }
    self.sendForm = function () {
        self.disable();
        let submit = self.element.querySelector('[type="submit"]');
        // button load html
        if (submit.nodeName == 'BUTTON') {
            if (self.customLoad != 'undefined') {
                submit.innerHTML = self.customLoad;
            } else {
                submit.innerHTML = 'Sending...';
            }
        } else {
            if (self.customLoad != 'undefined') {
                console.log('custom loading is only compatible with button[type="submit"]');
            } else {
                submit.innerHTML = 'Sending...';
            }
        }
        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(self.getData())
        }).then(response => {
            self.reset();
        }).catch(error => {
            console.log(error);
            self.enable();
            self.element.querySelector('[type="submit"]').innerHTML = self.submitHTML;
        });
    }
    // custom additions
    self.customLoad; // HTML
    self.customReset; // JS
    self.custom = function (type, input) {
        if (type == 'load') {
            self.customLoad = input;
        } else if (type == 'reset') {
            self.customReset = input;
        }
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