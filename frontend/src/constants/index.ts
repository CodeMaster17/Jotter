import { ILinkItem } from "@/types";

export const LOCAL_STORAGE_PROFESSIONAL_LINKS =
  "professionalLinks" as keyof ILinkItem;

export const errorMessage = {
  LINK_DELETED_SUCCESS: "Link deleted successfully",
  LINK_ADDED: "Link added successfully",
  LINK_UPDATED: "Link updated successfully",
  LINK_ADDED_ERROR: "Error adding link",
  LINK_UPDATED_ERROR: "Error updating link",
  LINK_DELETED_ERROR: "Error deleting link",
  LINK_FETCH_ERROR: "Error fetching links",
  LINKS_FETCHED: "Links fetched successfully",
  LINKS_FETCHED_ERROR: "Error fetching links",
  LINKS_EMPTY: "No links found",
  LINKS_LOADING: "Loading links",
  LINKS_LOADING_ERROR: "Error loading links",
  LINKS_LOADING_SUCCESS: "Links loaded successfully",
  LINKS_LOADING_EMPTY: "No links found",
};
