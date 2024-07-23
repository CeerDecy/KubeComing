export interface ClusterInfo {
    "server": string;
    "certificate-authority-data": string;
}

export interface Cluster {
    "name": string;
    "cluster": ClusterInfo;
}

export interface ContextInfo {
    "user": string;
    "cluster": string;
    "namespace"?: string;
}

export interface Context {
    "name": string;
    "context": ContextInfo;
}

export interface UserInfo {
    "client-certificate-data": string;
    "client-key-data": string;
}

export interface User {
    "name": string;
    "user": UserInfo;
}

export interface KubeConfig {
    "apiVersion"?: string;
    "clusters": Cluster[];
    "contexts": Context[];
    "users"?: User[];
    "current-context"?: string
}