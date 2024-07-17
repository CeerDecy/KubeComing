"use client"

import * as React from "react"
import {RadioItem} from "@/components/radio/radio-item";

export type Item = {
    id: number;
    name: string;
    selected: boolean;
}

type RadioListProps = {
    items?: Item[]
    onSelect?: (name: string) => void;
}

const data: Item[] = [
    {
        id: 1,
        name: "erda-jicheng",
        selected: false
    },
    {
        id: 2,
        name: "yhn-kind",
        selected: false
    }
]


export const RadioList: React.FC<RadioListProps> = ({}) => {
    return <div>
        {data.map((item, index) => {
            return <RadioItem key={index} selected={index == 0} name={item.name} onClick={() => {
                item.selected = !item.selected;
            }}/>
        })}
    </div>
}

RadioList.displayName = "RadioList"