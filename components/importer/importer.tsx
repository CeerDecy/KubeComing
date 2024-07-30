"use client"

import * as React from "react"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "postcss";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {Cluster, Context, KubeConfig, User} from "@/lib/types";
// @ts-ignore
import * as yaml from "js-yaml";

type ImporterProp = {
    importFunc?: (contexts: Context[], clusters: Cluster[], users: User[]) => void
}

export const Importer: React.FC<ImporterProp> = ({importFunc}) => {
    const [content, setContent] = useState("# here input your kube config")
    const [kubeConfig, setKubeConfig] = useState<KubeConfig>({users: [], contexts: [], clusters: []})
    const [contextCheck, setContextCheck] = useState<boolean[]>([])
    const [clusterCheck, setClusterCheck] = useState<boolean[]>([])
    const [userCheck, setUserCheck] = useState<boolean[]>([])

    function loadYaml(contents: string): KubeConfig {
        try {
            const data = yaml.load(contents, null);
            // 类型断言，确保 data 符合 Person 接口
            return data as KubeConfig;
        } catch (e) {
            console.log(e);
            return {contexts: [], clusters: [], users: []} as KubeConfig;
        }
    }

    const LoadKubeConfig = () => {
        let kubeConfig = {...loadYaml(content)};
        setContextCheck(new Array<boolean>(kubeConfig.contexts.length).fill(false))
        setClusterCheck(new Array<boolean>(kubeConfig.clusters.length).fill(false))
        setUserCheck(new Array<boolean>(kubeConfig.users.length).fill(false))
        setKubeConfig(kubeConfig)
    }

    const LinkedCluster = (cluster: string) => {
        for (let i = 0; i < kubeConfig.clusters.length; i++) {
            if (kubeConfig.clusters[i].name === cluster) {
                let checkList = {...clusterCheck}
                checkList[i] = true
                setClusterCheck(checkList)
                return
            }
        }
    }

    const LinkedUser = (user: string) => {
        for (let i = 0; i < kubeConfig.users.length; i++) {
            if (kubeConfig.users[i].name === user) {
                let checkList = {...userCheck}
                checkList[i] = true
                setUserCheck(checkList)
                return
            }
        }
    }


    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost"><PlusIcon/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80vw]">
            <DialogHeader>
                <DialogTitle>Load from Kube Config</DialogTitle>
                <DialogDescription>
                    {"Make changes to your profile here. Click save when you're done."}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 grid-cols-3 py-4">
                <div>
                    <Label
                        className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "}>Context</Label>
                    <div className="flex flex-col space-y-2 mt-2">
                        {kubeConfig.contexts.length === 0 && <div className={"text-muted-foreground"}>null</div>}
                        {kubeConfig.contexts.map((context, index) => {
                            return <div key={index} className={"flex space-x-2"}>
                                <Checkbox checked={contextCheck[index]} id={context.name} onCheckedChange={() => {
                                    let checkList = {...contextCheck}
                                    checkList[index] = !checkList[index]
                                    setContextCheck(checkList)
                                    LinkedCluster(context.context.cluster)
                                    LinkedUser(context.context.user)
                                }}/>
                                <Label htmlFor={context.name} className="single-line-ellipsis">
                                    {context.name}
                                </Label>
                            </div>
                        })}
                    </div>
                </div>
                <div>
                    <Label>Cluster</Label>
                    <div className="flex flex-col space-y-2 mt-2">
                        {kubeConfig.clusters.length === 0 && <div className={"text-muted-foreground"}>null</div>}
                        {kubeConfig.clusters.map((clusters, index) => {
                            return <div key={index} className={"flex space-x-2"}>
                                <Checkbox id={clusters.name} checked={clusterCheck[index]} onCheckedChange={() => {
                                    let checkList = {...clusterCheck}
                                    checkList[index] = !checkList[index]
                                    setClusterCheck(checkList)
                                }}/>
                                <Label htmlFor={clusters.name} className="single-line-ellipsis">
                                    {clusters.name}
                                </Label>
                            </div>
                        })}
                    </div>
                </div>
                <div>
                    <Label>User</Label>
                    <div className="flex flex-col space-y-2 mt-2">
                        {kubeConfig.users.length === 0 && <div className={"text-muted-foreground"}>null</div>}
                        {kubeConfig.users.map((users, index) => {
                            return <div key={index} className={"flex space-x-2"}>
                                <Checkbox id={users.name} checked={userCheck[index]} onCheckedChange={() => {
                                    let checkList = {...userCheck}
                                    checkList[index] = !checkList[index]
                                    setUserCheck(checkList)
                                }}/>
                                <Label htmlFor={users.name} className="single-line-ellipsis">
                                    {users.name}
                                </Label>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <DialogFooter>
                <div>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost">Load</Button>
                        </DrawerTrigger>
                        <DrawerContent className={"h-full"}>
                            <DrawerHeader>
                                <div className={"flex flex-row justify-between items-center"}>
                                    <div>
                                        <DrawerTitle>KubeConfig</DrawerTitle>
                                    </div>
                                    <DrawerClose className={"gap-2 grid grid-cols-2"}>
                                        <Button variant="ghost">Cancel</Button>
                                        <Button variant="outline" onClick={LoadKubeConfig}>Load</Button>
                                    </DrawerClose>
                                </div>
                            </DrawerHeader>
                            <div className={"mx-2 h-full"}>
                                <Textarea className={"h-full"} value={content} onChange={(e) => {
                                    setContent(e.target.value)
                                }}/>
                            </div>
                            <DrawerFooter>

                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>

                <DialogClose>
                    <Button type="submit" variant="outline" onClick={() => {
                        let contexts: Context[] = []
                        let clusters: Cluster[] = []
                        let users: User[] = []

                        for (let i = 0; i < kubeConfig.contexts.length; i++) {
                            if (contextCheck[i]) {
                                contexts.push(kubeConfig.contexts[i])
                            }
                        }

                        for (let i = 0; i < kubeConfig.clusters.length; i++) {
                            if (clusterCheck[i]) {
                                clusters.push(kubeConfig.clusters[i])
                            }
                        }

                        for (let i = 0; i < kubeConfig.users.length; i++) {
                            if (userCheck[i]) {
                                users.push(kubeConfig.users[i])
                            }
                        }

                        if (importFunc) {
                            importFunc(contexts, clusters, users)
                        }
                        setKubeConfig({users: [], contexts: [], clusters: []})
                    }}>Import</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}