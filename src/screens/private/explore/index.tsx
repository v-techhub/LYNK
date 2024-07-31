import HeroSection from "./Hero"
import { Drawer } from "@/components/ui/drawer"
import ListOfPeople from "./ListOfPeople"

const Explore = () => {
    return (
        <section className="w-full h-fit">
            <Drawer>
                <HeroSection />
                <ListOfPeople />
            </Drawer>
        </section>
    )
}

export default Explore