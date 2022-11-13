import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <rect x="0" y="250" rx="9" ry="9" width="280" height="27" /> 
    <rect x="0" y="298" rx="9" ry="9" width="280" height="88" /> 
    <circle cx="139" cy="118" r="110" /> 
    <rect x="149" y="410" rx="13" ry="15" width="130" height="40" /> 
    <rect x="0" y="413" rx="3" ry="5" width="90" height="30" />
  </ContentLoader>
)

export default Skeleton