import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Carousel() {
  const [data, setData] = useState({})
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:3001/content')
        setData(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchContent()
  }, [])

  const setBackground = (theme) => {
    if (theme === 0) {
      return 'bg-yellow-500'
    } else if (theme === 1) {
      return 'bg-red-500'
    } else if (theme === 2) {
      return 'bg-blue-500'
    } else if (theme === 3) {
      return 'bg-green-500'
    } else {
      return ''
    }
  }

  const renderOptions = (groups) => {
    return groups.map((group) => {
      return (
        <option key={group.id} value={group.id}>
          {group.label}
        </option>
      )
    })
  }

  const renderFooter = () => {
    return Object.entries(data.footer).map(([key, value]) => {
      return (
        <a key={key} href={value.url} target="_blank" rel="noopener noreferrer">
          {value.label}
        </a>
      )
    })
  }

  const displayCarousel = () => {
    if (Object.keys(data).length > 0) {
      return data.slides.map((slide) => {
        console.log(slide)
        return (
          <div key={slide.id} className={setBackground(slide.theme)}>
            {currentSlideIndex === slide.pagination_id && (
              <h1>{data.pagination.titles[currentSlideIndex]}</h1>
            )}
            {currentSlideIndex === slide.pagination_id &&
              (slide.content?.heading || slide.heading) && (
                <h2>{slide.content?.heading || slide.heading}</h2>
              )}
            {currentSlideIndex === slide.pagination_id &&
              (slide.content?.description || slide.description) && (
                <p>{slide.content?.description || slide.description}</p>
              )}
            {currentSlideIndex === slide.pagination_id &&
            slide.content?.groups ? (
              <select>{renderOptions(slide.content?.groups)}</select>
            ) : null}
            {currentSlideIndex === slide.pagination_id &&
              (slide.content?.image || slide.image) && (
                <img
                  src={slide.content?.image?.url || slide.image.url}
                  alt={slide.content?.image?.alt || slide.image.alt}
                />
              )}
            {currentSlideIndex === slide.pagination_id && renderFooter()}
            {currentSlideIndex === slide.pagination_id &&
              (slide.content?.back || slide.back) && (
                <button
                  className="focus:outline-none text-gray-800 text-sm py-3 px-5 rounded-full border border-gray-800 hover:bg-gray-500"
                  onClick={() =>
                    setCurrentSlideIndex(
                      (currentSlideIndex - 1) % data.slides.length,
                    )
                  }
                >
                  {slide.content?.back?.label || slide.back.label}
                </button>
              )}
            {currentSlideIndex === slide.pagination_id &&
              (slide.content?.next || slide.next) && (
                <button
                  className="focus:outline-none text-gray-100 text-sm py-3 px-5 rounded-full border border-gray-900 bg-gray-900 hover:bg-gray-800"
                  onClick={() =>
                    setCurrentSlideIndex(
                      (currentSlideIndex + 1) % data.slides.length,
                    )
                  }
                >
                  {slide.content?.next?.label || slide.next.label}
                </button>
              )}
          </div>
        )
      })
    } else {
      return <h3>Loading...</h3>
    }
  }

  return <>{displayCarousel()}</>
}

export default Carousel
