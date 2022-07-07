import refs from "./refs.js";

const { dropdownList, overlay } = refs;

export function showDropdown() {
  dropdownList.classList.add("show");
  overlay.classList.add("show-table");
}
export function hideDropdown() {
  overlay.classList.remove("show-table");
  dropdownList.classList.remove("show");
}
