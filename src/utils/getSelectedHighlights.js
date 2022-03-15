import { apiGetRequest } from "./api/apiMethods";
import { FilterOptions } from "./types";

export default async (option) => {
  switch (option?.value) {
    case FilterOptions.Mine:
      return await apiGetRequest("highlights");
    case FilterOptions.Private:
      return await apiGetRequest("highlights", { isPrivate: true });
    case FilterOptions.Favourite:
      return await apiGetRequest("highlights", { isFavorite: true });
    default:
      return await apiGetRequest("highlights/all");
  }
};
