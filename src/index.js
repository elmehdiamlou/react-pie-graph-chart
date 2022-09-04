import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledPieChart = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;

  .canvas_container {
    position: relative;
  }
  .canvas_chart {
    height: 250px;
    width: 250px;
    margin-block: 25px;
  }
  .canvas_tooltip {
    position: absolute;
    left: 0;
    height: 250px;
    width: 250px;
    margin-block: 25px;
    pointer-events: none;
  }
  .chart_keys {
    margin-block: auto;
  }
  .chart_text {
    height: fit-content;
    margin-bottom: 5px;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
  .chart_dot {
    font-size: 34px;
    line-height: 0;
    margin-right: 5px;
  }
`;

const oneDemi = 1.65;
const two = 2;
const ten = 10;
const twenty = 20;
const thirty = 30;
const fourty = 41;
const thousand = 100;

const circleDegrees = 360;
const hexRadix = 16;

const soustraction = [thirty, thirty / two];

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const toolTipRef = useRef(null);
  const total = data.reduce((r, value) => value.value + r, 0);

  const degreesToRadians = (degrees) =>
    (degrees * Math.PI) / (circleDegrees / two);

  const sumTo = (initial) => {
    let sum = 0;
    let step = 0;
    while (step < initial) {
      sum += data[step].value;
      step += 1;
    }
    return (sum * circleDegrees) / total;
  };

  const calcPercent = (value) => Math.floor(((value * thousand) / total) * thousand) / thousand;

  const rgbToHex = (colorPart) => {
    const hex = colorPart.toString(hexRadix);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const getPercentFromColor = (color) => {
    const content = data.find((c) =>
      c.color.toLowerCase().includes(color.toLowerCase())
    );
    return calcPercent(content?.value ?? 0);
  };

  const drawSegment = (index) => {
    const canvas = chartRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      const el = data[index];
      const centerX = Math.floor(canvas.width / two);
      const centerY = Math.floor(canvas.height / two);
      const radius = Math.floor(canvas.width / two - thousand / two);
      const startingAngle = degreesToRadians(sumTo(index));
      const arcSize = degreesToRadians((el.value * circleDegrees) / total);
      const endingAngle = startingAngle + arcSize;

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

  const drawTooltip = () => {
    const chartCanvas = chartRef.current;
    const toolTipCanvas = toolTipRef.current;
    const chartContext = chartCanvas?.getContext("2d");
    const toolTipContext = toolTipCanvas?.getContext("2d");

    if (chartCanvas && toolTipCanvas && chartContext && toolTipContext) {
      chartCanvas.addEventListener(
        "mousemove",
        (e) => {
          const rect = chartCanvas.getBoundingClientRect();
          const X =
            ((e.clientX - rect.left) / (rect.right - rect.left)) *
            chartCanvas.width;
          const Y =
            ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
            chartCanvas.height;
          const color = chartContext.getImageData(X, Y, 1, 1).data;
          const hexColor = `#${rgbToHex(color[0])}${rgbToHex(
            color[1]
          )}${rgbToHex(color[two])}`;
          const txt = `${getPercentFromColor(hexColor)}%`;

          if (txt !== "0%") {
            const { width } = toolTipContext.measureText(txt);
            toolTipContext.clearRect(
              0,
              0,
              toolTipCanvas.width,
              toolTipCanvas.height
            );
            toolTipContext.fillStyle = "#130F26";
            toolTipContext.fillRect(
              X - fourty / two - soustraction[0] - twenty,
              Y - thirty - soustraction[1],
              width + fourty,
              fourty
            );
            toolTipContext.beginPath();
            toolTipContext.moveTo(
              X - fourty / two - thirty + width / oneDemi - twenty,
              Y - two * two
            );
            toolTipContext.lineTo(
              X - fourty / two - ten + width / oneDemi - twenty,
              Y - two * two
            );
            toolTipContext.lineTo(
              X - fourty / two - twenty + width / oneDemi - twenty,
              Y + ten - two * two
            );
            toolTipContext.fill();
            toolTipContext.font = "bold 30px Arial";
            toolTipContext.fillStyle = "#fff";
            toolTipContext.fillText(
              txt,
              X - soustraction[0] - twenty + oneDemi,
              Y - soustraction[1] + 1.5
            );
            toolTipContext.stroke();
            chartCanvas.style.cursor = "none";
          } else {
            toolTipContext.clearRect(
              0,
              0,
              toolTipCanvas.width,
              toolTipCanvas.height
            );
            chartCanvas.style.cursor = "initial";
          }
        },
        false
      );
    }
  };

  useEffect(() => {
    data.forEach((value, index) => {
      drawSegment(index);
    });
    drawTooltip();
  }, []);

  return (
    <StyledPieChart>
      <div className="canvas_container">
        <canvas
          ref={chartRef}
          className="canvas_chart"
          width={500}
          height={500}
        />
        <canvas
          ref={toolTipRef}
          className="canvas_tooltip"
          width={500}
          height={500}
        />
      </div>
      <div className="chart_keys">
        {data.map((value) => (
          <p key={value.type} className="chart_text">
            <span className="chart_dot" style={{ color: `${value.color}` }}>
              •
            </span>
            {value.type}
          </p>
        ))}
      </div>
    </StyledPieChart>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      color: PropTypes.string,
      type: PropTypes.string,
    })
  ),
};

export default PieChart;
