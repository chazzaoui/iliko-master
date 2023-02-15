import React from "react"
import HeroText from "./HeroText"

function Misc() {
  return (
    <div className="h-[100vh] flex flex-col lg:w-[57%]">
      <div className="text h-[85vh] lg:h-[60vh] flex items-center justify-center flex-col z-[20]">
        <HeroText
          font="bold"
          text={"We don’t sell you overpriced furniture."}
        />
        <div className="mt-[3rem] lg:mt-[5rem]">
          <HeroText
            
            text={
              "Calculate your furniture budget and see what you can afford."
            }
          />
        </div>
        <a
          href="/#calculate"
          className="bg-DarkPink lg:hidden rounded-md px-3 text-[1.2rem] md:text-[1.6rem] cursor-hover py-2 outline-o hover:bg-Pinkish mt-[3rem] text-white font-light"
        >
          Let's go
        </a>
      </div>

      <div className="bg-couch z-0 absolute w-[100%] h-[100%] lg:w-[50%] lg:h-[60%] bg-blend-dark  left-0 lg:bottom-0"></div>
    </div>
  )
}

export default Misc
