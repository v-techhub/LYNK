import { LynkAnimatedBeamMultiple } from "./LynkAnimatedBeamMultiple"
import WordPullUp from "@/components/magicui/word-pullup";

const ChatBoard = () => {
    return (
        <section className="relative w-auto">
            <WordPullUp
                className="font-normal tracking-[-0.02em] hidden md:block"
                words="Unleash the power of connection. LYNK - Your chat, elevated."
            />
            <LynkAnimatedBeamMultiple />
        </section>
    )
}

export default ChatBoard