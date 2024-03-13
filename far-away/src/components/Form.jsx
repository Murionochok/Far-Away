import { useState } from "react";

export default function Form({ onAddItems }) {
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
