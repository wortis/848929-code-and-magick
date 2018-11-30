'use strict';

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupInputCoat = setup.querySelector('[name="coat-color"]');
var setupInputEyes = setup.querySelector('[name="eyes-color"]');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var setupInputFireball = setup.querySelector('.setup-fireball-wrap input');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

showElement(setup);
showElement(setupSimilar);

rendListWizards(genListWizards(4));

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genWizardName(names, surnames) {
  return names[getRandomNumber(0, names.length - 1)] + ' ' + surnames[getRandomNumber(0, surnames.length - 1)];
}

function genListWizards(totalWizards) {
  var wizardsList = [];
  var NamesWizard = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SurnamesWizard = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var CoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  for (var i = 0; i < totalWizards; i++) {
    wizardsList.push(genWizardData());
  }
  return wizardsList;
  function genWizardData() {
    var Wizard = {
      name: '',
      coatColors: '',
      eyesColors: ''
    };

    Wizard.name = genWizardName(NamesWizard, SurnamesWizard);
    Wizard.coatColor = CoatColors[getRandomNumber(0, CoatColors.length - 1)];
    Wizard.eyesColor = EyesColors[getRandomNumber(0, EyesColors.length - 1)];

    return Wizard;
  }
}

function genWizardsListElement(wizardElement) {
  var WizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var WizardElement = WizardTemplate.cloneNode(true);
  var WizardName = WizardElement.querySelector('.setup-similar-label');
  var WizardCoatColor = WizardElement.querySelector('.wizard-coat');
  var WizardEyesColor = WizardElement.querySelector('.wizard-eyes');

  WizardName.textContent = wizardElement.name;
  WizardCoatColor.style.fill = wizardElement.coatColor;
  WizardEyesColor.style.fill = wizardElement.eyesColor;

  return WizardElement;
}

function rendListWizards(wizardsList) {
  var WizardsList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsList.length; i++) {
    fragment.appendChild(genWizardsListElement(wizardsList[i]));
  }

  WizardsList.appendChild(fragment);
}

function showElement(element) {
  element.classList.toggle('hidden');
}

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


wizardCoat.addEventListener('click', function () {
  var Coat = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];

  wizardCoat.style.fill = getRandomItem(Coat);
  setupInputCoat.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function () {
  var Eyes = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'];
  
  wizardEyes.style.fill = getRandomItem(Eyes);
  setupInputEyes.value = wizardEyes.style.fill;
});

wizardFireball.addEventListener('click', function () {
  var Fireball = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'];
  
  var color = getRandomItem(Fireball);
  wizardFireball.style.background = color;
  setupInputFireball.value = color;
});
