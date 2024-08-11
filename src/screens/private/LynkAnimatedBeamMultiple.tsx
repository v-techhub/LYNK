import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Icons } from "@/utils/beamIcons";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function LynkAnimatedBeamMultiple({
    className,
}: {
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);
    const div7Ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className={cn(
                "relative flex h-screen m-5 w-auto items-center justify-center overflow-hidden rounded-lg md:shadow-xl",
                className,
            )}
            ref={containerRef}
        >
            <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
                <div className="flex flex-col justify-center">
                    <Circle ref={div7Ref}>
                        <Icons.lynk />
                    </Circle>
                </div>
                <div className="flex flex-col justify-center">
                    <Circle ref={div6Ref} className="size-16">
                        <Icons.user />
                    </Circle>
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <Circle ref={div1Ref} className="size-16">
                        <Icons.twoUsers />
                    </Circle>
                    <Circle ref={div2Ref} className="size-16">
                        <Icons.threeUsers />
                    </Circle>
                    <Circle ref={div3Ref} className="size-16">
                        <Icons.call />
                    </Circle>
                    <Circle ref={div4Ref} className="size-16">
                        <Icons.globe />
                    </Circle>
                    <Circle ref={div5Ref} className="size-16">
                        <Icons.chat />
                    </Circle>
                </div>
            </div>

            {/* AnimatedBeams */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                duration={5}
            />
        </div>
    );
}
