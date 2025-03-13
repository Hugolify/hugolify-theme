const forms = document.querySelectorAll('.js-form');

class Form {
  constructor(form) {
    this.form = form;
    this.form_message = form.querySelector('.js-form-message');
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const actionUrl = event.target.action || '/';

    // Get form service
    let serviceForm = 'netlify';
    if (event.target.action) {
      const urlObj = new URL(event.target.action);
      serviceForm = urlObj.hostname;
    }

    // Set Headers and Body
    let headers = { 'Content-Type': 'application/json' };
    let body = this.formDataToJson(formData);
    if (serviceForm == 'netlify') {
      headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      body = new URLSearchParams(formData).toString();
    }

    this.form.classList.add('is-submitting');

    try {
      const response = await fetch(actionUrl, {
        method: this.form.method,
        headers: headers,
        body: body
      });

      if (response.ok) {
        this.removeErrorMessage();
        this.addSuccessMessage();
      } else {
        this.addErrorMessage(await response.text());
      }
    } catch (error) {
      console.error('Erreur:', error);
      this.addErrorMessage(error.message);
    }
  }

  formDataToJson(formData) {
    let object = {};
    formData.forEach((value, key) => {
      if (object[key] !== undefined) {
        if (!Array.isArray(object[key])) {
          object[key] = [object[key]];
        }
        object[key].push(value);
      } else {
        object[key] = value;
      }
    });
    return JSON.stringify(object);
  }

  addSuccessMessage() {
    this.form.classList.add('is-success');
    this.form_message.textContent = window.i18n.form.success;
  }

  addErrorMessage(errorMessage) {
    this.form.classList.remove('is-submitting');
    this.form.classList.remove('is-success');
    this.form.classList.add('has-error');
    this.form_message.textContent = errorMessage;
  }

  removeErrorMessage() {
    this.form.classList.remove('is-submitting');
    this.form.classList.remove('has-error');
    this.form_message.innerHTML = '';
  }
}

forms.forEach((form) => {
  new Form(form);
});
