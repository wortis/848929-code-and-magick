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

function genWizardData() {
  var NamesWizard = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SurnamesWizard = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var CoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var similarWizard = {};

  similarWizard.name = genWizardName(NamesWizard, SurnamesWizard);
  similarWizard.coatColors = CoatColors[getRandomNumber(0, CoatColors.length - 1)];
  similarWizard.eyesColors = EyesColors[getRandomNumber(0, EyesColors.length - 1)];

  return similarWizard;
}

function genListWizards(totalWizards) {
  var wizardsList = [];
  for (var i = 0; i < totalWizards; i++) {
    wizardsList.push(genWizardData());
  }
  return wizardsList;
}

function genWizardsListElement(wizardElement) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardElement = similarWizardTemplate.cloneNode(true);
  var similarWizardName = similarWizardElement.querySelector('.setup-similar-label');
  var similarWizardCoatColors = similarWizardElement.querySelector('.wizard-coat');
  var similarWizardEyesColors = similarWizardElement.querySelector('.wizard-eyes');

  similarWizardName.textContent = wizardElement.name;
  similarWizardCoatColors.style.fill = wizardElement.coatColors;
  similarWizardEyesColors.style.fill = wizardElement.eyesColors;

  return similarWizardElement;
}

function rendListWizards(wizardsList) {
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsList.length; i++) {
    fragment.appendChild(genWizardsListElement(wizardsList[i]));
  }

  similarWizardsList.appendChild(fragment);
}

function showElement(element) {
  element.classList.toggle('hidden');
}
