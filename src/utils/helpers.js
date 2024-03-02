export function filterDuplicatedItems(arr) {
  let newArr = [];
  arr.forEach((item) => {
    if (
      !newArr.some((el) => {
        return el.id === item.id;
      })
    )
      newArr = [...newArr, item];
  });
  return newArr;
}

export function filterDuplicatedIds(arr) {
  return [...new Set(arr)];
}

export function showExactNumberIds(arr, startPoint, numItems) {
  return arr.slice(startPoint, startPoint + numItems);
}
