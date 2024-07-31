import React from 'react'
import BoxReveal from "@/components/magicui/box-reveal";

type LayoutProps = {
    children: React.ReactNode
    title: string
}

const Layout = ({ children, title }: LayoutProps) => {
    return (
        <section className='overflow-hidden'>
            <BoxReveal boxColor="#10b981">
                <div className="text-center text-xl my-2 flex gap-1 items-end">
                    {title}
                    <div className="h-2 w-2 bg-emerald-500 mb-2"></div>
                </div>
            </BoxReveal>
            {children}
        </section>
    )
}

export default Layout