// Two pages are the same if both exist and their titles match.
function isSamePage(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }
  return pageA.title === pageA.title;
}
module.exports = { isSamePage };
