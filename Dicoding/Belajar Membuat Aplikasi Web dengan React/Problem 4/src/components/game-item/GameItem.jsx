import { useSortable } from "@dnd-kit/sortable";
import styles from "./GameItem.module.css";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

const GameItem = props => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isOver,
    activeIndex,
    overIndex,
    isDragging,
  } = useSortable({ id: props.id });
  
  const sortDirection =
    activeIndex > overIndex
      ? "before"
      : activeIndex < overIndex
      ? "after"
      : null;
  
  const isShowIndicator = isOver && sortDirection !== null;

  const isDraggingOrSelected = isDragging || props.isDraggingOutside;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={clsx(styles.item, {
        [styles._active]: isShowIndicator,
        [styles._before]: sortDirection === "before",
        [styles._after]: sortDirection === "after"
      })}
      style={{
        opacity: props.isOverlay ? 1 : isDraggingOrSelected ? 0.5 : 1,
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {props.children}
    </div>
  )
}

export default GameItem;
