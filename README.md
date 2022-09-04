# React Pie Graph Chart

<p align="center"><a href="https://www.npmjs.com/package/react-pie-graph-chart" target="_blank"><img src="https://user-images.githubusercontent.com/90270530/188328352-0754a332-8e5e-44fd-93c4-c0848d213eec.png" width="400"></a></p>

<br>

<a href="https://codesandbox.io/s/react-pie-graph-chart-leeoxs" target="_blank"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit On CodeSandbox" height="41" width="174"></a>


## Installation

```sh
npm install react-pie-graph-chart
```

```sh
yarn add react-pie-graph-chart
```

## Usage

1 . Require `react-pie-graph-chart` after installation

```js
import PieChart from 'react-pie-graph-chart';
```

2 . Include PieChart component

```jsx
<PieChart data={...} />
```

## Configuration

#### data prop expects an array of objects that accepts the following properties:

- **`type`**: key value.

- **`value`**: represents the percentage that each slice is worth.

- **`color`**: slice color <u>need to be in hexadecimal</u>.

## Example

```jsx
<PieChart data={[
    {
      type: "Bus",
      value: 235,
      color: "#E97D30"
    },
    {
      type: "Bicycle",
      value: 165,
      color: "#62B170"
    },
    {
      type: "Train",
      value: 90,
      color: "#F1AF13"
    },
    {
      type: "Car",
      value: 345,
      color: "#4BA2DA"
    }
  ]} />
```

<br>

### 👍 If you liked this repository
### ⭐ Feel free to leave a star 
