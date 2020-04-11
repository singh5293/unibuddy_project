import { SearchMasterData } from "./data";
let { summaries, titles, authors } = SearchMasterData;

let wordMap = {};
export function create() {
  summaries.forEach((summary) => {
    summary.summary.split(" ").forEach((item) => {
      if (!(item in wordMap)) {
        wordMap[item] = new Set([summary.id]);
      } else {
        wordMap[item].add(summary.id);
      }
    });
  });
}

export function search(query, k) {
  let occuranceCount = {};
  let queryParams = query.split(" ");
  queryParams.forEach((params) => {
    if (params in wordMap) {
      let arr = [...wordMap[params]];
      arr.forEach((item) => {
        if (item in occuranceCount) {
          occuranceCount[item] += 1;
        } else {
          occuranceCount[item] = 1;
        }
      });
    }
  });
  let sortedKeys = Object.keys(occuranceCount)
    .sort(function (a, b) {
      return occuranceCount[b] - occuranceCount[a];
    })
    .slice(0, k);

  let filteredData = summaries
    .filter((summary) => {
      return sortedKeys.indexOf(summary.id.toString()) !== -1;
    })
    .map((item) => {
      return {
        ...item,
        title: titles[item.id],
        author: authors.filter((author) => author.book_id === item.id),
      };
    });

  return filteredData;
}
