import React from "react"
import Lottie from "lottie-react"
import { TabPanel, useTabs } from "react-headless-tabs"

import "./landingpage.css"
import "../../styles/global.css"
import FurnitureLoader from "../../static/animations/furnitureLoader.json"
import Chair from "../../static/images/chair.png"
import Closet from "../../static/images/closet.png"
import Table from "../../static/images/table.png"
import Couch from "../../static/images/couch.png"
import Bed from "../../static/images/bed.png"
import Others from "../../static/images/other.png"
import Ikea from "../../static/images/ikea.png"
import Flinders from "../../static/images/flinders.jpeg"
import Home24 from "../../static/images/home24.png"
import Bol from "../../static/images/bol.png"
import Fonq from "../../static/images/fonq.png"
import { TabSelector } from "../TabSelector"

const companies = {
  Ikea: Ikea,
  Flinders: Flinders,
  Home24: Home24,
  Bol: Bol,
  Fonq: Fonq,
}

const furnitureObject = {
  Sofas: 21,
  Beds: 19,
  Tables: 18,
  Chairs: 11,
  Closets: 17,
  Other: 14,
}
const averagesArray = {
  Sofas: {
    Home24: 1100,
    Bol: 400,
    Fonq: 900,
    Flinders: 2500,
    Ikea: 500,
  },
  Tables: {
    Home24: 250,
    Bol: 275,
    Fonq: 400,
    Flinders: 1000,
    Ikea: 200,
  },
  Chairs: {
    Home24: 225,
    Bol: 230,
    Fonq: 210,
    Flinders: 400,
    Ikea: 150,
  },
  Beds: {
    Home24: 900,
    Bol: 390,
    Fonq: 500,
    Flinders: 1500,
    Ikea: 800,
  },
  Closets: {
    Home24: 500,
    Bol: 160,
    Fonq: 300,
    Flinders: 1000,
    Ikea: 400,
  },
  Other: {
    Home24: 450,
    Bol: 223,
    Fonq: 175,
    Flinders: 650,
    Ikea: 375,
  },
}

