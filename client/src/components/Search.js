import React, { Component } from "react";
import Book from "./Book";
import API from "./api/API";
import "./style.css";
import connect from "../Socket";

class Search extends Component {
    constructor(props) {
        super(props);



        this.state = {
            search: "",
            searchCopy: "",
            books: []
        }
    }

    typing = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    searchButton = event => {
        event.preventDefault();
        API.searchBooks(this.state.search)
        .then(res => {
            //Normalizing results as to not break react
            const filtered = res.data.items.map(book => {
                return ({id: book.id || "no id given",
                title: book.volumeInfo.title || "No Title",
                authors: book.volumeInfo.authors || "No Authors",
                link: book.volumeInfo.previewLink || "#",
                thumbnail: (book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '../placeholder.jpg'),
                synopsis: book.volumeInfo.description || "no synopsis given"}
            )})
            this.setState({books: filtered});
        });
        this.setState({searchCopy: this.state.search});
        this.setState({search: ""})
    }

    saveRemove = key => {
        const filtered = this.state.books.filter(book => book.id !== key);
        this.setState({books: filtered});
    }

    render() {
        return(
            <div>
                <h1 className="mb-4">Search for Books on Google Books</h1>
                <form className="form-inline">
                    <input id="search" type="text" value={this.state.search} onChange={this.typing} name="search" className="mb-2 mr-3" placeholder="Type a book title or subject to search!" />
                    <button type="submit" className="btn mb-2" onClick={this.searchButton}>Search</button>
                </form>
                <div className="books">
                {!this.state.books ? <h3>Search Results for {this.state.searchCopy}</h3> : <br />}
                {this.state.books.map(book => (
                    <Book
                    key={book.id}
                    id={book.id}
                    authors={book.authors}
                    link={book.link}
                    title={book.title}
                    thumbnail={book.thumbnail}
                    synopsis={book.synopsis}
                    saveRemove={this.saveRemove}
                    />
                ))}
                
                
                </div>

            </div>
        )
    }
}

export default Search;