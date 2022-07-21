const nextElementInList = (list, value) => {
  const currentValueIndex = list.indexOf(value); // 0 starts from build when it's finished
  const nextValueIndex = (currentValueIndex + 1) % list.length; // give the index without getting out of the confines of the array
  const nextValue = list[nextValueIndex];
  return nextValue;
};

export default nextElementInList;
