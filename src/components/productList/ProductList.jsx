import React, { Component } from 'react';
import products from '../../data/products.json';
import inventory from '../../data/inventory.json';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import './ProductList.css'


class ProductList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listInventory: [""],
        }
        this.updateInventory();
    }
    updateInventory() {
        inventory.inventory.map((data) =>{
            let copy = this.state.listInventory;
            copy[data.art_id] = data.stock;
            this.setState({listInventory: copy});
        })
    }
    render() {
        const productList = products.products.map((data, key) => {
            let notEnough = false;
            data.contain_articles.forEach((article) => {
                if(+this.state.listInventory[article.art_id] < +article.amount_of) {
                    notEnough = true;
                }
            })
            if(notEnough) {
                notEnough = false;
                return;
            }
            return (
                <Card key= {key}>
                    <Card.Body>
                        <Card.Header>{data.name}</Card.Header>
                    </Card.Body>
                    <Button>Add to cart</Button>
                </Card>
            )
        });


        return (
            <div className="card-container">
                {productList}
            </div>
        )
    }
}
export default ProductList;