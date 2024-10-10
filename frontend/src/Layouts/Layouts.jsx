import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Router from "../routes/Router"



function Layouts() {
    return (
        <>
            <Header />
            <main>
                <Router />
            </main>
            <Footer />
        </>
    )
}

export default Layouts
