import React, { useContext, useState } from 'react';
import './CSS/Shopcategory.css';
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png';
import Item from '../components/item/Item.jsx';

export default function Shopcategory(props) {
  const { all_product } = useContext(ShopContext);
  const [popup, setpopup] = useState(false);
  const [sortOrder, setSortOrder] = useState(null); // 'highToLow' or 'lowToHigh'

  const sortedProducts = () => {
    let sorted = [...all_product]; // Clone the array to avoid modifying the original
    if (sortOrder === 'highToLow') {
      sorted.sort((a, b) => b.new_prices - a.new_prices); // Sort by price descending
    } else if (sortOrder === 'lowToHigh') {
      sorted.sort((a, b) => a.new_prices - b.new_prices); // Sort by price ascending
    }
    return sorted.filter((item) => item.category === props.category); // Filter by category
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setpopup(false); // Close the popup after selecting
  };

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div
          className="shopcategory-sort flex items-center gap-1 cursor-pointer"
          onClick={() => setpopup(!popup)}
        >
          Sort by <img src={dropdown_icon} alt="" className="h-[10px] flex justify-center items-center" />
        </div>
      </div>
      <div>
        {popup && (
          <div className="popup bg-slate-200 w-[200px] p-[10px] rounded-md text-center">
            <p className="cursor-pointer" onClick={() => handleSort('highToLow')}>
              High to Low
            </p>
            <hr className="my-2 border-gray-400" />
            <p className="cursor-pointer" onClick={() => handleSort('lowToHigh')}>
              Low to High
            </p>
          </div>
        )}
      </div>
      <div className="shopcategory-products pt-10">
        {sortedProducts().map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_prices}
            old_price={item.old_prices}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
}
