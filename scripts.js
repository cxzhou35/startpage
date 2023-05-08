/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");

const lookup = {
  reddit: "https://reddit.com/",
  maps: "https://maps.google.com/",
  bili: "https://search.bilibili.com/all",
  dl: "https://deepl.com/",
  ytb: "https://www.youtube.com/",
};
const engine = "google";
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
};

const isWebUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getTargetUrl = (value) => {
  if (isWebUrl(value)) return value;
  if (lookup[value]) return lookup[value];
  return engineUrls[engine] + value;
};

const search = () => {
  const value = searchInput.value;
  const targetUrl = getTargetUrl(value);
  window.open(targetUrl, "_self");
};

searchInput.onkeyup = (event) => event.key === "Enter" && search();
searchButton.onclick = search;

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    id: "nipUdekbDVOjqkbU",
    label: "ZJU",
    bookmarks: [
      {
        id: "4Xd8TEGoKqVqaVcz",
        label: "Course",
        url: "https://course.zju.edu.cn/en-us/",
      },
      {
        id: "bGtq8dJJxd7nMv8w",
        label: "ZJU Mail",
        url: "https://mail.zju.edu.cn/",
      },
      {
        id: "2W2q0XhPFF0B7neR",
        label: "NexusHD",
        url: "http://www.nexushd.org/index.php",
      },
    ],
  },
  {
    id: "82awzrnbQuxcFYiN",
    label: "Daily",
    bookmarks: [
      { id: "Uqeq9BmKti7b6Gom", label: "GitHub", url: "https://github.com/" },
      { id: "mhqhmXXEfcmsnkqi", label: "YouTube", url: "https://youtube.com/" },
      {
        id: "vxRX8LWISVlRyqKa",
        label: "Bilibili",
        url: "https://www.bilibili.com/",
      },
    ],
  },
  {
    id: "4QckM1Lqt58o1REk",
    label: "Research",
    bookmarks: [
      {
        id: "Ey8iyDKe4mEVNT2Y",
        label: "Poe Sage",
        url: "https://poe.com/Sage",
      },
      {
        id: "21nzPZrHn072Zpub",
        label: "Quick Reference",
        url: "https://wangchujiang.com/reference/",
      },
      {
        id: "TQzx9NK4DYGvLr5f",
        label: "arXiv",
        url: "https://arxiv.org/list/cs.CV/recent",
      },
    ],
  },
];

const createGroupContainer = () => {
  const container = document.createElement("div");
  container.className = "bookmark-group";
  return container;
};

const createGroupTitle = (title) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  return h2;
};

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.innerHTML = label;
  li.append(a);
  return li;
};

const createBookmarkList = (bookmarks) => {
  const ul = document.createElement("ul");
  bookmarks.map(createBookmark).forEach((li) => ul.append(li));
  return ul;
};

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer();
  const title = createGroupTitle(label);
  const bookmarkList = createBookmarkList(bookmarks);
  container.append(title);
  container.append(bookmarkList);
  return container;
};

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarksContainer.append();
  bookmarks
    .map(createGroup)
    .forEach((group) => bookmarksContainer.append(group));
};

injectBookmarks();
