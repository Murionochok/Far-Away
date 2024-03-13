export default function Stats({ list }) {
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
