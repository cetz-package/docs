import React from "react";
import Type from "./Type";

function getAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

export default function Parameter({
  children,
  name,
  default_value = undefined,
  types,
}) {
  const anchor = getAnchor(name);
  types = types.split(",");
  return (
    <div>
      <div className="parameter-details">
        <div className="main-details">
          <h4 id={anchor}>{name}: </h4>
          <div className="type-details">
            {types.map((t, i) => (
              <span>
                {i !== 0 ? " or " : ""} <Type>{t}</Type>
              </span>
            ))}
          </div>
        </div>
        <span>
          {default_value === undefined ? null : (
            <span>
              Default: <code>{default_value}</code>
            </span>
          )}
          <a
            href={`#${anchor}`}
            className="hash-link"
            aria-label={`Direct link to ${name}`}
            title={`Direct link to ${name}`}
          >
            ​
          </a>
        </span>
      </div>
      <p className="parameter-description">{children}</p>
    </div>
  );
}
