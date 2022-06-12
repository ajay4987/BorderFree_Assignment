import React, { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton';
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/product");
      if (componentMounted) {
        let res = await response.json();
        console.log(res);
        setData(res.productList)
        setFilter(res.productList);
        setLoading(false);
      }
      
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
    <>
        <div className="col-md-3">
          <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={350}/>
        </div>
    </>);
  };

  const filterProduct = (cat) =>{
    const updatedList = data.filter((x)=>x.category === cat);
    setFilter(updatedList);
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("women's clothing")}>
            Women's Clothing 
          </button>
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("jewelery")}>
            Jewelery 
          </button>
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("electronics")}>Electronics</button>
        </div>
        {filter.map((product) => {
          return ( 
            <>
              <div className="col-md-3 mb-4">
                <div class="card h-100 text-center p-4" key={product.id}>
                <Link onClick={()=>{
                  fetch(`http://localhost:5000/product/${product.id}`);
                }} to={`/products/${product.id}`}>
                  <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
                  <div class="card-body">
                    <h5 class="card-title mb-0">{product.title.substring(0, 12)}</h5>
                    <p class="card-text lead fw-bold">
                      ${product.price}
                    </p>
                    </div>
                </Link>
                    <Link to={`/products/${product.id}`} class="btn btn-outline-dark">
                      Buy Now..
                    </Link>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1
              className="display-6fw-bolder
              text-center"
            >
              <br></br>
              Latest Products
            </h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
