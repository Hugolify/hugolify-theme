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

    const formData = new FormData(this.form);
    const actionUrl = this.form.action || '/';
    this.form.classList.add('is-submitting');

    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
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

  addSuccessMessage() {
    this.form.classList.add('is-success');
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
