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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {useTheme} from "next-themes"
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {RadioList} from "@/components/radio/radio-list";
import {Progress} from "@/components/ui/progress";
import {useToast} from "@/components/ui/use-toast";
import {Context, KubeConfig} from "@/lib/types"
import * as yaml from 'js-yaml';
import {ConfigEditor} from "@/components/editor/editor";

export default function Home() {
    const init = useRef(false);
    const [content, setContent] = useState("Default Content");
    const [configName, setConfigName] = useState("~/.kube/config")
    const [showProgress, setShowProgress] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [configPath, setConfigPath] = useState("")
    const {setTheme} = useTheme()
    const themes = [
        {mode: "light", name: "Light"},
        {mode: "dark", name: "Dark"},
        {mode: "system", name: "System"}
    ]
    const [currentTheme, setCurrentTheme] = useState<string>("System")
    const {toast} = useToast()
    const [kubeConfig, setKubeConfig] = useState<KubeConfig>({contexts: []})
    const [currentCtxIndex, setCurrentCtxIndex] = useState<number>(-1);
    const [selectCtxIndex, setSelectCtxIndex] = useState<number>(-1);


    const onSelectCtx = (index:number) =>{
        // setCurrentCtxIndex(index)
        setSelectCtxIndex(index)
    }

    const apply = () => {
        setShowProgress(true);
        setProgress(0)

        setTimeout(() => {
            setProgress(100)
            setTimeout(() => {
                setShowProgress(false)
                console.log(configPath)
                invoke<string>("write_to_file", {filePath: configPath, content: content}).then(res => {
                    toast({
                        title: "Apply Kube Config",
                        description: "[" + configName + "] has been applied",
                    })
                    initConfigYaml()

                }).catch((e) => {
                    toast({
                        title: "Apply Kube Config",
                        description: e.toString(),
                    })
                })

            }, 2000)
        }, 0)
    }

    const initTheme = () => {
        let theme = localStorage.getItem("theme")
        if (theme != null && theme !== "") {
            setCurrentTheme(theme)
            setTheme(theme)
        }
    }

    function selectFile() {
        invoke<string>("pick_file").then(res => {
            setConfigName(res)
            setConfigPath(res)
            localStorage.setItem("config_path", res)
        })
    }

    function loadYaml(contents: string): KubeConfig {
        try {
            const data = yaml.load(contents, null);
            // 类型断言，确保 data 符合 Person 接口
            return data as KubeConfig;
        } catch (e) {
            console.log(e);
            return {} as KubeConfig;
        }
    }

    const initConfigYaml = () => {
        invoke<string>("get_home_path").then(res => {
            let configPath = res + "/.kube/config"
            let path = localStorage.getItem("config_path");
            if (path && path !== "") {
                configPath = path
            }
            setConfigPath(configPath)
            setConfigName(configPath)
            invoke<string>("load_kube_config", {path: configPath}).then(val => {
                setContent(val);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                let kc = loadYaml(val);
                setKubeConfig(kc)

                kc.contexts.forEach((item,index) =>{
                    if (item.name === kc["current-context"]) {
                        setCurrentCtxIndex(index)
                    }
                })

            })
        })
    }

    useEffect(() => {
        if (!init.current) {
            init.current = true;

            initConfigYaml()
            initTheme()
        }
    }, []);


    return (
        <div className={"flex h-full w-full flex-col items-center "}>
            <Separator className={(!showProgress ? "" : "hidden")}/>
            <Progress value={progress} className={"w-full h-[1px] bg-secondary " + (showProgress ? "" : "hidden")}/>
            <div className="flex h-full max-h-full w-full flex-row items-center">
                <div className={" h-full w-[24vw] max-h-full flex flex-col"}>
                    <div className={"font-bold items-center flex flex-col mt-5 mb-5 hover:cursor-pointer"} onClick={()=>{
                        onSelectCtx(-1)
                    }}>
                        KubeConfigs
                    </div>
                    <Separator/>
                    <ScrollArea className={"h-[100px] w-full rounded-md flex-1"}>
                        <div className={"flex flex-col p-2"}>
                            <RadioList data={kubeConfig.contexts} currentIndex={currentCtxIndex} selectIndex={selectCtxIndex}
                                       onSelect={onSelectCtx}/>
                        </div>
                    </ScrollArea>
                    <div className={"flex flex-row justify-between"}>
                        <div>
                            <Sheet>
                                <SheetTrigger asChild><Button variant="ghost" onClick={() => {
                                    console.log(currentTheme)
                                }}><GearIcon/></Button></SheetTrigger>
                                <SheetContent side="left">
                                    <SheetHeader>
                                        <SheetTitle className={"mt-5"}>Setting</SheetTitle>
                                        <SheetDescription>
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col">
                                        <div className="flex  flex-row items-center mb-2">
                                            <Label className="text-right w-[100px] mr-5">
                                                Theme
                                            </Label>
                                            <Select defaultValue={currentTheme} onValueChange={(val) => {
                                                setTheme(val)
                                                setCurrentTheme(val)
                                                localStorage.setItem("theme", val)
                                            }}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {themes.map((value, index) => {
                                                            return <SelectItem key={index}
                                                                               value={value.mode}>{value.name}</SelectItem>
                                                        })}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex  flex-row items-center">
                                            <Label htmlFor="picture" className="text-right w-[100px] mr-6">
                                                Kube Config
                                            </Label>
                                            <Button variant="link" className={"w-[180px]"}>{configPath}</Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <Button variant="ghost"><SymbolIcon/></Button>
                        </div>
                        <Button variant="ghost"><PlusIcon/></Button>
                    </div>
                </div>

                <Separator orientation="vertical" className={"h-full mr-1"}/>
                {
                    selectCtxIndex === -1 && <ConfigEditor content={content} onApply={apply} onContentChange={(c) => {
                        setContent(c)
                    }}/>
                }
                {
                    selectCtxIndex !== -1 && <div>1</div>
                }

            </div>
        </div>
    );
}
