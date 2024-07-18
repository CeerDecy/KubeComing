"use client"

import * as React from "react"
import {FileTextIcon} from "@radix-ui/react-icons"
import "./styles.css"

type RadioItemProps = {
    id?: number,
    name: string,
    selected?: boolean,
    onClick?: () => void
}


export const RadioItem: React.FC<RadioItemProps> = ({id, name, selected, onClick}) => {
    return <div className={"flex flex-row p-2 items-center hover:bg-secondary rounded-md cursor-pointer"} onClick={onClick}>
        <div className={"mr-2 h-[20px] w-[2px]" + (selected ? " bg-primary" : "")}></div>
        <FileTextIcon className={"mr-2"}/>
        <div className={"single-line-ellipsis max-w-[120px]"}>{name}</div>
    </div>
}

RadioItem.displayName = "RadioItem"