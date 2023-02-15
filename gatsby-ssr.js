import React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/static/fonts/VAGRounded-Light.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="vagRounded"
    />,
  ])
}
