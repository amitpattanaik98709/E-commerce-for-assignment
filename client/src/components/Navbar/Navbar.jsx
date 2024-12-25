import React, { useRef, useState, useContext, useEffect } from 'react';
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from 'react-router-dom';
import nav_dropdown from "../Assets/nav_dropdown.png";
import { ShopContext } from '../../context/ShopContext';
import SearchComponent from './Searchbar';

export default function Navbar() {
  const [menu, setmenu] = useState("shop");
  const [searchitem, setsearchitem] = useState();
  const menuref = useRef();
  const searchResultsRef = useRef();  // Ref for search results container
  const { count, all_product } = useContext(ShopContext);
  const [searchbtn, setsearchbtn] = useState(false);
  const [searchitemsfromdb, setsearchitemsfromdb] = useState([]);

  useEffect(() => {
    if (searchbtn && searchitem) {
      const filteredProducts = all_product.filter(product =>
        product.name.toLowerCase().trim().includes(searchitem.toLowerCase().trim())
      );
      setsearchitem("");
      setsearchitemsfromdb(filteredProducts);
    }
  }, [searchbtn, searchitem, all_product]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setsearchbtn(false);
        setsearchitemsfromdb([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdown_toggle = (e) => {
    menuref.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className='navbar'>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="nav-logo" onClick={() => { setmenu("shop") }}>
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </div>
      </Link>

      <SearchComponent searchbtn={searchbtn} setsearchitem={setsearchitem} setsearchbtn={setsearchbtn} searchitemsfromdb={searchitemsfromdb} />

      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuref} className="nav-menu">
        <li onClick={() => { setmenu("shop") }}> <Link style={{ textDecoration: "none" }} to="/">Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("mens") }}><Link style={{ textDecoration: "none" }} to="/mens">Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("womens") }}><Link style={{ textDecoration: "none" }} to="/womens">Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("kids") }}><Link style={{ textDecoration: "none" }} to="/kids">Kid</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>

      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token') ?
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Log Out</button> :
          <Link to="/login"> <button>Login</button></Link>
        }
        <Link to="/cart"><img src={cart_icon} alt="" /></Link>
        <div className='nav-cart-count'>{count}</div>
      </div>

      {
        searchbtn && (
          <div className='searchresults' ref={searchResultsRef}>
            {searchitemsfromdb.length>0 ? searchitemsfromdb.map((item) => (
              <div className='searchresults-inner' key={item.id}>
                <Link to={`/product/${item.id}`}>
                  {item.name}
                </Link>
              </div>
            )):<div>
              no results found ! We will try to make this product available
            </div>}
          </div>
        )
      }
    </div>
  );
}
