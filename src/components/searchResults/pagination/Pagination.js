import "./Pagination.css";

export default function Pagination(props) {
  return (
    <div className="searchResults-list-pagination">
      {(props.page > 1) && 
        <button onClick={() => props.handlePage("prev")}>Prev</button>}
      <div>Page {props.page}</div>
      <button onClick={() => props.handlePage("next")}>Next</button>
    </div>
  );
};