import styles from "./App.module.css"
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { useState } from "react"
import GameItem from "./components/game-item/GameItem"

const App = () => {
  const [gamesList, setGamesList] = useState([
    {id: 1, name: "Dota 2"}, 
    {id: 2, name: "League of Legends"},
    {id: 3, name: "CS:GO"},
    {id: 4, name: "World of Warcraft"},
    {id: 5, name: "The Witcher 3"}
  ]);

  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };

  const handleDragOver = (e) => {
    setOverId(e.over?.id || null);
  };

  const reorderGamesList = e => {
    if (!e.over) return

    setActiveId(null);
    setOverId(null);
    if (e.active.id !== e.over.id) {
      setGamesList(gamesList => {
        const oldIdx = gamesList.findIndex(game => game.id === e.active.id)
        const newIdx = gamesList.findIndex(game => game.id === e.over.id)
        return arrayMove(gamesList, oldIdx, newIdx)
      })
    }
  }

  const handleComponentClick = (index, component) => (event) => {
    if (event.ctrlKey) {
      // Ctrl key logic: Toggle selection
      setSelectedComponents((prevSelected) => {
        console.log(prevSelected);
        if (prevSelected.includes(component)) {
          return prevSelected.filter((comp) => comp !== component);
        } else {
          return [...prevSelected, component];
        }
      });
    } else if (event.shiftKey && lastSelectedIndex !== null) {
      // Shift key logic: Select range
      const newSelection = [];
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      for (let i = start; i <= end; i++) {
        newSelection.push(gamesList[i]);
      }
      setSelectedComponents(newSelection);
    } else {
      // Normal click logic: Single selection
      setSelectedComponents([component]);
    }
    setLastSelectedIndex(index); // Update last selected index
  };


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
  const index = gamesList.findIndex(game => game.id === overId);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={reorderGamesList}>
      <main className={styles.main}>
        <h1>Favorite Games List</h1>
        <ul className={styles.list}>
          <SortableContext items={gamesList}>
            {gamesList.map((game, index) => (
              <div
                onClick={handleComponentClick(index, game)}
                style={{
                  width: "100%",
                  border: selectedComponents.includes(game) ? "2px solid #1890ff" : "2px solid transparent"
                }}
              >
                <GameItem id={game.id}>{game.name}</GameItem>
              </div>
            ))}
          </SortableContext>
        </ul>
        <DragOverlay>
          {activeId ? (
            <GameItem id={activeId}>
              {gamesList.find((game) => game.id === activeId).name}
            </GameItem>
          ) : null}
        </DragOverlay>
      </main>
    </DndContext>
  )
}

export default App;

