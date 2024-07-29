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
import {KubeConfig} from "@/lib/types";
import * as yaml from "js-yaml";

export const Importer: React.FC = () => {
    const [content, setContent] = useState("# here input your kube config")
    const [kubeConfig, setKubeConfig] = useState<KubeConfig>({users: [], contexts: [], clusters: []})

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

    const LoadKubeConfig = () => {
        let kubeConfig = loadYaml(content);
        setKubeConfig(kubeConfig)
    }


    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost"><PlusIcon/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80vw]">
            <DialogHeader>
                <DialogTitle>Load from Kube Config</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 grid-cols-3 py-4">
                <div>
                    <Label
                        className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "}>Context</Label>
                    <div className="flex flex-col space-y-2 mt-2">
                        {kubeConfig.contexts.map((context, index) => {
                            return <div key={index} className={"flex space-x-2"}>
                                <Checkbox id={context.name} onCheckedChange={() => {

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
                        {kubeConfig.clusters.map((clusters, index) => {
                            return <div key={index} className={"flex space-x-2"}>
                                <Checkbox id={clusters.name}/>
                                <Label htmlFor={clusters.name} className="single-line-ellipsis">
                                    {clusters.name}
                                </Label>
                            </div>
                        })}
                    </div>
                </div>
                <div>
                    <Label>User</Label>
                    {kubeConfig.users.map((users, index) => {
                        return <div key={index} className={"flex space-x-2"}>
                            <Checkbox id={users.name}/>
                            <Label htmlFor={users.name} className="single-line-ellipsis">
                                {users.name}
                            </Label>
                        </div>
                    })}
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
                    <Button type="submit" variant="outline">Save changes</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}