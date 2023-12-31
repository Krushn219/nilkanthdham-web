import "./presence.scss"
import Navbar from "../../components/navbar/Navbar"
import Presencetable from "../../components/presencetable/Presencetable"
import UserSidebar from "../../components/sidebar/UserSidebar"

const List = () => {
  return (
    <div className="list">
      <UserSidebar/>
      <div className="listContainer">
        <Navbar/>
        <Presencetable/>
      </div>
    </div>
  )
}

export default List