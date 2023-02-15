import React, { useState } from "react"
import ContentWrapper from "../Layouts/ContentWrapper"
import SectionTitle from "./SectionTitle"
import FurnitureLoader from "../../../static/animations/furnitureLoader.json"
import Lottie from "lottie-react"
import { useTabs } from "react-headless-tabs"
import SmallText from "./SmallText"
import EmptyBox from "./EmptyBox"
import PromptText from "../Hero/PromptText"
import SubscribeForm from "./SubscribeForm"
import { useEffect } from "react"
import SingleChair from "../../../static/images/singleChair.png"
import combinedChair from "../../../static/images/combinedBg.png"

function Results({
  loading,
  companies,
  closestFurniture,
  selectedFurniture,
  calculatedFurniture,
  cheaperFurniture,
  costlierFurniture,
  calculated,
}) {
  const [activeTab, setActiveTab] = useState(selectedFurniture)
  const [fieldExists, setfieldExists] = useState(false)
  useEffect(() => {
    {
      Object.keys(calculatedFurniture).map(item => {
        if (calculatedFurniture[item] > 0) {
          setfieldExists(true)
        }
      })
    }
  }, [calculatedFurniture])
  return (
    <div
      className={`chairbg relative min-h-100 pb-[2rem] ${
        calculated ? "bg-right" : "bg-top"
      }`}
      id="resultsDiv"
    >
      {loading ? (
        <Lottie animationData={FurnitureLoader} />
      ) : (
        <div className="flex flex-row items-center xlg:items-start xlg:justify-start xlg:ml-[8rem] justify-center w-100 z-9 relative ">
          <div className="flex flex-col justify-center">
            <ContentWrapper>
              <section className="mt-[3rem] ">
                <div>
                  {calculated && (
                    <SectionTitle
                      text={"Here's what you can expect to spent on furniture"}
                    />
                  )}
                  <div className="textPart">
                    {fieldExists && (
                      <div>
                        <select
                          value={activeTab}
                          onChange={e => {
                            setActiveTab(e.target.value)
                          }}
                          className="p-3 rounded-md min-w-[10rem] mt-[2rem]"
                        >
                          {Object.keys(calculatedFurniture).map(item => {
                            if (calculatedFurniture?.[item]) {
                              return (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              )
                            }
                          })}
                        </select>
                        <div className="mt-6 flex">
                          {" "}
                          <SmallText text={"Expect to spend:"} />{" "}
                          <span className="font-bold">
                            €
                            {calculatedFurniture[activeTab] ||
                              calculatedFurniture[selectedFurniture]}
                          </span>
                        </div>
                      </div>
                    )}
                    {calculated && (
                      <>
                        <div className="mt-6 lg:mt-[3rem]">
                          <SmallText
                            text={
                              "We already searched the web for the best possible furniture matches for you..."
                            }
                          />{" "}
                        </div>
                        <div className="flex items-center justify-center lg:justify-start ">
                          <div className="mt-6 lg:mt-2 max-w-[80%] lg:w-[70%] flex flex-col lg:flex-row items-center lg:items-end lg:justify-start justify-center">
                            <div className="mt-2 flex items-center justify-center flex-col  text-center  border-2 border-transparent p-2 hover:rounded-md cursor-pointer hover:border-black">
                              <SmallText text={"iliko engine recommendation"} />

                              {closestFurniture ? (
                                <img
                                  className="lg:w-[150px] lg:h-[120px]  mt-2"
                                  src={companies[closestFurniture]}
                                />
                              ) : (
                                <EmptyBox />
                              )}
                            </div>
                            <div className="mt-[2rem] flex items-center justify-center flex-col text-center border-2 p-2 hover:rounded-md cursor-pointer border-transparent hover:border-black">
                              <SmallText
                                text={"If you are ok to spend a little less"}
                              />
                              {cheaperFurniture ? (
                                <img
                                  className="lg:w-[150px] lg:h-[120px]  mt-2"
                                  src={companies[cheaperFurniture]}
                                  alt="Image2"
                                />
                              ) : (
                                <EmptyBox />
                              )}
                            </div>
                            {costlierFurniture ? (
                              <div className="mt-[2rem] flex items-center justify-center flex-col text-center border-2 p-2 hover:rounded-md cursor-pointer  border-transparent hover:border-black">
                                <SmallText
                                  text={"If you are ok to spend a little more"}
                                />
                                <img
                                  className="lg:w-[150px] lg:h-[120px]  mt-2"
                                  src={companies[costlierFurniture]}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {/* <div className="tryForAll mt-[2rem] flex items-center lg:items-start flex-col">
                          <PromptText
                            text={
                              "OR try this platform for all your furniture needs"
                            }
                          />
                          <EmptyBox />
                        </div> */}
                        <div className="line w-[100%] lg:w-[60%] mt-[2rem] bg-black h-[1px]"></div>
                      </>
                    )}

                    <SubscribeForm />
                  </div>
                </div>
              </section>
            </ContentWrapper>
          </div>
        </div>
      )}
      {/* <div
        className={`singlechair hidden ${
          calculated ? "lg:block" : "lg:hidden"
        } absolute  bottom-0 min-w-[100] min-h-[100%] right-0 z-0`}
      >
        <img className="h-[100%]" src={combinedChair} alt="singlechair" />
      </div> */}
    </div>
  )
}

export default Results
