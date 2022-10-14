import "./Pagination.css";

export default function Pagination(props) {
  return (
    <div className="recentSearches-pagination">
      {(props.page > 1) && 
        <button 
          role="pagination-prev"
          onClick={() => props.handlePage("prev")}>Prev</button>}
      <div role="pagination-page">Page {props.page}</div>
      {((props.recentSearches.length - (props.page * 20)) > 0) && 
        <button 
          role="pagination-next"
          onClick={() => props.handlePage("next")}>Next</button>}
    </div>
  );
};