// App.js File
import React, { Component } from "react";
import {useState} from "react";


const books = [
    {title: "Dune", author: "Herbert"},
    {title: "Neuromancer", author: "Gibson"}
]


const BookCard = (props) => {
    // format book information
    console.log(props)
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.author}</p>
            <p>{props.book_key}</p>
        </div>
    );
}

const Counter = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <button onClick={() => setCounter(counter + 1)}>
                add Book
            </button>
            <p>you have {counter} books in list</p>
        </div>
    );
}

const BookResultCard = ({title, author, onAdd, onSelect}) => {
    // format book information

    return (
        <div>
            <h2>{title}</h2>
            <p>{author}</p>
            <button className="btn" onClick={onAdd}>Add to list</button> 
            <button className="btn" onClick={onSelect}>More info</button>
        </div>
    ); // calls onAdd passed function kinda lambda like?
}

const BookList = ({ bookList }) => {
    console.log("bookList is:", bookList);
    if (bookList.length > 0){
        return (
            <div>
            {bookList.map((book) => (
                <BookCard
                    book_key={book.key}
                    title={book.title}
                    author={book.author_name}
                />
            ))}
            </div>
        );
    }
}

const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const fetchBookDetails = async(book) => {
        // gonna add more data before its added to the booklist
        setLoading(true);
        const url = `https://openlibrary.org${book.key}.json`;
        const response = await fetch(url);
        const data = await response.json();
        setSelectedBook(data);
        setLoading(false);
    }

    const addBook = (book) => {
        setBookList([...bookList, book]);
    }

    // nested API search function
    const handleSearch = async () => {
        setLoading(true);
        const url = `https://openlibrary.org/search.json?q=${query}&limit=5`;
        const response = await fetch(url);
        const data = await response.json();

        setResults(data.docs);
        setLoading(false);
    }
    const handleSubmit = (e) => {
        // handles form sillyness
        // form submission reloads page otherwise
        e.preventDefault();
        handleSearch();
    }
    const getDescription = (description) => {
        if (!description) return "No description Available";
        else if (typeof description === "string") {
            return (
                <div>
                    <h3> Description: </h3>
                    <p>{description}</p>
                </div>
            )
        }
        else {
            console.error("getDescription error");
            return "No description Available";
        }
    }
    // form for the search, then loads the replys from API
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search book..."
                />
                <button className="btn btn-primary" type="submit">Search</button>
            </form>
            {loading && <p>Searching...</p>}
            <ul className="list rounded-box shadow-md">
                {results.map(book => (
                    <li className="list-row">
                        <BookResultCard
                            title={book.title}
                            author={book.author_name?.[0]}
                            onAdd={() => addBook(book)}
                            onSelect={() => fetchBookDetails(book)}
                        />
                    </li>
                ))}
            </ul>
            {selectedBook && (
                <div>
                    <h2>{selectedBook.title}</h2>
                    <p>{getDescription(selectedBook.description)}</p>
                    <div>
                    <h3>Book topics and subjects: </h3>
                        <ol className="list rounded-box shadow-md">
                        {selectedBook.subjects?.slice(0,5).map((subject, i) => (
                            <li className="list-row">
                                <span key={i}>{subject}</span>
                            </li>
                        ))}
                        </ol>
                    </div>
                </div>
                    
            )}
            <h2>My Book List</h2>
            <BookList bookList={bookList} />
        </div>
    );
}



class App extends Component {
    render() {
        return (
            <div>
                <BookSearch />
            </div>
        );
    }
}

export default App;