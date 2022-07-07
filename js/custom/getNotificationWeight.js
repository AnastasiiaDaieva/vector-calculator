export function getNotificationWeight(words) {
  let n = words.replace(/[\[\]?.,\/#!$%\^&\*;:{}=\\|_~()]/g, "").split(" ");
  return parseInt(n[n.length - 1]);
}
