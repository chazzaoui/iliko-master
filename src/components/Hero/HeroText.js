import React from "react"

function HeroText({ text, font }) {
  return (
    <div
      className={`font-${
        font ? "bold" : "semibold"
      } text-[1.7rem] md:text-[2rem] lg:text-[1.9rem] leading-tight text-center lg:text-start lg:font-bold`}
    >
      {text}
    </div>
  )
}

export default HeroText
