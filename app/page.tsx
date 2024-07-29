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
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {RadioList} from "@/components/radio/radio-list";
import {Progress} from "@/components/ui/progress";
import {useToast} from "@/components/ui/use-toast";
import {Context, KubeConfig} from "@/lib/types"
// @ts-ignore
import * as yaml from 'js-yaml';
import {ConfigEditor} from "@/components/editor/editor";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {Check, ChevronsUpDown} from "lucide-react"
import {cn} from "@/lib/utils";
import {isRegistered, register, registerAll, unregisterAll} from '@tauri-apps/api/globalShortcut';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {isPermissionGranted, requestPermission, sendNotification} from '@tauri-apps/api/notification';


export default function Home(message?: any) {
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
    const [kubeConfig, setKubeConfig] = useState<KubeConfig>({clusters: [], contexts: [], users: []})
    const [currentCtxIndex, setCurrentCtxIndex] = useState<number>(-1);
    const [selectCtxIndex, setSelectCtxIndex] = useState<number>(-1);

    const [clusterOpen, setClusterOpen] = useState(false)
    const [contextClusterIndex, setContextClusterIndex] = useState(0)
    let searchCluster = ""

    const [userOpen, setUserOpen] = useState(false)
    const [contextUserIndex, setContextUserIndex] = useState(0)
    let searchUser = ""

    let deleted = false

    const applyContext = (index: number, kc: KubeConfig, configPath: string) => {
        const config = {...kc}
        if (config.contexts.length <= index) {
            toast({
                title: "Apply Kube Config",
                description: "can't find such kube config " + config.contexts.length + " " + index,
            })
            return
        }
        config["current-context"] = kc.contexts[index].name
        const content = yaml.dump(config);
        invoke<string>("write_to_file", {filePath: configPath, content: content}).then(res => {
            toast({
                title: "Apply Kube Config",
                description: "[" + config.contexts[index].name + "] has been applied",
            })
            initConfigYaml()

        }).catch((e) => {
            toast({
                title: "Apply Kube Config",
                description: e.toString(),
            })
        })
    }

    const saveContext = () => {
        const config = yaml.dump(kubeConfig);
        invoke<string>("write_to_file", {filePath: configPath, content: config}).then(res => {
            toast({
                title: "Save Kube Config",
                description: "[" + kubeConfig.contexts[selectCtxIndex].name + "] has been saved",
            })
            initConfigYaml()

        }).catch((e) => {
            toast({
                title: "Save Kube Config",
                description: e.toString(),
            })
        })
    }

    const registerShortcut = (kc: KubeConfig, configPath: string) => {
        unregisterAll().then()

        const keys = ['CommandOrControl+Shift+F1', 'CommandOrControl+Shift+F2', 'CommandOrControl+Shift+F3', 'CommandOrControl+Shift+F4', 'CommandOrControl+Shift+F5',
            'CommandOrControl+Shift+F6', 'CommandOrControl+Shift+F7', 'CommandOrControl+Shift+F8', 'CommandOrControl+Shift+F9', 'CommandOrControl+Shift+F10',
            'CommandOrControl+Shift+F11', 'CommandOrControl+Shift+F12']

        registerAll(keys, (shortcut) => {
            let index = -1
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] === shortcut) {
                    index = i
                    break
                }
            }
            if (index === -1 || kc.contexts.length <= index) return
            applyContext(index, kc, configPath)
            sendNotification({title: "Switch Context", body: "[" + kc.contexts[index].name + "] has been applied"})

        }).then()
    }

    const onSelectCtx = (index: number) => {
        // setCurrentCtxIndex(index)
        initConfigYaml()
        setSelectCtxIndex(index)
        if (index >= 0) {
            let cluster = kubeConfig.clusters.find((cluster) => {
                return cluster.name === kubeConfig.contexts[index].context.cluster
            })
            if (cluster) {
                setContextClusterIndex(kubeConfig.clusters.lastIndexOf(cluster))
            } else {
                setContextClusterIndex(0)
            }
            let user = kubeConfig.users.find((user) => {
                return user.name === kubeConfig.contexts[index].context.user
            })
            if (user) {
                setContextUserIndex(kubeConfig.users.lastIndexOf(user))
            } else {
                setContextUserIndex(0)
            }
        }
    }

    const saveContentConfig = () => {
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

                kc.contexts.forEach((item, index) => {
                    if (item.name === kc["current-context"]) {
                        setCurrentCtxIndex(index)
                    }
                })
                registerShortcut(kc, configPath)
            })
        })
    }

    const initPermission = async () => {
        let permissionGranted = await isPermissionGranted();
        if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === 'granted';
        }
    }

    useEffect(() => {
        if (!init.current) {
            init.current = true;

            initConfigYaml()
            initTheme()
            initPermission().then()
        }
    }, []);


    return (
        <div className={"flex h-full w-full flex-col items-center "}>
            <Separator className={(!showProgress ? "" : "hidden")}/>
            <Progress value={progress} className={"w-full h-[1px] bg-secondary " + (showProgress ? "" : "hidden")}/>
            <div className="flex h-full max-h-full w-full flex-row items-center">
                <div className={" h-full w-[24vw] max-h-full flex flex-col"}>
                    <div className={"font-bold items-center flex flex-col mt-5 mb-5 hover:cursor-pointer"}
                         onClick={() => {
                             onSelectCtx(-1)
                         }}>
                        KubeConfigs
                    </div>
                    <Separator/>
                    <ScrollArea className={"h-[100px] w-full rounded-md flex-1"}>
                        <div className={"flex flex-col p-2"}>
                            <RadioList data={kubeConfig.contexts} currentIndex={currentCtxIndex}
                                       selectIndex={selectCtxIndex}
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
                    selectCtxIndex === -1 &&
                    <ConfigEditor content={content} onApply={saveContentConfig} onContentChange={(c) => {
                        setContent(c)
                    }}/>
                }
                {
                    selectCtxIndex !== -1 && <div className={"h-full flex-1 p-2 flex flex-col"}>
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex items-center"}>
                                <Input value={kubeConfig.contexts[selectCtxIndex].name} onChange={(e) => {
                                    const val = e.target.value
                                    const cfg = {...kubeConfig}
                                    cfg.contexts[selectCtxIndex].name = val
                                    setKubeConfig(cfg)
                                }}/>
                            </div>
                            <div>
                                <Button variant="outline" className={"mr-2"}><TrashIcon/></Button>
                                <Button variant="outline" className={"mr-2"} onClick={saveContext}><StackIcon/></Button>
                                <Button className={"mr-2"} onClick={() => {
                                    applyContext(selectCtxIndex, kubeConfig, configPath)
                                }}><RocketIcon/></Button>
                            </div>
                        </div>
                        {/*<Separator className={"mt-2"}/>*/}
                        <ScrollArea className={"h-[100px] flex-1 pr-2"}>
                            <div className={"mt-2 flex flex-col p-2"}>
                                <div className={"flex flex-col"}>
                                    <Label className={"mb-2"}>cluster:</Label>
                                    <Popover open={clusterOpen} onOpenChange={setClusterOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={clusterOpen}
                                                className="w-[200px] justify-between"
                                            >
                                                {contextClusterIndex >= 0
                                                    ? kubeConfig.clusters.find((cluster) => cluster.name === kubeConfig.clusters[contextClusterIndex].name)?.name
                                                    : "Select cluster..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search cluster..." onChangeCapture={(e) => {
                                                    searchCluster = e.currentTarget.value
                                                }}/>
                                                <CommandEmpty><Button variant={"ghost"}
                                                                      className={"w-full text-muted-foreground"}
                                                                      onClick={() => {
                                                                          let cluster = {
                                                                              name: searchCluster,
                                                                              cluster: {
                                                                                  server: "",
                                                                                  "certificate-authority-data": ""
                                                                              }
                                                                          }
                                                                          kubeConfig.clusters.push(cluster)
                                                                          let index = kubeConfig.clusters.lastIndexOf(cluster);
                                                                          // TODO Wrapped into a function
                                                                          setContextClusterIndex(index)
                                                                          let config = {...kubeConfig}
                                                                          config.contexts[selectCtxIndex].context.cluster = kubeConfig.clusters[index].name
                                                                          setKubeConfig(config)
                                                                          setClusterOpen(false)
                                                                      }}>add cluster</Button></CommandEmpty>
                                                <CommandGroup>
                                                    {kubeConfig.clusters.map((cluster, index) => (
                                                        <CommandItem key={index} value={cluster.name}
                                                                     onSelect={(currentValue) => {
                                                                         // TODO Simplified code
                                                                         if (deleted) {
                                                                             setContextClusterIndex(0)
                                                                             let config = {...kubeConfig}
                                                                             config.contexts[selectCtxIndex].context.cluster = config.clusters[0].name
                                                                             setKubeConfig(config)
                                                                         } else {
                                                                             setContextClusterIndex(currentValue === kubeConfig.clusters[contextClusterIndex].name ? contextClusterIndex : index)
                                                                             let config = {...kubeConfig}
                                                                             config.contexts[selectCtxIndex].context.cluster = cluster.name
                                                                             setKubeConfig(config)
                                                                         }
                                                                         deleted = false
                                                                     }}
                                                                     className={"flex flex-row items-center justify-between"}
                                                        >
                                                            <div className={"flex flex-row items-center"}>
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        contextClusterIndex === index ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                <div className={"single-line-ellipsis max-w-[120px]"}>
                                                                    {cluster.name}
                                                                </div>
                                                            </div>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger>
                                                                    <TrashIcon
                                                                        className={"hover:cursor-pointer hover:text-red-500"}/>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Delete this
                                                                            user?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. This will
                                                                            permanently delete your account
                                                                            and remove your data from our servers.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => {
                                                                            if ((contextClusterIndex < 0 || contextClusterIndex >= kubeConfig.clusters.length) && kubeConfig.clusters.length > 0) return
                                                                            let deleteIndex = contextClusterIndex
                                                                            deleted = true
                                                                            kubeConfig.clusters.splice(deleteIndex, 1)
                                                                        }}>Yes</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className={"flex flex-col"}>
                                    <Label className={"mt-4 mb-2"}>Server:</Label>
                                    <Input value={kubeConfig.clusters[contextClusterIndex].cluster.server}
                                           onChange={(e) => {
                                               const config = {...kubeConfig}
                                               config.clusters[contextClusterIndex].cluster.server = e.target.value
                                               setKubeConfig(config)
                                           }}/>
                                </div>
                                <div className={"flex flex-col"}>
                                    <Label className={"mt-4 mb-2"}>Certificate Authority:</Label>
                                    <Textarea className={"h-[20vh]"}
                                              value={kubeConfig.clusters[contextClusterIndex].cluster["certificate-authority-data"]}
                                              onChange={(e) => {
                                                  const config = {...kubeConfig}
                                                  config.clusters[contextClusterIndex].cluster["certificate-authority-data"] = e.target.value;
                                                  setKubeConfig(config)
                                              }}/>
                                </div>


                                <Separator className={"mt-5"}/>


                                <div className={"flex flex-col"}>
                                    <Label className={"mt-6 mb-2"}>User:</Label>
                                    <Popover open={userOpen} onOpenChange={setUserOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={userOpen}
                                                className="w-[200px] justify-between"
                                            >
                                                {contextUserIndex >= 0
                                                    ? kubeConfig.users.find((user) => user.name === kubeConfig.users[contextUserIndex].name)?.name
                                                    : "Select user..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search cluster..." onChangeCapture={(e) => {
                                                    searchUser = e.currentTarget.value
                                                }}/>
                                                <CommandEmpty>
                                                    <Button variant={"ghost"}
                                                            className={"w-full text-muted-foreground"}
                                                            onClick={() => {
                                                                let user = {
                                                                    name: searchUser,
                                                                    user: {
                                                                        "client-certificate-data": "",
                                                                        "client-key-data": ""
                                                                    }
                                                                }
                                                                kubeConfig.users.push(user)
                                                                let index = kubeConfig.users.lastIndexOf(user);
                                                                setContextUserIndex(index)
                                                                let config = {...kubeConfig}
                                                                config.contexts[selectCtxIndex].context.user = kubeConfig.users[index].name
                                                                setKubeConfig(config)
                                                                setUserOpen(false)
                                                            }}>add User</Button>
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {kubeConfig.users.map((user, index) => (
                                                        <CommandItem key={index} value={user.name}
                                                                     onSelect={(currentValue) => {
                                                                         if (deleted) {
                                                                             setContextUserIndex(0)
                                                                             let config = {...kubeConfig}
                                                                             config.contexts[selectCtxIndex].context.user = config.users[0].name
                                                                             setKubeConfig(config)
                                                                         } else {
                                                                             setContextUserIndex(currentValue === kubeConfig.users[contextUserIndex].name ? contextUserIndex : index)
                                                                             let config = {...kubeConfig}
                                                                             config.contexts[selectCtxIndex].context.user = user.name
                                                                             setKubeConfig(config)
                                                                         }
                                                                         deleted = false
                                                                     }}
                                                                     className={"flex flex-row items-center justify-between"}
                                                        >
                                                            <div className={"flex flex-row items-center"}>
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        contextUserIndex === index ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                <div className={"single-line-ellipsis max-w-[120px]"}>
                                                                    {user.name}
                                                                </div>
                                                            </div>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger>
                                                                    <TrashIcon
                                                                        className={"hover:cursor-pointer hover:text-red-500"}/>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Delete this
                                                                            user?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. This will
                                                                            permanently delete your account
                                                                            and remove your data from our servers.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => {
                                                                            if ((contextUserIndex < 0 || contextUserIndex >= kubeConfig.users.length) && kubeConfig.users.length > 0) return
                                                                            let deleteIndex = contextUserIndex
                                                                            deleted = true
                                                                            kubeConfig.users.splice(deleteIndex, 1)
                                                                        }}>Yes</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className={"flex flex-col"}>
                                    <Label className={"mt-4 mb-2"}>Client Certificate:</Label>
                                    <Textarea className={"h-[20vh]"}
                                              value={kubeConfig.users[contextUserIndex].user["client-certificate-data"]}
                                              onChange={(e) => {
                                                  const config = {...kubeConfig}
                                                  config.users[contextUserIndex].user["client-certificate-data"] = e.target.value;
                                                  setKubeConfig(config)
                                              }}/>
                                </div>

                                <div className={"flex flex-col"}>
                                    <Label className={"mt-4 mb-2"}>Client Key:</Label>
                                    <Textarea className={"h-[20vh]"}
                                              value={kubeConfig.users[contextUserIndex].user["client-key-data"]}
                                              onChange={(e) => {
                                                  const config = {...kubeConfig}
                                                  config.users[contextUserIndex].user["client-key-data"] = e.target.value;
                                                  setKubeConfig(config)
                                              }}/>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                }
            </div>
        </div>
    );
}
