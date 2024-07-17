"use client"

import {useEffect, useRef, useState} from "react";
import {invoke} from '@tauri-apps/api/tauri'
import {
    GearIcon,
    SymbolIcon,
    TrashIcon,
    PlusIcon,
    StackIcon,
    RocketIcon
} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {ScrollArea} from "@/components/ui/scroll-area";
// import { WebviewWindow } from '@tauri-apps/api/window';

export default function Home() {
    const init = useRef(false);
    const [content, setContent] = useState("Default Content");
    const [configName, setConfigName] = useState("~/.kube/config")

    useEffect(() => {
        if (!init.current) {
            init.current = true;
            invoke("load_kube_config").then(val => {
                setContent(val.toString());
            })
        }
    }, []);

    return (
        <div className={"flex h-full w-full flex-col items-center"}>
            <Separator/>
            <div className="flex h-full max-h-full w-full flex-row items-center">
                <div className={" h-full w-[24vw] max-h-full flex flex-col"}>
                    <div className={"font-bold items-center flex flex-col mt-5 mb-5"}>
                        KubeConfigs
                    </div>
                    <Separator/>
                    <ScrollArea className={"h-full w-full rounded-md flex-1"}>
                        <div className={"flex flex-col p-2"}>
                        </div>
                    </ScrollArea>
                    <div className={"flex flex-row justify-between"}>
                        <div>
                            <Button variant="ghost"><GearIcon/></Button>
                            <Button variant="ghost"><SymbolIcon/></Button>
                        </div>
                        <Button variant="ghost"><PlusIcon/></Button>
                    </div>
                </div>

                <Separator orientation="vertical" className={"h-full mr-1"}/>
                <div className={"h-full flex-1 p-2 flex flex-col"}>
                    <div className={"w-full flex justify-between"}>
                        <div className={"flex items-center"}>
                            <Input value={configName} disabled onChange={(e)=>{
                                setConfigName(e.target.value)
                            }}/>
                            {/*<div>~/.kube/config</div>*/}
                        </div>
                        <div>
                            <Button variant="outline" className={"mr-2"}><TrashIcon/></Button>
                            <Button variant="outline" className={"mr-2"}><StackIcon/></Button>
                            <Button className={"mr-2"}><RocketIcon/></Button>
                        </div>
                    </div>
                    <div className={"mt-2 flex-1"}>

                        <Textarea value={content} className={"h-full"} onChange={(e) => {
                            setContent(e.target.value);
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
