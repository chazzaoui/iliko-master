import React from "react"
import Hero from "../components/Hero"
import Results from "../components/Results"
import "../../styles/global.css"
import Ikea from "../../static/images/ikea.png"
import Flinders from "../../static/images/flinders.jpeg"
import Home24 from "../../static/images/home24.png"
import Bol from "../../static/images/bol.png"
import Fonq from "../../static/images/fonq.png"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"

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

function Home() {
  const [furniture, setFurniture] = React.useState([])
  const [budget, setBudget] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [calculated, setCalculated] = React.useState(false)
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

  const addToDb = async () => {
    try {
      const furnitures = []
      Object.keys(calculatedFurniture).map(item => {
        if (typeof calculatedFurniture[item] == "number") {
          furnitures.push(item)
        }
      })
      const docRef = await addDoc(collection(db, "furnitures"), {
        budget: budget,
        selectedFurnitures: furnitures,
      })
      console.log(docRef.id)
    } catch (err) {
      console.log(err)
    }
  }

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
    setCalculatedFurniture({ ...newFurniture })

    const furnitureAverageObj = Object.keys(averagesArray[selectedFurniture])
      .map(key => [averagesArray[selectedFurniture][key], key])
      .sort((item1, item2) => {
        return item1[0] - item2[0]
      })

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
    ;(async () => {
      await addToDb()
    })()

    setCheaperFurniture(cheaper)
    setClosestFurniture(closest)
    setCostlierFurniture(costlier)
    setCalculated(true)
    if (document !== undefined) {
      const elem = document.getElementById("resultsDiv")
      elem.scrollIntoView()
      setTimeout(() => {
        setLoading(false)
      }, 1700)
    }
  }

  return (
    <div className="font-Monst">
      <Hero
        handleSubmit={handleSubmit}
        furniture={furniture}
        handleBudget={handleBudget}
        handleFurniturePress={handleFurniturePress}
      />
      <Results
        id="resultsDiv"
        selectedFurniture={selectedFurniture}
        closestFurniture={closestFurniture}
        calculatedFurniture={calculatedFurniture}
        cheaperFurniture={cheaperFurniture}
        costlierFurniture={costlierFurniture}
        loading={loading}
        companies={companies}
        calculated={calculated}
      />
    </div>
  )
}

export default Home
