// Mocked "search" function
const search = (searchInput, page) => {
  const testData = Array(10).fill({
    description: "image description",
    parentPage: "image parentPage",
    url: "image url"
  });
  
  // Slight delay before resolve
  return new Promise(resolve => {
    let delay = setTimeout(() => {
      clearTimeout(delay);
      resolve({
        data: {
          searchResults: testData
        }
      });
    }, 200)
  });
};

// Mocked "recent" function
const recent = () => {
  const testSearches1 = Array(20).fill({
    searchQuery: "cats",
    timeSearched: "October 10th 2022, 3:16:28 pm",
    _id: "6344374c2b0cea09e07dde74"
  });
  const testSearches2 = Array(25).fill({
    searchQuery: "dogs",
    timeSearched: "October 11th 2022, 3:16:28 pm",
    _id: "6344374c2b0cea09e07dde73"
  });
  
  // Slight delay before resolve
  return new Promise(resolve => {
    let delay = setTimeout(() => {
      clearTimeout(delay);
      resolve({
        data: {
          recentSearches: [...testSearches2, ...testSearches1]
        }
      });
    }, 200)
  });
};

export default { search, recent };