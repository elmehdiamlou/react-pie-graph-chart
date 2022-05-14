"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledPieChart = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  gap: 40px;\n\n  .canvas_container {\n    position: relative;\n  }\n  .canvas_chart {\n    height: 250px;\n    width: 250px;\n    margin-block: 25px;\n  }\n  .canvas_tooltip {\n    position: absolute;\n    left: 0;\n    height: 250px;\n    width: 250px;\n    margin-block: 25px;\n    pointer-events: none;\n  }\n  .chart_keys {\n    margin-block: auto;\n  }\n  .chart_text {\n    height: fit-content;\n    margin-bottom: 5px;\n    font-size: 13px;\n    display: flex;\n    align-items: center;\n  }\n  .chart_dot {\n    font-size: 34px;\n    line-height: 0;\n    margin-right: 5px;\n  }\n"])));

var oneDemi = 1.5;
var two = 2;
var ten = 10;
var twenty = 20;
var thirty = 30;
var fourty = 40;
var thousand = 100;
var circleDegrees = 360;
var hexRadix = 16;
var soustraction = [thirty, thirty / two];

var PieChart = function PieChart(_ref) {
  var data = _ref.data;
  var chartRef = (0, _react.useRef)(null);
  var toolTipRef = (0, _react.useRef)(null);
  var total = data.reduce(function (r, value) {
    return value.value + r;
  }, 0);

  var degreesToRadians = function degreesToRadians(degrees) {
    return degrees * Math.PI / (circleDegrees / two);
  };

  var sumTo = function sumTo(initial) {
    var sum = 0;
    var step = 0;

    while (step < initial) {
      sum += data[step].value;
      step += 1;
    }

    return sum * circleDegrees / total;
  };

  var calcPercent = function calcPercent(value) {
    return Math.floor(value * thousand / total);
  };

  var rgbToHex = function rgbToHex(colorPart) {
    var hex = colorPart.toString(hexRadix);
    return hex.length === 1 ? "0".concat(hex) : hex;
  };

  var getPercentFromColor = function getPercentFromColor(color) {
    var _content$value;

    var content = data.find(function (c) {
      return c.color.toLowerCase().includes(color.toLowerCase());
    });
    return calcPercent((_content$value = content === null || content === void 0 ? void 0 : content.value) !== null && _content$value !== void 0 ? _content$value : 0);
  };

  var drawSegment = function drawSegment(index) {
    var canvas = chartRef.current;
    var context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");

    if (canvas && context) {
      var el = data[index];
      var centerX = Math.floor(canvas.width / two);
      var centerY = Math.floor(canvas.height / two);
      var radius = Math.floor(canvas.width / two - thousand / two);
      var startingAngle = degreesToRadians(sumTo(index));
      var arcSize = degreesToRadians(el.value * circleDegrees / total);
      var endingAngle = startingAngle + arcSize;
      context.save();
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
      context.closePath();
      context.fillStyle = el.color;
      context.fill();
      context.restore();
    }
  };

  var drawTooltip = function drawTooltip() {
    var chartCanvas = chartRef.current;
    var toolTipCanvas = toolTipRef.current;
    var chartContext = chartCanvas === null || chartCanvas === void 0 ? void 0 : chartCanvas.getContext("2d");
    var toolTipContext = toolTipCanvas === null || toolTipCanvas === void 0 ? void 0 : toolTipCanvas.getContext("2d");

    if (chartCanvas && toolTipCanvas && chartContext && toolTipContext) {
      chartCanvas.addEventListener("mousemove", function (e) {
        var rect = chartCanvas.getBoundingClientRect();
        var X = (e.clientX - rect.left) / (rect.right - rect.left) * chartCanvas.width;
        var Y = (e.clientY - rect.top) / (rect.bottom - rect.top) * chartCanvas.height;
        var color = chartContext.getImageData(X, Y, 1, 1).data;
        var hexColor = "#".concat(rgbToHex(color[0])).concat(rgbToHex(color[1])).concat(rgbToHex(color[two]));
        var txt = "".concat(getPercentFromColor(hexColor), "%");

        if (txt !== "0%") {
          var _toolTipContext$measu = toolTipContext.measureText(txt),
              width = _toolTipContext$measu.width;

          toolTipContext.clearRect(0, 0, toolTipCanvas.width, toolTipCanvas.height);
          toolTipContext.fillStyle = "#130F26";
          toolTipContext.fillRect(X - fourty / two - soustraction[0], Y - thirty - soustraction[1], width + fourty, fourty);
          toolTipContext.beginPath();
          toolTipContext.moveTo(X - fourty / two - thirty + width / oneDemi, Y - two * two);
          toolTipContext.lineTo(X - fourty / two - ten + width / oneDemi, Y - two * two);
          toolTipContext.lineTo(X - fourty / two - twenty + width / oneDemi, Y + ten - two * two);
          toolTipContext.fill();
          toolTipContext.font = "bold 30px Arial";
          toolTipContext.fillStyle = "#fff";
          toolTipContext.fillText(txt, X - soustraction[0], Y - soustraction[1]);
          toolTipContext.stroke();
          chartCanvas.style.cursor = "none";
        } else {
          toolTipContext.clearRect(0, 0, toolTipCanvas.width, toolTipCanvas.height);
          chartCanvas.style.cursor = "initial";
        }
      }, false);
    }
  };

  (0, _react.useEffect)(function () {
    data.forEach(function (value, index) {
      drawSegment(index);
    });
    drawTooltip();
  }, []);
  return /*#__PURE__*/_react["default"].createElement(StyledPieChart, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "canvas_container"
  }, /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: chartRef,
    className: "canvas_chart",
    width: 500,
    height: 500
  }), /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: toolTipRef,
    className: "canvas_tooltip",
    width: 500,
    height: 500
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "chart_keys"
  }, data.map(function (value) {
    return /*#__PURE__*/_react["default"].createElement("p", {
      key: value.type,
      className: "chart_text"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "chart_dot",
      style: {
        color: "".concat(value.color)
      }
    }, "\u2022"), value.type);
  })));
};

PieChart.propTypes = {
  data: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    value: _propTypes["default"].number,
    color: _propTypes["default"].string,
    type: _propTypes["default"].string
  }))
};
var _default = PieChart;
exports["default"] = _default;
