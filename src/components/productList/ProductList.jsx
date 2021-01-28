import React, { Component } from 'react';
import products from '../../data/products.json';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import './ProductList.css'

const list = products.products.map((data, key) => {
    return (
            <Card key= {key}>
                <Card.Body>
                    <Card.Header>{data.name}</Card.Header>
                </Card.Body>
                <Button>Add to cart</Button>
            </Card>
    )
});

class ProductList extends Component{
    render() {
        return (
            <div className="card-container">
                {list}
            </div>
        )
    }
}
export default ProductList;