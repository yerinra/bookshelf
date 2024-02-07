import axios from "axios";

export const fetchBooksData = async (keyword: string, pageNum: number) => {
  try {
    const response = await axios.get("/keyword", {
      params: {
        Query: keyword,
        Start: pageNum,
        ttbkey: import.meta.env.VITE_TTB_KEY,
        output: "js",
        Version: 20131101,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const fetchBook = async (isbn13: string) => {
  try {
    const response = await axios.get("/isbn", {
      params: {
        itemIdType: "ISBN13",
        itemId: isbn13,
        cover: "big",
        ttbkey: import.meta.env.VITE_TTB_KEY,
        output: "js",
        Version: 20131101,
      },
    });

    return response;
  } catch (err) {
    console.error(err);
  }
};
