// Two pages are the same if both exist and their titles match.
function isSamePage(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }
  return pageA.title === pageB.title;
}
module.exports = { isSamePage };
