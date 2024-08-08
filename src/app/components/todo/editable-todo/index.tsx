"use client";

import { ChangeEvent, useRef, useState } from "react";
import ColorPalett from "../../color-palet";
import IconWrapper from "../../icon-wrapper";
import ActiveStarIcon from "../../icons/active-star";
import FillIcon from "../../icons/fill";
import InactiveStarIcon from "../../icons/inactive-star";
import PencilIcon from "../../icons/pencil";
import XIcon from "../../icons/x";
import styles from "./editable-todo.module.scss";
import shared from "../shared.module.scss"
import generateDarkerHex from "../../utils/generate-darker-hex";
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
  const [isBeingEdited, setIsBeingedited] = useState(false);

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
    <div style={{ backgroundColor: todoColor }} className={`${shared.todo} ${styles.todo}`}>
      <div className={shared.head}>
        <input
          name="Título"
          title="Insira um título em sua nota"
          type="text"
          placeholder="Título"
          value={todoTitle}
          onChange={handleTitle}
          disabled={!isBeingEdited}
        />
        {/* TODO: implement API call to favorite todo */}
        {favorite ? <ActiveStarIcon /> : <InactiveStarIcon />}
      </div>
      <div className={shared.body}>
        <textarea
          name="Descrição"
          title="Insira uma descrição em sua nota"
          placeholder="Clique ou arraste o arquivo para esta área para fazer upload"
          value={todoDescription}
          onChange={handleDescription}
          disabled={!isBeingEdited}
        />
        <div className={styles.foot}>
          <div>
            {/* TODO: implement state of being edited */}
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
        <div ref={wrapperRef}>
          <ColorPalett onClick={handlePalette} />
        </div>
      )}
    </div>
  );
}
