import React, { Component } from "react";
import Header from "./Header";
import CatalogItem from "./CatalogItem";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      items: [],
      pictureIndex: false,
      isOpen: false
    };
  }

  updatePictureIndex = key => {
    var elementPos = this.state.items
      .map(function(x) {
        return x.ExternalID;
      })
      .indexOf(key);
    this.setState({
      pictureIndex: elementPos
    });
  };

  updateIsOpened = () => {
    this.setState({ isOpen: true });
  };

  componentDidMount() {
    fetch("http://localhost:4000/items")
      .then(res => res.json())
      .then(res => {
        this.setState({
          items: res.data
        });
      });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 45) });
  }

  render() {
    const { search, items, pictureIndex, isOpen } = this.state;
    let filteredItems = items.filter(item => {
      return (
        item.ExternalID.toLowerCase().indexOf(
          this.state.search.toLowerCase()
        ) !== -1
      );
    });

    console.log(this.state.pictureIndex);
    console.log(this.state.isOpen);

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
          placeholder="Search for an item"
          value={search}
          onChange={this.updateSearch.bind(this)}
        />
        <ul style={{ marginTop: "10px", marginBottom: "10px", padding: "0" }}>
          {Object.keys(filteredItems).map(key => (
            <CatalogItem
              key={key}
              index={key}
              details={filteredItems[key]}
              updatePictureIndex={this.updatePictureIndex}
              updateIsOpened={this.updateIsOpened}
            />
          ))}
        </ul>
        {isOpen && (
          <Lightbox
            mainSrc={require(`../images/${items[pictureIndex].PicPath}.jpg`)}
            nextSrc={items[(pictureIndex + 1) % items.length].PicPath}
            prevSrc={
              items[(pictureIndex + items.length - 1) % items.length].PicPath
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                pictureIndex: (pictureIndex + items.length - 1) % items.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                pictureIndex: (pictureIndex + 1) % items.length
              })
            }
          />
        )}
      </div>
    );
  }
}

export default Catalog;
