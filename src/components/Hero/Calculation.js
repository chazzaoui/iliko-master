import React from "react"
import PromptText from "./PromptText"
import Chair from "../../../static/images/chair.png"
import Closet from "../../../static/images/closet.png"
import Table from "../../../static/images/table.png"
import Couch from "../../../static/images/couch.png"
import Bed from "../../../static/images/bed.png"
import Other from "../../../static/images/other.png"
import Boomerang from "../../../static/images/boomerang.png"

function Calculation({
  furniture,
  handleFurniturePress,
  handleSubmit,
  handleBudget,
}) {
  const furnitures = [
    { name: "Sofas", icon: Couch },
    { name: "Beds", icon: Bed },
    { name: "Closets", icon: Closet },
    { name: "Chairs", icon: Chair },
    { name: "Tables", icon: Table },
    { name: "Other", icon: Other },
  ]

  return (
    <div
      id="calculate"
      className="py-4 flex items-center justify-center relative"
    >
      <img
        src={Boomerang}
        alt="Boomerang"
        className="max-w-100 md:max-w-[70%] lg:max-w-[100%] absolute z-0 boomerang"
      />
      <div className="flex flex-col text-center items-center justify-center lg:items-start z-9 relative">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center lg:items-start">
            <label>
              <PromptText text={"What is your budget?"} />
            </label>
            <input
              id="budgetInput"
              name="budgetInput"
              className="budgetInput min-w-[8rem] p-2 rounded-md mt-4 lg:mt-2 outline-2 outline-DarkPink"
              type="number"
              required
              onSubmit={handleBudget}
              onBlur={handleBudget}
            ></input>
          </div>

          <div className="mt-4">
            <label>
              <PromptText
                text={"Are you interested in sustainable furniture ?"}
              />
            </label>
            <div className="flex items-center justify-center mt-2 lg:justify-start">
              <div className="">
                <PromptText text={"yes"} />

                <input
                  id="yes"
                  name="sustainable"
                  type="radio"
                  className="w-[25px] h-[25px] accent-DarkPink  mt-2"
                />
              </div>
              <div className="ml-4">
                <PromptText text={"no"} />
                <input
                  id="no"
                  name="sustainable"
                  type="radio"
                  className="w-[25px] h-[25px] accent-DarkPink mt-2"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-3">
            <PromptText text={"What furniture do you need?"} />
            <div className="grid grid-cols-3  md:justify-center md:items-center gap-[1.2rem]">
              {furnitures.map((item, i) => (
                <button
                  key={i}
                  onClick={e => handleFurniturePress(e, item.name)}
                  className={
                    !furniture.includes(item.name)
                      ? " flex flex-col items-center justify-center bg-white rounded-md shadow-md p-2 mt-4 lg:mt-2"
                      : "flex flex-col items-center justify-center rounded-md shadow-xl mt-4 p-2"
                  }
                >
                  <img
                    className="furnitureIcon"
                    src={item.icon}
                    alt={item.name}
                  />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="text-black bg-white rounded-md text-center px-3 py-2 min-w-[12rem] mt-[4rem] lg:mt-[2rem]"
          >
            <PromptText text={"Submit"} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Calculation
