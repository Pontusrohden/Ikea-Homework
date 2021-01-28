import React, { Component } from 'react';
import products from '../../data/products.json';
import inventory from '../../data/inventory.json';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryList: [],
            articleList: [],
        }
        this.updateInventory();
        this.updateArticles();

    }
    //Sets the stock of articles
    updateInventory() {
        inventory.inventory.forEach((data) => {
            let copy = this.state.inventoryList;
            copy[data.art_id] = parseInt(data.stock);
            this.setState({ inventoryList: copy });
        })
    }
    //Sets all article names
    updateArticles() {
        inventory.inventory.forEach((data) => {
            let copy = this.state.articleList;
            copy[data.art_id] = data.name;
            this.setState({ articleList: copy });
        })
    }
    //Could deffinitly be done better
    async addToCart(event) {
        if (event.target.value === "Dining Chair") {
            const temp = [...this.state.inventoryList];
            temp[1] = temp[1] - 4;
            temp[2] = temp[2] - 8;
            temp[3] = temp[3] - 1;
            await this.setState({ inventoryList: temp })
        }
        if (event.target.value === "Dinning Table") {
            const temp = [...this.state.inventoryList];
            temp[1] = temp[1] - 4;
            temp[2] = temp[2] - 8;
            temp[4] = temp[4] - 1;
            await this.setState({ inventoryList: temp })
        }
    }
    render() {
        const productList = products.products.map((data, key) => {
            let notEnough = false;
            data.contain_articles.forEach((article) => {
                if (this.state.inventoryList[article.art_id] < article.amount_of) {
                    notEnough = true;
                }
            })
            if (notEnough) {
                notEnough = false;
                return;
            }
            return (
                <Card key={key} className="Card">
                    <Card.Body>
                        <Card.Header>{data.name}</Card.Header>
                        <Card.Text>Articles:</Card.Text>
                        <ul className="articleList">
                            {data.contain_articles.map((data, key) =>
                                <li key={key}>{this.state.articleList[data.art_id] + " x" + data.amount_of}</li>)}
                        </ul>
                    </Card.Body>
                    <Button value={data.name} onClick={event => this.addToCart(event)}>Sell</Button>
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

