import { useState } from "react";
import PackItem from "./PackItem";

export default function PackingList({
  list,
  onDeleteItem,
  onToggleItem,
  onDeleteAllItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  const sortedList = (function () {
    if (sortBy === "input") return list;
    if (sortBy === "description")
      return [...list].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
    if (sortBy === "packed")
      return [...list].sort((a, b) => Number(a.packed) - Number(b.packed));
  })();
  return (
    <div className="list">
      <ul>
        {sortedList.map((item) => (
          <PackItem
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={handleSortBy}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteAllItems}>Clear list</button>
      </div>
    </div>
  );
}
