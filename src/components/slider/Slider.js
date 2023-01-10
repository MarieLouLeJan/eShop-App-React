import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import './Slider.scss'

const Slider = () => {

    const [ currentSlide, setCurrentSlide ] = useState(0);
    const [ categories, setCategories ] = useState([]);

    const autoScroll = true;

    let slideInterval;
    let intervalTime = 5000;

    const fetchCategories = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/categories/getAllShop`)
        .catch(function (e) {
          if(e.response) {
            console.log(e.response.data.message)
          }
        })
        const categories = res.data.categories.filter(cat => cat.active === true)
        categories.forEach(cat => {
            cat.products.filter(prod => prod.isActive === true)
        });
        setCategories(categories)
    }
    
    useEffect(() => {
        fetchCategories()
    }, [])

    const slideLength = categories.length

    const prevSlide = () => {
        setCurrentSlide(currentSlide ===  0 ? slideLength - 1 : currentSlide - 1);
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, []);

    const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        function auto (){
            slideInterval = setInterval(nextSlide, intervalTime)
        };
        if(autoScroll) {
            auto();
        }
        return () => {
            clearInterval(slideInterval)
        }
    }, [currentSlide, autoScroll, slideInterval])


  return (
    <div className='slider'>
        <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
        <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />

        {categories.map((cat, index) => {
            const { image, title } = cat
            return (
                <div key={index} className={index === currentSlide ? 'slide current' : 'slide' }>

                    {index === currentSlide && (
                        <>
                            <img src={image} alt={title} />
                            <div className="content">
                                <h2>{title}</h2>
                                <hr />
                                <a href="#product" className='--btn --btn-primary'>
                                    Show now
                                </a>
                            </div>
                        </>
                    )}

                </div>
            )
        })}

    </div>
  )
}

export default Slider
