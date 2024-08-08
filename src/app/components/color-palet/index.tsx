"use client";

import { useRef } from "react";
import style from "./color-pale.style.module.scss";
import useOutsideElementClick from "@/app/hooks/useOutsideElementClick";

export default function ColorPalett() {
  const wrapperRef = useRef(null);
  useOutsideElementClick(wrapperRef);

  const colors = [
    "#BAE2FF",
    "#B9FFDD",
    "#FFE8AC",
    "#FFCAB9",
    "#F99494",
    "#9DD6FF",
    "#ECA2FF",
    "#DAFF8B",
    "#FFA285",
    "#CDCDCD",
    "#979797",
    "#A99A7C",
  ];

  return (
    <div ref={wrapperRef} className={style.palette}>
      {colors.map((c) => (
        <div
          /* TODO: implement the API call for changing colors */
          key={c}
          style={{ backgroundColor: c }}
        ></div>
      ))}
    </div>
  );
}
