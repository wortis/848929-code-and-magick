'use strict';

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');

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
    coatColors: 0,
    eyesColors: 0
  };

  Wizard.name = genWizardName(NamesWizard, SurnamesWizard);
  Wizard.coatColors = CoatColors[getRandomNumber(0, CoatColors.length - 1)];
  Wizard.eyesColors = EyesColors[getRandomNumber(0, EyesColors.length - 1)];

  return Wizard;
}
}

function genWizardsListElement(wizardElement) {
  var WizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var WizardElement = WizardTemplate.cloneNode(true);
  var WizardName = WizardElement.querySelector('.setup-similar-label');
  var WizardCoatColors = WizardElement.querySelector('.wizard-coat');
  var WizardEyesColors = WizardElement.querySelector('.wizard-eyes');

  WizardName.textContent = wizardElement.name;
  WizardCoatColors.style.fill = wizardElement.coatColors;
  WizardEyesColors.style.fill = wizardElement.eyesColors;

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
