import React from 'react'
import "./Addproduct.css"
import upload_area from "../../assets/upload_area.svg"
import { useState } from 'react'

export default function Addproduct() {

    const [image, setimage] = useState(false)
    const [productdetails, setproductdetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_prices: "",
        old_prices: ""
    });

    const imageHandler = (e) => {
        setimage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setproductdetails({ ...productdetails, [e.target.name]: e.target.value })
    }

    const Add_product = async () => {
        console.log(productdetails)
        let responseData;
        let product = productdetails;

        let formData = new FormData();
        formData.append("product", image);

        await fetch("https://e-commerce-backend-2iit.onrender.com/upload", {
            method: "POST",
            headers: {
                Accept: "application/json"
            },
            body: formData
        }).then((res) => res.json()).then((data) => { responseData = data })

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch("https://e-commerce-backend-2iit.onrender.com/addproduct", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            }).then((res) =>res.json()).then((data) => {
                data.success ? alert("Product Added") : alert("Opearation Failed")
                window.location.reload();
            })
        }
    }

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product tittle</p>
                <input value={productdetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfields">
                    <p>Price</p>
                    <input value={productdetails.old_prices} onChange={changeHandler} type="text" name='old_prices' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfields">
                    <p>Offer Price</p>
                    <input value={productdetails.new_prices} onChange={changeHandler} type="text" name='new_prices' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productdetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumnail-img' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_product} className='addproduct-btn'>ADD</button>
        </div>
    )
}
