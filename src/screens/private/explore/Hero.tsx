import BoxReveal from "@/components/magicui/box-reveal";
import { DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <div className="relative h-screen w-auto p-5 flex flex-col gap-10 md:gap-[100px]">
            <div className="-z-10 absolute inset-0 bg-[url('/lady_on_phone.jpg')] bg-cover bg-no-repeat"></div>  {/* Background */}
            <div className="-z-10 absolute inset-0 bg-gradient-to-r from-[#065f46d8] to-[#3b2a2a67]"></div> {/* Gradient */}
            <BoxReveal boxColor="#10b981">
                <div className="text-white text-xl font-normal flex gap-1 items-end ">Connect with Others <div className="h-2 w-2 bg-emerald-500 mb-2"></div></div>
            </BoxReveal>

            <BoxReveal boxColor="#10b981">
                <div className="text-5xl md:text-7xl text-white w-[50%]">Explore, discover, and connect with potential people from all over the world</div>
            </BoxReveal>

            <BoxReveal boxColor="#10b981">
                <DrawerTrigger asChild>
                    <Button className="bg-emerald-500 text-black p-4 rounded-md active:scale-95 transition-all w-fit hover:text-white">Start Exploring</Button>
                </DrawerTrigger>
            </BoxReveal>
        </div>
    )
}