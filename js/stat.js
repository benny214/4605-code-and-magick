'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_GAP = 10;

var TEXT_COLOR = '#000';
var TEXT_FONT = '16px PT Mono';

var barColors = ['rgba(255, 0, 0, 1)', 'rgba(2, 117, 216, 1)', 'rgba(92, 184, 92, 1)', 'rgba(240, 173, 78, 1)'];
var barWidth = 40;
var barHeight = [];
var barGap = 50;
var barY = 240;

var getColumnHeight = function (times) {

  var barMaxHeight = 150;
  var maxTime = times[0];
  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }
  for (var j = 0; j < times.length; j++) {
    barHeight[j] = Math.round(barMaxHeight * times[j] / maxTime);
  }
  return barHeight;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, textX, textY) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(text, textX, textY);
};

var renderColumn = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderText(ctx, 'Ура вы победили!', 150, 50);
  renderText(ctx, 'Список результатов:', 150, 70);

  barHeight = getColumnHeight(times);

  for (var k = 0; k < names.length; k++) {
    var barX = 150 + (barWidth + barGap) * k;
    renderText(ctx, names[k], barX, CLOUD_HEIGHT - SHADOW_GAP);
    renderColumn(ctx, barX, barY, barWidth, -barHeight[k], barColors[k]);
  }

};
