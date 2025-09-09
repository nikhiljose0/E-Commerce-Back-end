import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'

function AddProduct() {

    const[image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"",
        new_price:"",
        old_price:""

    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }
    const ChangeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

const Add_product = async () => {
  console.log(productDetails);
  let responseData;
  let product = { ...productDetails };

  // Step 1: Upload Image
  let formData = new FormData();
  formData.append("product", image);

  try {
    const uploadResp = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    responseData = await uploadResp.json();

    if (responseData.success) {
      product.image = responseData.image_url; 
      console.log("Image uploaded:", product.image);

      // Step 2: Save Product in MongoDB
      const saveResp = await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
            Accept:'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const saveData = await saveResp.json();

      if (saveData.success) {
        alert("✅ Product Added Successfully!");
      } else {
        alert("❌ Failed to save product!");
      }
    } else {
      alert("❌ Image upload failed!");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("❌ Something went wrong!");
  }
};
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={ChangeHandler} type="text" name='name' placeholder='Type Here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={ChangeHandler} type="text" name='old_price' placeholder='Type Here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={ChangeHandler}  type="text" name='new_price' placeholder='Type Here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={ChangeHandler} name="category"  className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area}  className="addproduct-thumbnail-img" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            <button onClick={()=>{Add_product()}} className='addproduct-btn'>ADD</button>
        </div>
      
    </div>
  )
}

export default AddProduct
