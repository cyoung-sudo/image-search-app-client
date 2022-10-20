import "./Pagination.css";

export default function Pagination(props) {
  return (
    <div className="recentSearches-pagination">
      {(props.page > 1) && 
        <button onClick={() => props.handlePage("prev")}>Prev</button>}
      <div>Page {props.page}</div>
      {((props.recentSearches.length - (props.page * 20)) > 0) && 
        <button onClick={() => props.handlePage("next")}>Next</button>}
    </div>
  );
};