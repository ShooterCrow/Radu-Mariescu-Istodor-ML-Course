utils = {};

utils.formatPercent = (value) => {
  return Math.round(value * 100) + " %";
};

utils.displayPercent = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = utils.formatPercent(count / max);
  process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupedBy = (objArray, key) => {
  const groups = [];
  for (obj of objArray) {
    const val = obj[key]; // tje ids is now in val
    if (groups[val] == null) {
      groups[val] = []
    }
    groups[val].push(obj)
  }
  return groups
};

if (typeof module !== "undefined") {
  module.exports = utils;
}
