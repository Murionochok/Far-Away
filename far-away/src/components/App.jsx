import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function toggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleDeleteAllItems() {
    const confirmed = window.confirm("Are you sure to delete all the items?");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <header>
        <Logo />
      </header>
      <main>
        <Form onAddItems={handleItems} />
        <PackingList
          list={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={toggleItem}
          onDeleteAllItems={handleDeleteAllItems}
        />
      </main>
      <footer className="stats">
        <Stats list={items} />
      </footer>
    </div>
  );
}
