import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import './Slider.scss'
import { useSelector } from 'react-redux';
import { selectCategories } from '../../redux/slices/shopSlice';

const Slider = () => {

    const [ currentSlide, setCurrentSlide ] = useState(0);
    const [ categories, setCategories ] = useState([]);

    const autoScroll = true;

    let slideInterval;
    let intervalTime = 5000;

    const cats = useSelector(selectCategories)

    useEffect(() => {
        setCategories(cats)
    }, [cats])


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

    function auto (){
        slideInterval = setInterval(nextSlide, intervalTime)
    };

    useEffect(() => {

        if(autoScroll) {
            auto();
        }
        return () => {
            clearInterval(slideInterval)
        }
    }, [currentSlide, autoScroll, slideInterval, auto])


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
