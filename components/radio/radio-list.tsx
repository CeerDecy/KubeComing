"use client"

import * as React from "react"
import {RadioItem} from "@/components/radio/radio-item";
import {useState} from "react";

export type Item = {
    id: number;
    name: string;
    selected: boolean;
}

type RadioListProps = {
    data: Item[]
    onSelect?: (index: number) => void;
}


export const RadioList: React.FC<RadioListProps> = ({onSelect,data}) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    return <div>
        {data.map((item, index) => {
            return <RadioItem key={index} selected={index == selectedIndex} name={item.name} onClick={() => {
                setSelectedIndex(index)
                if (onSelect) {
                    onSelect(index)
                }
            }}/>
        })}
    </div>
}

RadioList.displayName = "RadioList"