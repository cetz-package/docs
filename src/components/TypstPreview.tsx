import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import classes from "./TypstPreview.module.css";

export default function TypstPreview({
  isVertical,
  children,
}: PropsWithChildren<{ isVertical: boolean }>) {
  return (
    <div className={clsx(classes.wrapper, isVertical && classes.vertical)}>
      {children}
    </div>
  );
}
