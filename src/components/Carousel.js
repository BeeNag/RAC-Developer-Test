import React, { useEffect, useState } from 'react'
import { config, Spring, animated } from 'react-spring'
import axios from 'axios'

// TODO: Consider removing all state into react-redux and managing it there (see readme for rationale for not using it currently).

function Carousel() {
  // State of data in the app
  const [data, setData] = useState({})
  // Index of the current slide
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Fetch data from json-server and update the state
  // TODO: Set loading flag while waiting for data to return from the server
  // TODO: Show errors in loading in a popup or something similar
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

  // Sets the background colour based on the slide theme
  const setBackground = (theme) => {
    if (theme === 0) {
      return 'bg-gradient-to-r from-yellow-500 to-red-500'
    } else if (theme === 1) {
      return 'bg-gradient-to-r from-red-500 to-blue-500'
    } else if (theme === 2) {
      return 'bg-gradient-to-r from-blue-500 to-green-500'
    } else if (theme === 3) {
      return 'bg-gradient-to-r from-green-500'
    } else {
      return ''
    }
  }

  // Renders the available options for a select input
  const renderOptions = (groups) => {
    return groups.map((group) => {
      return (
        <option key={group.id} value={group.id}>
          {group.label}
        </option>
      )
    })
  }

  // Renders the external links provided
  const renderAnchors = () => {
    return Object.entries(data.footer).map(([key, value]) => {
      return (
        <a
          key={key}
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          {value.label}
        </a>
      )
    })
  }

  // Renders the entire carousel element.
  // First has to check to see if there is data, then makes a check on the slide index against the current slide's pagination_id in order to render the correct information.
  // As the retrieved data is not in the same format for every slide, some checks are made to confirm the type of data that is present.
  // TODO: Add transition animation to the slides when they change.
  // TODO: Fix render height on smaller mobile models (it appears that heights lower than 750px cause some rendering difficulties -> works fine on larger models and tablets).
  // TODO: Fix position of some elements so that the user experience is better (mainly the anchors and the dots).
  // TODO: Split out into individual components to help with readability and reuseability.
  // TODO: Update some code to use hooks -> I'm looking at you dot nav!
  // TODO: Make use of the template value on each slide to grab a different slide template fro each slide (this ties into the component splitting as well).
  const displayCarousel = () => {
    if (Object.keys(data).length > 0) {
      return data.slides.map((slide) => {
        if (currentSlideIndex === slide.pagination_id) {
          return (
            <div
              key={slide.id}
              className={
                setBackground(slide.theme) + ' fixed inset-0 bg-opacity-80'
              }
            >
              <div className="flex justify-center items-center gap-4">
                {renderAnchors()}
              </div>
              <div className="flex justify-center items-center">
                {data.pagination.titles.map((item, i) => (
                  <Spring
                    key={i}
                    config={config.wobbly}
                    from={{ transform: `scale(1)` }}
                    to={{
                      transform:
                        currentSlideIndex === i ? `scale(1.25)` : `scale(1)`,
                    }}
                  >
                    {({ transform }) => (
                      <animated.button
                        className="outline-none border-none w-4 h-4 bg-black rounded-full m-3 cursor-pointer"
                        style={{ transform }}
                        onClick={() => setCurrentSlideIndex(i)}
                      />
                    )}
                  </Spring>
                ))}
              </div>
              <div className="flex justify-center items-center h-screen w-screen">
                <div className="rounded-2xl overflow-hidden p-0 w-auto max-w-7xl md:mx-auto md:w-2/3 shadow-lg m-8">
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative h-64 sm:h-80 w-full lg:h-auto lg:w-1/3 xl:w-2/5 flex-none">
                      {(slide.content?.image || slide.image) && (
                        <img
                          src={slide.content?.image?.url || slide.image.url}
                          alt={slide.content?.image?.alt || slide.image.alt}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      <span className="absolute block inset-x-0 bottom-0 lg:hidden lg:inset-y-0 lg:right-auto bg-gradient-to-t lg:bg-gradient-to-r from-white to-transparent w-full h-16 lg:h-full lg:w-16"></span>
                      <div className="relative flex justify-end lg:justify-start flex-wrap text-white text-xl font-bold m-4">
                        <div
                          className={
                            setBackground(slide.theme) + ' px-4 py-1 rounded'
                          }
                        >
                          {data.pagination.titles[currentSlideIndex]}
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="p-8 bg-white">
                        <div className="flex justify-between items-start">
                          {(slide.content?.heading || slide.heading) && (
                            <h3 className="text-xl font-bold mb-8">
                              {slide.content?.heading || slide.heading}
                            </h3>
                          )}
                        </div>
                        <div className="relative">
                          <div className="h-48 overflow-y-auto">
                            <div>
                              {(slide.content?.description ||
                                slide.description) && (
                                <p className="text-sm text-gray-500 line-clamp-3">
                                  {slide.content?.description ||
                                    slide.description}
                                </p>
                              )}
                              {slide.content?.groups ? (
                                <select className="focus:border-gray-500 w-full md:w-60 rounded-md text-sm border-gray-300 mt-2">
                                  {renderOptions(slide.content?.groups)}
                                </select>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-center text-sm font-bold mt-8 gap-4">
                          {(slide.content?.back || slide.back) && (
                            <button
                              className="focus:outline-none text-gray-800 text-xs py-2 px-4 md:text-sm md:py-3 md:px-5 rounded-full border border-gray-800 hover:bg-gray-500"
                              onClick={() =>
                                setCurrentSlideIndex(
                                  (currentSlideIndex - 1) % data.slides.length,
                                )
                              }
                            >
                              {slide.content?.back?.label || slide.back.label}
                            </button>
                          )}
                          {(slide.content?.next || slide.next) && (
                            <button
                              className="focus:outline-none text-gray-100 text-xs py-2 px-4 md:text-sm md:py-3 md:px-5 rounded-full border border-gray-900 bg-gray-900 hover:bg-gray-800"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        } else {
          return <div key={slide.id}></div>
        }
      })
    } else {
      return <h3>Loading...</h3>
    }
  }

  // Calls function that renders carousel component
  return <>{displayCarousel()}</>
}

export default Carousel
