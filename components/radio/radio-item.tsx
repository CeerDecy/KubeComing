"use client"

import * as React from "react"
import {FileTextIcon} from "@radix-ui/react-icons"
import "./styles.css"

type RadioItemProps = {
    id?: number,
    name: string,
    selected?: boolean,
    isCurrent?: boolean,
    onClick?: () => void,
    index: number
}


export const RadioItem: React.FC<RadioItemProps> = ({isCurrent, name, selected, onClick, index}) => {
    return <div
        className={"flex flex-row p-2 justify-between items-center hover:bg-secondary rounded-md cursor-pointer"}
        onClick={onClick}>
        <div className={"flex flex-row items-center"}>
            <div className={"mr-2 h-[20px] w-[2px] rounded-md" + (selected ? " bg-primary" : "")}></div>
            <FileTextIcon className={"mr-2"}/>
            <div className={"single-line-ellipsis max-w-[120px]"}>{name}</div>
        </div>
        <div className={"w-1 h-1 rounded " + (isCurrent ? "bg-green-500" : "")}></div>
    </div>
}

RadioItem.displayName = "RadioItem"