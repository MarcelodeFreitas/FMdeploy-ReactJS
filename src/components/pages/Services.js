import '../../App.css'
import ResponsiveAppBar from '../AppBar'

export default function Services() {
    return(
    <>
        <ResponsiveAppBar />
        <h1 className="services" style={{backgroundImage: "url(/images/img-1.jpg)"}}>
            Documentation
        </h1>
    </>
    )
}