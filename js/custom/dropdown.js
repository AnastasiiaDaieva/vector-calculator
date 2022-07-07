import refs from "./refs.js";

const { dropdownList } = refs;

export function showDropdown() {
  dropdownList.classList.add("show");
}
export function hideDropdown() {
  dropdownList.classList.remove("show");
}
