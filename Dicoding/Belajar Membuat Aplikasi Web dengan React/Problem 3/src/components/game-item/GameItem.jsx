import { useSortable } from "@dnd-kit/sortable"
import styles from "./GameItem.module.css"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react";

const GameItem = props => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={styles.item}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {props.children}
    </div>
  )
}

export default GameItem
