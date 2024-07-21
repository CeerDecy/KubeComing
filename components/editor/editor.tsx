"use client"

import * as React from "react"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {RocketIcon, StackIcon, TrashIcon} from "@radix-ui/react-icons";
import {Textarea} from "@/components/ui/textarea";
import {useEffect, useRef, useState} from "react";

type ConfigEditorProps = {
    content: string
    onApply?: () => void
    onContentChange?: (content: string) => void
}

export const ConfigEditor: React.FC<ConfigEditorProps> = (props) => {
    const init = useRef(false);
    const [configName, setConfigName] = useState("~/.kube/config")

    useEffect(() => {
        if (init.current) {
            init.current = true
        }
    }, []);

    return <div className={"h-full flex-1 p-2 flex flex-col"}>
        <div className={"w-full flex justify-between"}>
            <div className={"flex items-center"}>
                <Input value={configName} disabled onChange={(e) => {
                    setConfigName(e.target.value)
                }}/>
            </div>
            <div>
                <Button variant="outline" className={"mr-2"}><TrashIcon/></Button>
                <Button variant="outline" className={"mr-2"}><StackIcon/></Button>
                <Button className={"mr-2"} onClick={props.onApply}><RocketIcon/></Button>
            </div>
        </div>
        <div className={"mt-2 flex-1"}>

            <Textarea value={props.content} className={"h-full"} onChange={(e) => {
                if (props.onContentChange) {
                    props.onContentChange(e.target.value)
                }
            }}/>
        </div>
    </div>
}

ConfigEditor.displayName = "ConfigEditor"