export default function Home() {
  const [furniture, setFurniture] = React.useState([])
  const [budget, setBudget] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [calculatedFurniture, setCalculatedFurniture] = React.useState({
    Sofas: "",
    Beds: "",
    Tables: "",
    Chairs: "",
    Closets: "",
    Other: "",
  })

  const [selectedFurniture, setSelectedFurniture] = React.useState("Sofas") // defaulting to Sofas
  const [closestFurniture, setClosestFurniture] = React.useState("")
  const [cheaperFurniture, setCheaperFurniture] = React.useState("")
  const [costlierFurniture, setCostlierFurniture] = React.useState("")

  const [selectedTab, setSelectedTab] = useTabs([])
  const [activeTab, setActiveTab] = React.useState("")

  const handleFurniturePress = (e, name) => {
    e.preventDefault()

    setSelectedFurniture(name)

    if (furniture.includes(name)) {
      const newFurniture = furniture.filter(item => item !== name)
      if (calculatedFurniture[name])
        setCalculatedFurniture({ ...calculatedFurniture, [name]: 0 })

      setFurniture(newFurniture)
    } else {
      setFurniture([...furniture, name ?? ""])
    }
  }

  const handleBudget = e => {
    setBudget(e.target.value)
    e.target.blur()
  }
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    let totalPercentage = 0

    const newFurniture = calculatedFurniture
    furniture.map(item => {
      totalPercentage = totalPercentage + furnitureObject[item]
    })

    furniture.map(item => {
      const factor = (furnitureObject[item] / totalPercentage) * 100
      const price = Math.round(budget * (factor / 100))
      newFurniture[item] = price
    })
    // console.log(newFurniture);
    
    setCalculatedFurniture({ ...newFurniture })

    const furnitureAverageObj = Object.keys(averagesArray[selectedFurniture])
      .map(key => [averagesArray[selectedFurniture][key], key])
      .sort((item1, item2) => {
        return item1[0] - item2[0]
      })

    // console.log(furnitureAverageObj)

    let cheaper = "",
      costlier = "",
      closest = ""
    let closestPrice = 0

    for (let index in furnitureAverageObj) {
      let price = furnitureAverageObj[index][0]
      let companyName = furnitureAverageObj[index][1]
      if (
        Math.abs(price - parseInt(budget)) <
        Math.abs(closestPrice - parseInt(budget))
      ) {
        closest = companyName
        closestPrice = price
      }
    }

    for (let index in furnitureAverageObj) {
      let price = furnitureAverageObj[index][0]
      let companyName = furnitureAverageObj[index][1]
      if (price <= closestPrice) {
        if (companyName != closest) {
          cheaper = companyName
        }
      } else {
        costlier = companyName
        break
      }
    }

    setCheaperFurniture(cheaper)
    setClosestFurniture(closest)
    setCostlierFurniture(costlier)

    const elem = document.getElementById("resultsDiv")
    elem.scrollIntoView()
    setTimeout(() => {
      setLoading(false)
    }, 1700)
  }

  return (
    <div className="body">
      <div className="secondMain">
        <section className="secondSection">
          <div className="secondMainFirst">
            <p className="secondMainTitle">
              We don't sell you overpriced furniture.
            </p>
            <p className="secondMainTitle">
              Calculate your furniture budget and see what you can afford.
            </p>
          </div>
          <div id="calculateDiv" className="secondMainSecond">
            <div className="labelsContainer">
              <div className="labelDiv">
                <label className="labelText">What is your budget?</label>
                <input
                  id="budgetInput"
                  name="budgetInput"
                  className="budgetInput"
                  type="number"
                  onSubmit={handleBudget}
                  onBlur={handleBudget}
                ></input>
              </div>

              <div className="labelDiv">
                <label className="labelText">
                  Are you interested in sustainable furniture?
                </label>
                <div className="checkBoxDiv">
                  <div className="labelDiv">
                    <label className="labelText">yes</label>
                    <input
                      className="checkBoxStyle"
                      id="yes"
                      name="sustainable"
                      type="radio"
                    />
                  </div>
                  <div className="labelDiv">
                    <label className="labelText">no</label>
                    <input
                      className="checkBoxStyle"
                      id="no"
                      name="sustainable"
                      type="radio"
                    />
                  </div>
                </div>
              </div>
              <div className="labelDiv">
                <label className="labelText">What furniture do you need?</label>
                <div className="furnitureButtonRow">
                  <button
                    onClick={e => handleFurniturePress(e, "Sofas")}
                    className={
                      furniture.includes("Sofas")
                        ? "furnitureButtonPressed"
                        : "furnitureButton"
                    }
                  >
                    <img className="furnitureIcon" src={Couch} alt="Other" />
                    Sofas
                  </button>
                  <button
                    onClick={e => handleFurniturePress(e, "Beds")}
                    className={
                      furniture.includes("Beds")
                        ? "furnitureButtonPressed"
                        : "furnitureButton"
                    }
                  >
                    <img className="furnitureIcon" src={Bed} alt="Other" />
                    Beds
                  </button>
                  <button
                    onClick={e => handleFurniturePress(e, "Tables")}
                    className={
                      furniture.includes("Tables")
                        ? "furnitureButtonPressed"
                        : "furnitureButton"
                    }
                  >
                    <img className="furnitureIcon" src={Table} alt="Other" />
                    Tables
                  </button>
                </div>
                <div className="furnitureButtonRow">
                  <button
                    onClick={e => handleFurniturePress(e, "Chairs")}
                    className={
                      furniture.includes("Chairs")
                        ? "furnitureButtonPressed"
                        : "furnitureButton"
                    }
                  >
                    <img className="furnitureIcon" src={Chair} alt="Other" />
                    Chairs
                  </button>
                  <button
                    onClick={e => handleFurniturePress(e, "Closets")}
                    className={
                      furniture.includes("Closets")
                        ? "furnitureButtonPressed"
                        : "furnitureButton"
                    }
                  >
                    <img className="furnitureIcon" src={Closet} alt="Other" />
                    Closets
                  </button>
                  <button
                    onClick={e => handleFurniturePress(e, "Other")}
                    className={
                      furniture.includes("Other")
                        ? "furnitureButtonPressed"
                        : "furnitureButton"
                    }
                  >
                    <img className="furnitureIcon" src={Others} alt="Other" />
                    Other
                  </button>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="ctaButton"
              >
                Calculate budget
              </button>
            </div>
          </div>
        </section>
      </div>
      <div id="resultsDiv" className="thirdMain">
        {loading ? (
          <Lottie animationData={FurnitureLoader} loop={true} />
        ) : (
          <section className="thirdSection">
            <div className="thirdMainFirst">
              <p className="text-4xl font-bold mb-12 w-2/3">
                Here's what you can expect to spend on furniture!
              </p>
              {/* <div className="calculateLabelDiv">
               
                {Object.keys(calculatedFurniture).map(function eachKey(item) {
                  if (calculatedFurniture?.[item]) {
                    return (
                      <p key={item} className="calculationText">
                        {item}: {calculatedFurniture[item]}
                      </p>
                    )
                  }
                })}
              </div> */}
              <nav className="flex w-1/2 border-b border-gray-300">
                {Object.keys(calculatedFurniture).map(function eachKey(item) {
                  if (calculatedFurniture?.[item]) {
                    return (
                      <TabSelector
                        isActive={activeTab === item}
                        onClick={() => setActiveTab(item)}
                      >
                        {item}
                      </TabSelector>
                    )
                  }
                })}
              </nav>
              <div className="w-1/2 h-1/2 mb-12">
                <TabPanel className="flex flex-col w-full h-full justify-start border border-black rounded-xl p-4">
                  {calculatedFurniture[activeTab] ? (
                    <>
                      <p className="flex-row mb-12">
                        Expect to spend:
                        <strong> €{calculatedFurniture[activeTab]}</strong>
                      </p>
                      <p className="mb-12">
                        We already searched the web for the best possible
                        furniture matches for you...
                      </p>
                    </>
                  ) : null}
                  <div className="flex w-full justify-center mb-12">
                    <div className="flex flex-col justify-center content-center w-1/3 border border-black rounded-xl p-4">
                      <p>Iliko engine recommendation</p>
                      <img
                        className="furnitureIcon"
                        src={companies[closestFurniture]}
                        alt="**Found None**"
                      />
                    </div>

                    <div className="flex flex-col justify-center content-center w-1/3 border border-black rounded-xl p-4">
                      <p>If you are ok to spend a little less</p>
                      <img
                        className="furnitureIcon"
                        src={companies[cheaperFurniture]}
                        alt="**Found None**"
                      />
                    </div>

                    <div className="flex flex-col justify-center content-center w-1/3 border border-black rounded-xl p-4">
                      <p>If you are ok to spend a little more</p>
                      <img
                        className="furnitureIcon"
                        src={companies[costlierFurniture]}
                        alt="**Found None**"
                      />
                    </div>
                  </div>
                  {/* <p className="labelText">
                    OR try this platform for all your furniture needs
                  </p> */}
                </TabPanel>
              </div>
              <div className="calculateLabelDiv">
                <label className="labelText">
                  Drop your email below if you're interested in special
                  furniture deals!
                </label>
                <input
                  id="emailInput"
                  name="emailInput"
                  className="budgetInput"
                ></input>
                <p className="labelText">We promise not to spam you.</p>
              </div>
            </div>

            <section className="thirdMainSecond" />
          </section>
        )}
      </div>
    </div>
  )
}
