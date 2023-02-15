import React from "react"

function ContentWrapper(props) {
  return (
    <div className="w-100 wrapper flex items-center justify-center">
      <div className="content max-w-[300px] lsm:max-w-[350px] usm:max-w-[400px] md:max-w-[650px] lg:max-w-[970px] xlg:max-w-[1200px]">
        {props.children}
      </div>
    </div>
  )
}

export default ContentWrapper
