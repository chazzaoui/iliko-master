import React from "react"

function SmallText({ text, inline = false }) {
  return (
    <p
      className={`text-[1rem] ${
        inline && "inline"
      } md:text-[1.1rem] font-medium`}
    >
      {text}
    </p>
  )
}

export default SmallText
