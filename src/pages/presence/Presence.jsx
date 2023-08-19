import "./presence.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Presencetable from "../../components/presencetable/Presencetable"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Presencetable/>
      </div>
    </div>
  )
}

export default List