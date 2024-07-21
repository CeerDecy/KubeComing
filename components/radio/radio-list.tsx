"use client"

import * as React from "react"
import {RadioItem} from "@/components/radio/radio-item";
import {useEffect, useRef, useState} from "react";
import {Context} from "@/lib/types";

type RadioListProps = {
    data: Context[]
    onSelect?: (index: number) => void;
    currentIndex : number;
    selectIndex : number;
}


export const RadioList: React.FC<RadioListProps> = ({onSelect,selectIndex, data, currentIndex}) => {
    return <div>
        {data.map((item, index) => {
            return <RadioItem key={index} isCurrent={index == currentIndex} selected={index == selectIndex}
                              name={item.name} index={index}
                              onClick={() => {
                                  if (onSelect) {
                                      onSelect(index)
                                  }
                              }}/>
        })}
    </div>
}

RadioList.displayName = "RadioList"