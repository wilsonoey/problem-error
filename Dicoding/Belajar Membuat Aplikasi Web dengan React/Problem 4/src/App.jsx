import styles from "./App.module.css";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import GameItem from "./components/game-item/GameItem";

const App = () => {
  const [gamesList, setGamesList] = useState([
    {id: "a", name: "Dota 2"}, 
    {id: "b", name: "League of Legends"},
    {id: "c", name: "CS:GO"},
    {id: "d", name: "World of Warcraft"},
    {id: "e", name: "The Witcher 3"},
    {id: "f", name: "Mobile Legends"},
    {id: "g", name: "Valorant"},
  ]);

  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  /**
   * 
   * @param {*} e 
   * 
   * Handle drag start event
   * 
   * Tangani event mulai seret
   */
  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };

  /**
   * 
   * @param {*} e 
   * 
   * Handle drag over event
   * 
   * Tangani event seret di atas
   */
  const handleDragOver = (e) => {
    setOverId(e.over?.id || null);
  };

  /**
   * 
   * @param {*} e 
   * @returns 
   * 
   * Reorder games list
   * 
   * Urutkan ulang daftar permainan
   */
  const reorderGamesList = (e) => {
    if (!e.over) return;

    setActiveId(null);

    const activeIndex = gamesList.findIndex((game) => game.id === e.active.id);
    const overIndex = gamesList.findIndex((game) => game.id === e.over.id);

    // if (selectedComponents.length > 1 && !selectedComponents.includes(gamesList[overIndex]) && overId) {
    //   const selectedGames = gamesList.filter((game) => selectedComponents.includes(game));
    //   const newGamesList = gamesList.filter((game) => !selectedComponents.includes(game));
    //   newGamesList.splice(overIndex, 0, ...selectedGames);
    //   setGamesList(newGamesList);
    // }
    //  && !selectedComponents.includes(gamesList[overIndex])
    if (selectedComponents.length > 1) {
      const selectedIndexes = selectedComponents.map((game) => gamesList.findIndex((g) => g.id === game.id));
      const sortedGamesList = selectedIndexes.sort((a, b) => a - b).map((index) => gamesList[index]);
      const newGamesList = gamesList.filter((game) => !selectedComponents.includes(game));
      newGamesList.splice(overIndex, 0, ...sortedGamesList);
      setGamesList(newGamesList);
    } else {
      setGamesList((gamesList) =>
        arrayMove(gamesList, activeIndex, overIndex)
      );
    }
  };

  /**
   * 
   * @param {*} index 
   * @param {*} component 
   * @returns 
   * 
   * Handle component click event
   * 
   * Tangani event klik komponen
   */
  const handleComponentClick = (index, component) => (event) => {
    if (event.ctrlKey) {
      setSelectedComponents((prevSelected) => {
        if (prevSelected.includes(component)) {
          return prevSelected.filter((comp) => comp !== component);
        } else {
          return [...prevSelected, component];
        }
      });
    } else if (event.shiftKey && lastSelectedIndex !== null) {
      /**
       * Select multiple items using shift key
       * 
       * Pilih beberapa item menggunakan tombol shift
       */
      const newSelection = [];
      /**
       * If the last selected index is greater than the current index,
       * 
       * Jika indeks yang terakhir dipilih lebih besar dari indeks saat ini,
       */
      const start = Math.min(lastSelectedIndex, index);
      /**
       * If the last selected index is less than the current index,
       * 
       * Jika indeks yang terakhir dipilih lebih kecil dari indeks saat ini,
       */
      const end = Math.max(lastSelectedIndex, index);
      for (let i = start; i <= end; i++) {
        newSelection.push(gamesList[i]);
      }
      setSelectedComponents(newSelection);
    } else {
      setSelectedComponents([component]);
    }
    setLastSelectedIndex(index);
  };
  
  /**
   * The `useSensors` hook is used to create a collection of sensors.
   * 
   * Hook `useSensors` digunakan untuk membuat kumpulan sensor.
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedComponents([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
  }, [selectedComponents.length, gamesList]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={reorderGamesList}>
      <main className={styles.main}>
        <h1>Favorite Games List</h1>
        <ul className={styles.list}>
          <SortableContext items={gamesList}>
            {gamesList.map((game, index) => (
              <div
                key={game.id} // Add a unique "key" prop
                onClick={handleComponentClick(index, game)}
                style={{
                  width: "100%",
                  border: selectedComponents.includes(game) ? "2px solid #1890ff" : "2px solid transparent"
                }}
              >
                <GameItem
                  id={game.id}
                  isDraggingOutside={activeId && selectedComponents.includes(game)}
                >
                  {game.name}
                </GameItem>
              </div>
            ))}
          </SortableContext>
        </ul>
        <DragOverlay>
          {activeId ? (
            selectedComponents.length > 0 ? (
              selectedComponents.map((game) => (
                <div style={{ marginBottom: "16px" }}>
                  <GameItem key={game.id} id={game.id} isOverlay={false} isDraggingOutside>
                    {game.name}
                  </GameItem>
                </div>
              ))
            ) : (
              <GameItem id={activeId} isOverlay={true} isDraggingOutside>
                {gamesList.find((game) => game.id === activeId)?.name}
              </GameItem>
            )
          ) : null}
        </DragOverlay>
      </main>
    </DndContext>
  );
}

export default App;
