// App.js File
import React, { Component } from "react";


const BookTitle = () => {
    return <h1>Dune</h1>;
}

// random code I found from a w3 tutorial: https://www.w3schools.com/react/react_getstarted.asp
class App extends Component {
    render() {
        return (
            <BookTitle />
        );
    }
}

export default App;