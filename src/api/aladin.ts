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

export const fetchAladinData = async (keyword) => {
  try {
    const response = await axios
      .get("/api", {
        params: {
          Query: keyword,
          ttbkey: import.meta.env.VITE_TTB_KEY,
          output: "js",
          Version: 20131101,
        },
      })
      .then((response) => {
        console.log("response", response.data);
      });
    return response;
  } catch {
    console.log("error");
  }
};
