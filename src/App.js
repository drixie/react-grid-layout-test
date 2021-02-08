import React from "react";
import "./styles.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import GridLayout from "react-grid-layout";

const MyFirstGrid = function () {
  const handleLayoutChange = function (layout) {
    console.log("Layout has changed");
    console.log(layout);
    setLayout(layout);
  };
  // layout is an array of objects, see the demo for more complete usage
  const [layout, setLayout] = React.useState([]);

  const initialLayout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];

  const boxes = [
    { name: "a", items: ["Peter", "James", "Palancas Negras"] },
    {
      name: "b",
      items: [
        "Peter",
        "James",
        "Palancas Negras",
        "Peter",
        "James",
        "Palancas Negras",
        "Peter",
        "James",
        "Palancas Negras",
        "Peter",
        "James",
        "Palancas Negras"
      ]
    },
    {
      name: "c",
      items: [
        "Peter",
        "James",
        "Palancas Negras",
        "Peter",
        "James",
        "Palancas Negras"
      ]
    }
  ];

  React.useEffect(() => {
    let newLayout = initialLayout;

    initialLayout.map((row, index) => {
      const box = boxes.find((box) => box.name === row.i);
      console.log("before update of " + box.name, row.h);
      row.h = Math.ceil(box.items.length / 5) + 1;
      console.log("after update of " + box.name, row.h);
      newLayout[index] = row;
      return true;
    });

    // boxes.map(box, (index) => {
    //   boxSize = newLayout.find((row) => row.i == box.name);

    //   newLayout.map(grid => {
    //     if (grid.i == box.a) {
    //       grid.h = Math.ceil(box.items.length/5)
    //     }
    //   })
    // });
    setLayout(newLayout);
    const storedLayout = localStorage.getItem("grid");
    if (storedLayout) {
      setLayout(JSON.parse(storedLayout));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("grid", JSON.stringify(layout));
  }, [layout]);

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={50}
      width={1200}
      onLayoutChange={handleLayoutChange}
    >
      {boxes.map((box) => {
        return (
          <div key={box.name} className="box">
            {box.items.map((item, index) => (
              <li key={item + index}>{item}</li>
            ))}
          </div>
        );
      })}
    </GridLayout>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <MyFirstGrid />
    </div>
  );
}
