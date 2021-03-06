import React, { Component } from 'react';
import formatCurrency from './util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { span } from 'prelude-ls';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }
    openModal = (product) => {
        this.setState({ product });
    }
    closeModal = () => {
        this.setState({ product: null })
    }
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom caseCade>
                    <ul className="products">
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                        <img src={product.image} alt={product.title} />
                                        <p>
                                            {product.title}
                                        </p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button onClick={() => this.props.addToCart(product)} className="button primary">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>X</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} alt="" />
                                <div className="products-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        {product.description}
                                    </p>
                                    <p>
                                        Available Sizes:{" "}
                                        {
                                            product.availableSize.map(x => (
                                                <span>{" "}
                                                    <button className="button">{x}</button>
                                                </span>
                                            ))
                                        }
                                    </p>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button className="button primary" onClick={()=>{
                                            this.props.addToCart(product);
                                            this.closeModal();
                                        }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        );
    }
}

export default Products;