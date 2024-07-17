import React from "react";
import Type, { fromString } from "./Type";

// const alt_links = {
//   name: "/docs/basics/anchors",
//   anchors: "/docs/basics/anchors",
//   "..style": "/docs/basics/styling"
// }

export default function Function({ name, parameters, returns = null }) {
  return (
    <pre className="function-definition">
      <span className="name">{name}</span>(
      <div className="parameters">
        {Object.entries(parameters).map(([name, value]) => {
          return (
            <span className="parameter">
              <a href={"#" + name.replace("..", "")}>{name}</a>:{" "}
              {fromString(value.types, false)},
            </span>
          );
        })}
      </div>
      ) {returns && <>-> {fromString(returns)} </>}
    </pre>
  );
}
