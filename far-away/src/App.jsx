import { useEffect, useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Passports", quantity: 2, packed: true },
  { id: 4, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <header>
        <Logo />
      </header>
      <main>
        <Form />
        <PackingList list={initialItems} />
      </main>
      <footer className="stats">
        <Stats />
      </footer>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}

function Form() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  function handleSelect(e) {
    setQuantity(+e.target.value);
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

function PackingList(props) {
  return (
    <div className="list">
      <ul>
        {props.list.map((item) => (
          <PackItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function PackItem({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description} <button>❌</button>
      </span>
    </li>
  );
}

function Stats() {
  return (
    <em>🎒You have X items in your list, and you already have packed Y%</em>
  );
}
