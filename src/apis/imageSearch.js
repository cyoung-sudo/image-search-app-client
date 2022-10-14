import axios from "axios";

// Request images for given page
const search = (searchInput, page) => {
  return axios.post("/api/imageSearch", { 
    searchInput,
    page: (page * 10)
  })
};

// Request for recent searches
const recent = () => {
  return axios.get("/api/imageSearch")
}

export default { search, recent };