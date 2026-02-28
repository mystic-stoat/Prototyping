// App.js File
import React, { Component } from "react";
import {useState} from "react";


const books = [
    {title: "Dune", author: "Herbert"},
    {title: "Neuromancer", author: "Gibson"}
]

const BookCard = (props) => {
    // format book information
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.author}</p>
        </div>
    )
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


const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

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
    // form for the search, then loads the replys from API
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search book..."
                />
                <button onClick="submit">Search</button>
            </form>
            {loading && <p>Searching...</p>}
            {results.map(book => (
                <BookCard
                    title={book.title}
                    author={book.author_name?.[0]}
                />
            ))}
        </div>
    )
}



// random code I found from a w3 tutorial: https://www.w3schools.com/react/react_getstarted.asp
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