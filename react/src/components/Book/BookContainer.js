import React, { Fragment, useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { getBooks, deleteBooks } from "../../store/bookSlice";
import { useDispatch, useSelector } from "react-redux";

import "./book.css";

const PostContainer = () => {
    const [bookInfo, setBookInfo] = useState({});
    const { isLoading, books } = useSelector((state) => state.books);
    const Dispatch = useDispatch();
    useEffect(() => {
        Dispatch(getBooks());
    }, [Dispatch]);

    function handlerInfoBookRead(id) {
        const bookSelected = books.find((book) => book.id === id);
        setBookInfo((prev)=>{return {...prev,...bookSelected}});
    }
    

    return (
        <Fragment>
            <hr className="my-5" />
            <div className="row">
                <div className="col">
                    <BooksList
                        inLoading={isLoading}
                        books={books}
                        Dispatch={Dispatch}
                        deleteBooks={deleteBooks}
                        readClick={handlerInfoBookRead}
                    />
                </div>
                <div className="col side-line">
                    <BookInfo info={bookInfo}/>
                </div>
            </div>
        </Fragment>
    );
};

export default PostContainer;
