import React, { Component } from "react";
import Header from "./Header";
import Article from "./Article";

class Articles extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      articles: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/articles")
      .then(res => res.json())
      .then(res => {
        this.setState({
          articles: res.data
        });
      });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 45) });
  }

  render() {
    const { articles, search } = this.state;

    let filteredArticles = articles.filter(article => {
      return (
        article.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    return (
      <div>
        <Header />
        <input
          style={{
            marginBottom: "15px",
            maxWidth: "250px",
            margin: "auto",
            marginTop: "15px"
          }}
          className="form-control"
          type="text"
          placeholder="Search for an article"
          value={search}
          onChange={this.updateSearch.bind(this)}
        />

        <ul>
          {Object.keys(filteredArticles).map(key => (
            <Article key={key} index={key} details={filteredArticles[key]} />
          ))}
        </ul>
      </div>
    );
  }
}
export default Articles;
