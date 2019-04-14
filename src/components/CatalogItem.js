import React, { Component } from "react";
import { Card } from "react-bootstrap";

class CatalogItem extends Component {
  render() {
    const prp = this.props.details;
    const imgUrl = prp.PicPath;
    const itemID = prp.ExternalID;
    return (
      <div
        style={{
          width: "32%",
          marginBottom: "15px",
          display: "inline-block",
          margin: "5px",
          boxShadow: "1px 2px #888888",
          fontSize: "14px"
        }}
      >
        <Card>
          <Card.Img
            variant="top"
            src={require(`../images/${imgUrl}.jpg`)}
            style={{
              height: "150px",
              maxWidth: "150px",
              margin: "auto",
              cursor: "pointer"
            }}
            onClick={() => {
              this.props.updatePictureIndex(itemID);
              this.props.updateIsOpened();
            }}
          />
          <Card.Body
            style={{
              height: "190px"
            }}
          >
            <Card.Title>{prp.ExternalID}</Card.Title>
            <Card.Text>
              {prp.name}
              <br />
              {prp.Prop1}
              <br />
              UPC: {prp.upc.toString()} Packed: {prp.CaseQuantity}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CatalogItem;
