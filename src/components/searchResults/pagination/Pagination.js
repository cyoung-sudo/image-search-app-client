import "./Pagination.css";

export default function Pagination(props) {
  return (
    <div className="searchResults-list-pagination">
      {(props.page > 1) && 
        <button 
          role="pagination-prev" 
          onClick={() => props.handlePage("prev")}>Prev</button>}
      <div role="pagination-page">Page {props.page}</div>
      <button 
        role="pagination-next"
        onClick={() => props.handlePage("next")}>Next</button>
    </div>
  );
};