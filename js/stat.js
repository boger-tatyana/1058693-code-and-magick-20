'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_BARS = 50;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - 6 * GAP - FONT_GAP * 4;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP * 2, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP * 2, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var lightness = Math.random() * 100;
      ctx.fillStyle = 'hsl(243, 100%,' + lightness + '%)';
    }
    ctx.fillRect(CLOUD_X + GAP_BARS + (GAP_BARS + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP, BAR_WIDTH, -(barHeight * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP_BARS + (GAP_BARS + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP);
    ctx.fillText(Math.round(times[i]),
        CLOUD_X + GAP_BARS + (GAP_BARS + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - 3 * GAP - FONT_GAP - (barHeight * times[i]) / maxTime);
  }

};
