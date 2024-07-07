import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoader } from '../Redux/reducers/loaderSlice';

const Categories = () => {

  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch()
  const getAllCategories = async () => {
    dispatch(setLoader(true))
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      setCategories(response.data.categories)
    } catch (err) {
      console.log('error')
    }finally{
      dispatch(setLoader(false))
    }
  }

  useEffect(() => {
    getAllCategories();
  }, [])



  return (
    <div className='container my-5'>
      <div>
        <div className="row g-5">
          {categories.length > 0 && categories.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <Link to={`/products/${item.strCategory}`} className="custom-link">
                <div className="card custom-card">
                  <img src={item.strCategoryThumb} className="card-img-top custom-img" alt={item.strCategory} />
                  <div className="card-body">
                    <h5 className="card-title">{item.strCategory}</h5>
                    <p className="card-text custom-text">{item.strCategoryDescription}</p>
                    {/* <span className="btn btn-primary">More Dishes</span> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Categories