import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { observer } from "mobx-react-lite";
import { emotionsStore } from "";
import EmotionCard from "";
import Swipeable from "";
import styles from "./BoardListSortable.module.css";

function Row({
  id,
  children,
  onSwipe,
}: {
  id: string;
  children: React.ReactNode;
  onSwipe: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.item}
      {...attributes}
      {...listeners}
    >
      <Swipeable onSwipedLeft={onSwipe}>{children}</Swipeable>
    </div>
  );
}

export default function BoardList() {
  const items = emotionsStore.filtered;
  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const ids = items.map((i) => i.id);
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from < 0 || to < 0) return;
    const next = [...ids];
    next.splice(to, 0, next.splice(from, 1)[0]);
    emotionsStore.reorder(next);
  };

  return (
    <div className={styles.list}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((i) => (
            <Row
              key={i.id}
              id={i.id}
              onSwipe={() => emotionsStore.remove(i.id)}
            >
              <EmotionCard item={i} />
            </Row>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
