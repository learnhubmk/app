import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOhfddfghiJSUzUxMiJ9.eyJpc3MiOiJodHRwczovL3N0YWdpbmctYXBpLmxlYXJuaHViLm1rL2NvbnRlbnQvbG9naW4iLCJpYXQiOjE3MjM5MjE3ODcsImV4cCI6MTcyMzkyNTM4NywibmJmIjoxNzIzOTIxNzg3LCJqdGkiOiJFc05DRlpLTXpvcEhEZUhTIiwic3ViIjoiMjIiLCJwcnYiOiJlM2UzNTc2MjQxODRhNGRiNDRlYjE5MGY2ZTY2NDY1YTQxOTY5ZjEwIn0.VOf8Eo25wBE42PeulTlL5IRaZsjailMCKZfgMkWFbXnkj8NfK3MAlbcvldiAYL5okmNyoAUEGrlJA6eV1JGhne1LwLYLIU5tf_2_BrLDY5j_tQXEt5Tzsdsb0uEO4w07pBdzzqgblzv7jK7Mp7E6uWZ0dWc9NiMSomazifSC_tpe2nstxMgbnqQB1fLrkhihvRCabl4pYujX7whWrD2v2_o8D4iOgfZ29JVtdSu1Bv-2X9H-pcvjWcWbHNuwIWwABtfdwJRIn1fqnxf2q7TNPSOUKT_NpAuQjoHsRhkC6RI36mYK0naOOylIoCnYQt9PLqqm-H7YTmlU2vN7c1sfzrWqGI4pCooP_asybbvVqNQFm5eaPafXHhNcVOhexRbxKclR5e_BZ3nSqbM3NtbVrz4DBrVFpGTJrMP6fWAUz87_ra-a4JloKMhIchZxz2F1JUZe8AWomwLe8GE9WAWsDJc4LJSaAriB-q45VCzwS3JXh85_tnVz-ny9qwwdmc8P6QceHupI4b7KsXr2hp0DOK6X98cCsEfO2VI4OEgyobNzqi46c_cIjUtTkusa2t_lWxRNOP4j3MblmEyzE3XUUXJczNtBxxjFZyeKB7RSZxbWwG_qkwSEPLIvDInQY0oQov1cOdnX5nLsBBFV5hLjmoxUmhM0Np24xHB2jgzui6w'; // TODO: REPLACE LOGIC WHEN PROPER AUTH IS AVAILABLE, CURRENTLY HARDCODED
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
