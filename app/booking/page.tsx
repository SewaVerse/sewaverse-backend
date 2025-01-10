import LeftSide from "./components/LeftSide"
import RightSide from "./components/RightSide"

const page = () => {
  return (
   <div>
     <div className=" flex items-start"> 
        <LeftSide />
        <RightSide />
    </div>
    <div>
     
    </div>
   </div>
  )
}

export default page