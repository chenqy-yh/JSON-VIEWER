import React from "react"
import Home from "@/views/home"
import Blog from "@/views/blog"
import Works from '@/views/works'


type RouteItemConfig = {
    name: string
    path: string
    component: React.ReactNode
}

export const routes: RouteItemConfig[] = [
    {
        name: "Home",
        path: "/",
        component: Home()
    },
    {
        name: "Blog",
        path: "/blog",
        component: Blog()
    },
    {
        name: "Works",
        path: "/works",
        component: Works()
    }
]