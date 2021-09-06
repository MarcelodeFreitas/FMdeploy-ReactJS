import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import AppHeader from "../../AppHeader"
import SearchById from "../../SearchById"

const Shared = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Shared Models" button="SHARE" buttonIcon="share-alt" path="/my"/>
        <SearchById />
      </div>
    </>
  )
}

export default Shared