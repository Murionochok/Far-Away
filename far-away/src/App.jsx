import { useEffect, useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Passports", quantity: 2, packed: true },
  { id: 4, description: "Socks", quantity: 12, packed: false },
];

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
        />
      </main>
      <footer className="stats">
        <Stats list={items} />
      </footer>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}

function Form({ onAddItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSelect(e) {
    setQuantity(e.target.value);
  }
  function handleInput(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      alert("You forgot to fill all the fields.");
      return;
    }
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need 😍 for you trip?</h3>
      <select value={quantity} onChange={handleSelect}>
        {Array.from({ length: 20 }, (_, i) => (i = i + 1)).map((element) => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleInput}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ list, onDeleteItem, onToggleItem }) {
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
      </div>
    </div>
  );
}

function PackItem({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </span>
    </li>
  );
}

function Stats({ list }) {
  if (!list.length) {
    return <em>Start adding some items to your packing list 🚀!</em>;
  }
  const numOfListItems = list.length;
  const numOfPackedItems = list.filter((item) => item.packed).length;
  const percentage = Math.round((numOfPackedItems / numOfListItems) * 100);
  return (
    <>
      {percentage !== 100 ? (
        <em>
          🎒You have {numOfListItems} items in your list, and you have already
          packed {numOfPackedItems} ({percentage}%)
        </em>
      ) : (
        <em>You got everything! Ready to go ✈</em>
      )}
    </>
  );
}
