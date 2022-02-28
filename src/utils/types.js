export const FilterOptions = Object.freeze({
  Public: "all public ones",
  Private: "my private ones",
  Favourite: "my favorited ones",
  Mine: "all mine ones",
});

export const FilterDisplayOptions = [
  {
    title: "All Public Highlights",
    value: FilterOptions.Public,
  },
  {
    title: "Only Mine",
    value: FilterOptions.Mine,
  },
  {
    title: "Only My Private Ones",
    value: FilterOptions.Private,
  },
  {
    title: "Only My Favorite ones",
    value: FilterOptions.Favourite,
  },
];
