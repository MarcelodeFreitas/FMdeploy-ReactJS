import '../../App.css'
import Cards from '../Cards'
import HeroSection from '../HeroSection'
import Footer from '../Footer'
import Navbar from '../Navbar'
import HomeButtons from '../HomeButtons'


function Home () {
    return(
        <>
            <Navbar/>
            <HeroSection/>
            <HomeButtons/>
            <Cards/>
            <Footer/>
        </>
    )
}

export default Home