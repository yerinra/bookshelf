import axios from "axios";

// export const fetchNaverData = async (keyword) => {
//   try {
//     const response = await axios
//       .get("/api", {
//         params: { query: keyword },
//         headers: {
//           "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
//           "X-Naver-Client-Secret": import.meta.env.VITE_CLIENT_SECRET,
//         },
//       })
//       .then((response) => {
//         console.log("response", response.data);
//       });
//     return response;
//   } catch {
//     console.log("error");
//   }
// };

export const fetchBooksData = async (keyword, pageNum: number) => {
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
  } catch {
    console.log("error");
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
