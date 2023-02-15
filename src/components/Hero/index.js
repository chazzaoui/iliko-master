import React from "react"
import ContentWrapper from "../Layouts/ContentWrapper"
import Calculation from "./Calculation"
import Misc from "./MiscPart"

function Hero({ furniture, handleFurniturePress, handleSubmit, handleBudget }) {
  return (
    <div className="bg-Pinkish min-h-[100vh]">
      <ContentWrapper>
        <div className="flex flex-col lg:justify-between lg:flex-row">
          <Misc />
          <Calculation
            handleSubmit={handleSubmit}
            furniture={furniture}
            handleBudget={handleBudget}
            handleFurniturePress={handleFurniturePress}
          />
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Hero
