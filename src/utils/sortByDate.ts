type CollectionEntry = {
  data: {
    date: Date;
  };
};

export function sortByDate<T extends CollectionEntry>(a: T, b: T) {
  return b.data.date.getTime() - a.data.date.getTime();
}
