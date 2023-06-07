import React from "react";

const BooksList = ({ inLoading, books ,Dispatch,deleteBooks,readClick}) => {
    const bookList = books.length
        ? books.map((element) => (
              <li
                  className="list-group-item d-flex  justify-content-between align-items-center"
                  key={element.id}
              >
                  <div>{element.name}</div>
                  <div className="btn-group" role="group">
                      <button type="button" className="btn btn-primary" onClick={()=>readClick(element.id)}>
                          Read
                      </button>
                      <button type="button" className="btn btn-danger" onClick={()=>Dispatch(deleteBooks(element.id))} >
                          Delete
                      </button>
                  </div>
              </li>
          ))
        : "there is no book available";

    return (
        <div>
            <h2>Books List</h2>
            {inLoading ? (
                "Loading..."
            ) : (
                <ul className="list-group">{bookList}</ul>
            )}
        </div>
    );
};

export default BooksList;
