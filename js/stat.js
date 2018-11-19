var CloudWidth = 420;
var CloudHeight = 270;
var CloudX = 100;
var CloudY = 10;
var ShadowCloudOffset = 10;

var StatWidth = 40;
var StatHeight = 150;
var StatX = CloudX;
var StatY = CloudY + 85;
var StatOffsetX = 50;

var TextTimeOffsetY = 10;
var TextNameOffsetY = 20;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CloudWidth, CloudHeight);
}

function createStatRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function getRandomBlueColor() {
  return 'rgb(0, 0, ' + (Math.random() * 255) + ')';
}

function getMaxNumber(array) {
  var max = array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
}

function printStatText(ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CloudX + ShadowCloudOffset, CloudY + ShadowCloudOffset, 'rgba(0, 0, 0, 0.9)');
  renderCloud(ctx, CloudX, CloudY, '#fff');

  var startStatX = StatX + StatWidth;
  var textResultOffsetY = 30;

  ctx.font = '16px "PT Mono"';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', startStatX, CloudY + textResultOffsetY);
  textResultOffsetY += 20;
  ctx.fillText('Список результатов:', startStatX, CloudY + textResultOffsetY);

  var pxRate = getMaxNumber(times) / 100;

  for (var i = 0; i < names.length; i++) {
    var columnColor = names[i] === 'Вы' ? 'red' : getRandomBlueColor();
    var columnHeight = (times[i] / pxRate) * (StatHeight / 100);
    createStatRect(ctx, startStatX, StatY + (StatHeight - columnHeight), StatWidth, columnHeight, columnColor);

    printStatText(ctx, names[i], startStatX, StatY + StatHeight + TextNameOffsetY, columnColor);
    printStatText(ctx, Math.round(times[i]), startStatX, StatY + (StatHeight - columnHeight) - TextTimeOffsetY, columnColor);

    startStatX += StatOffsetX + StatWidth;
  }
};
