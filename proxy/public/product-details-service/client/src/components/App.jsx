import React, { Component } from 'react';
import $ from 'jquery';
import Topbar from './Navbar/Topbar';
import Likes from './Also-Like/Likes';
import Looks from './Complete-Look/Looks';
import Description from './Product-Details/Description';
import Specification from './Product-Details/Specification';
import Share from './Share-Photos/Share';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      looks: {},
      shoes: [],
      shoe: {},
      details: [],
      shares: {},
      desc: true,
      spec: false,
      cart: 0,
    };

    this.descClick = this.descClick.bind(this);
    this.specClick = this.specClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.get = this.get.bind(this);
    this.addAShoe = this.addAShoe.bind(this);
    this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
  }

  componentDidMount() {
    this.addAShoe();
    this.get();
    this.onUpdateSubmit();
    this.onDeleteSubmit();
  }

  get() {
    let id = Math.floor(Math.random()* 1000000);
        $.ajax({
      type: 'GET',
      url: '/shoes/' + id,
      success: (shoes => {
        this.setState({
          shoes: shoes
        })
        console.log(shoes)
      }),
      error: (err => {
        console.log('this is an error in the get request', err)
      })
    })
  }


  addAShoe() {
    $.ajax({
      type: 'POST',
      url: '/postshoes/10000001',
      data: {
        id: '10000001',
        name: 'Merary!',
        img_url: "https://s3-us-west-1.amazonaws.com/adidas-shoe/14.jpg",
        short_desc: 'Good',
        long_desc:  'Even better',
        price: '120',
        rating: '5',
        review_count: '15',
        details: 'Super fast shoe!'
      },
      success: function(results) {
        console.log(results, 'post req success');
      },
      error: function(results) {
        console.log('error in post req')
      }
    })
  }

  onUpdateSubmit() {
    $.ajax({
      type: 'PUT',
      url: '/shoes/10000001' ,
      success: function(results) {
        console.log(results, 'put req success');
      },
      error: function(results) {
        console.log('error in put req')
      }
    })
  }

  onDeleteSubmit() {
    let id = Math.floor(Math.random()* 1000000);
    console.log(id)
    $.ajax({
      type: 'DELETE',
      url: '/shoes/' + id,
      success: function(results) {
        console.log(results, 'delete req success');
      },
      error: function(results) {
        console.log('error in delete req')
      }
    })
  }

  descClick() {
    this.setState({ desc: true, spec: false });
  }

  specClick() {
    this.setState({ desc: false, spec: true });
  }

  addToCart() {
    this.setState({ cart: ++this.state.cart });
  }

  render() {
    const descClass = this.state.desc ? 'detail selected' : 'detail unselected';
    const specClass = this.state.spec ? 'detail selected' : 'detail unselected';

    return (
      <div>
        <Topbar cart={this.state.cart} />
        <div id="top-navbar"></div>
        <Looks looks={this.state.looks} add={this.addToCart} />
        <div className="product">
          <div className="title-1000">
            <h1> PRODUCT DETAILS </h1>
          </div>
          <div className="details">
            <div className={descClass} id="desc" onClick={this.descClick}>DESCRIPTION</div>
            <div className={specClass} id="spec" onClick={this.specClick}>SPECIFICATIONS</div>
          </div>
          {this.state.desc ? <Description shoe={this.state.shoe} /> : <Specification details={this.state.details} />}
        </div>
        <div className="product">
          <div className="title-1000">
            <h1> YOU MAY ALSO LIKE </h1>
          </div>
        </div>
        <Likes shoes={this.state.shoes} handleClick={this.getOne} />
        <Share shares={this.state.shares} />
        <button className="update shoe" onClick={this.onUpdateSubmit}>update shoe</button>
         <button className="delete shoe" onClick={this.onDeleteSubmit}>delete shoe</button>
         <button className="add shoe" onClick={this.addAShoe}>add shoe</button>
      </div>
    );
  }
}

export default App;
