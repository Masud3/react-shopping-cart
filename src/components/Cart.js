import React, { Component } from 'react';
import formatCurrency from './util';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            address:"", 
            showCheckout: false };
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };
    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (<div className="cart cart-header">Cart is empty </div>
                ) : (
                    <div className="cart cart-header">You have got {cartItems.length} Items{" "} </div>
                )}

                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count} {" "}
                                        <button id="removeBtn" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total:{" "} {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                                    </div>
                                    <button onClick={() => this.setState({ showCheckout: true })} className="button primary">Proceed</button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <div className="cart">
                                    <form onSubmit={this.createOrder}>
                                        <ul className="form-container">
                                            <li>
                                                <label htmlFor="">Email</label>
                                                <input
                                                placeholder="Email" 
                                                type="email" 
                                                name="email"
                                                required onChange={this.handleInput} 
                                                />
                                            </li>
                                            <li>
                                                <label htmlFor="">Name</label>
                                                <input
                                                placeholder="Name"
                                                 type="text"
                                                 name="name"
                                                  required onChange={this.handleInput}
                                                   />
                                            </li>
                                            <li>
                                                <label htmlFor="">Address</label>
                                                <input
                                                placeholder="Address" 
                                                type="text"
                                                name="address"
                                                 required
                                                  onChange={this.handleInput} 
                                                  />
                                            </li>
                                            <li>
                                                <button className="button primary" type="submit">Checkout</button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>

                            )}
                        </div>
                    )}

                </div>
            </div>
        );
    }
}
