"use client";

import { ChangeEvent, useRef, useState } from "react";
import ColorPalett from "../color-palet";
import IconWrapper from "../icon-wrapper";
import ActiveStarIcon from "../icons/active-star";
import FillIcon from "../icons/fill";
import InactiveStarIcon from "../icons/inactive-star";
import PencilIcon from "../icons/pencil";
import XIcon from "../icons/x";
import style from "./todo.module.scss";
import generateDarkerHex from "../utils/generate-darker-hex";
import useOutsideElementClick from "@/app/hooks/useOutsideElementClick";

type TodoProps = {
  title?: string;
  description?: string;
  color?: string;
  favorite?: boolean;
};

export default function Todo({
  title = "",
  description = "",
  color = "#FFFFFF",
  favorite,
}: TodoProps) {
  // TODO: implement API call to edit todo fields
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [todoColor, setTodoColor] = useState(color);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  
  /**
   * 
   * The core palette will close if a click 
   * happens outside of it
   * 
   */
  const wrapperRef = useRef(null);
  useOutsideElementClick(wrapperRef, () => setIsPaletteOpen(false));

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.currentTarget.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoDescription(e.currentTarget.value);
  };

  const handlePalette = () => {
    setIsPaletteOpen(!isPaletteOpen);
  };

  const darkerTodoHex = generateDarkerHex(color);

  return (
    // TODO: only favorited todos have shadow
    <div style={{ backgroundColor: todoColor }} className={`${style.todo}`}>
      <div className={style.head}>
        <input
          type="text"
          placeholder="Título"
          value={todoTitle}
          onChange={handleTitle}
        />
        {/* TODO: implement API call to favorite todo */}
        {favorite ? <ActiveStarIcon /> : <InactiveStarIcon />}
      </div>
      <div className={style.body}>
        <textarea
          placeholder="Clique ou arraste o arquivo para esta área para fazer upload"
          value={todoDescription}
          onChange={handleDescription}
        />
        <div className={style.foot}>
          <div>
            <IconWrapper color={darkerTodoHex}>
              <PencilIcon />
            </IconWrapper>
            <IconWrapper onClick={handlePalette} color={darkerTodoHex}>
              <FillIcon />
            </IconWrapper>
          </div>
          {/* TODO: implement api call to delete todo */}
          <IconWrapper color={darkerTodoHex}>
            <XIcon />
          </IconWrapper>
        </div>
      </div>
      {isPaletteOpen && (
        <div ref={wrapperRef} >
          <ColorPalett />
        </div>
      )}
    </div>
  );
}
