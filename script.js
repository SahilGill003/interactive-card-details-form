const App = {
  $: {
    cardInputName: document.querySelector('input[name="cardName"'),
    cardInputNumber: document.querySelector('input[name="cardNumber"'),
    cardInputExpiryMonth: document.querySelector('input[name="cardExpiryMonth"'),
    cardInputExpiryYear: document.querySelector('input[name="cardExpiryYear"'),
    cardInputCvNumber: document.querySelector('input[name="cardCvNum"'),
    cardName: document.querySelector('.card-name'),
    cardNumber: document.querySelector('.card-number'),
    cardExpiry: document.querySelector('.card-expiry'),
    cardCvNumber: document.querySelector('.cv-number'),
    allInputs: document.querySelectorAll('input'),
    submitBtn: document.querySelector('.form-submit-btn'),
    form: document.querySelector('form')
  },

  setValueAttribute(inputEl, value) {
    inputEl.setAttribute('value', value);
  },

  handleInputName(value) {
    if (value === "")
      value = "Jane Appleseed";
    App.$.cardName.textContent = value;
  },

  handleInputNumber(value) {
    if (value === "") {
      value = "0000 0000 0000 0000";
    }
    App.$.cardNumber.textContent = value;
  },

  handleInputExpiry(expiry) {
    let contentString = App.$.cardExpiry.textContent;

    let [month, year] = contentString.split('/');

    if (expiry.month === "") {
      year = expiry.year;
    }
    else {
      month = expiry.month;
    }

    if (year === "")
      year = "00";
    if (month === "")
      month = "00";

    App.$.cardExpiry.textContent = month + '/' + year;
  },

  handleInputCvNumber(value) {
    if (value === "")
      value = "000";
    App.$.cardCvNumber.textContent = value;
  },

  handleSubmit() {
    App.$.form.classList.toggle('submitted');
  },

  modifyCardNumber(numString) {
    let newNum = '', j = 0;
    for (let i = 0; i < numString.length; i++) {

      if (numString[i].match(/\w/)) {

        if (j && j % 4 == 0) {
          newNum += ' ';
        }
        newNum += numString[i];
        j++;
      }
    }
    return newNum;
  },

  addListeners() {
    App.$.cardInputName.addEventListener('input', (e) => {
      const value = e.target.value.substring(0, 25);
      this.handleInputName(value);
      e.target.value = value;
      this.setValueAttribute(e.target, e.target.value);
    })
    App.$.cardInputNumber.addEventListener('input', (e) => {
      let value = this.modifyCardNumber(e.target.value.substring(0, 19));
      this.handleInputNumber(value);
      e.target.value = value;
      this.setValueAttribute(e.target, e.target.value);
    })
    App.$.cardInputExpiryMonth.addEventListener('input', (e) => {

      let value = e.target.value.substring(0, 2);
      e.target.value = value;
      this.handleInputExpiry({ month: value, year: "" })
      this.setValueAttribute(e.target, e.target.value);
    })
    App.$.cardInputExpiryYear.addEventListener('input', (e) => {

      let value = e.target.value.substring(0, 2);
      e.target.value = value;
      this.handleInputExpiry({ month: "", year: value });
      this.setValueAttribute(e.target, e.target.value);
    })
    App.$.cardInputCvNumber.addEventListener('input', (e) => {
      this.handleInputCvNumber(e.target.value);
      this.setValueAttribute(e.target, e.target.value);
    })

    App.$.submitBtn.addEventListener('click', this.handleSubmit);
  },

  init() {
    App.$.allInputs.forEach(inp => {

      this.setValueAttribute(inp, inp.value);

      let name = inp.name;
      let value = inp.value;
      switch (name) {
        case "cardName": this.handleInputName(value)
          break;
        case "cardNumber": this.handleInputNumber(value)
          break;
        case "cardExpiryMonth": this.handleInputExpiry({ month: value, year: "" })
          break;
        case "cardExpiryYear": this.handleInputExpiry({ month: "", year: value })
          break;
        case "cardCvNum": this.handleInputCvNumber(value)
          break;
        default:
      }
    })
    this.addListeners();
  }
}

App.init();