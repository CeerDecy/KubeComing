<div align="center">

<img src="src-tauri/icons/icon_512x512@2x.png" width="70" />

### KubeComing

[简体中文](docs/README_CN.md)

![License](https://img.shields.io/badge/License--MIT-black?logo=DISCLAIMER)
![Tauri](https://img.shields.io/badge/Tauri-black?logo=tauri&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?logo=typescript&logoColor=white)
![Rust](https://img.shields.io/badge/-Rust-black?logo=rust&logoColor=white)
![MacOS](https://img.shields.io/badge/-macOS-black?&logo=apple&logoColor=white)
![MacOS](https://img.shields.io/badge/-Kubernetes-black?&logo=kubernetes&logoColor=white)

</div>

## Installation

You can download from [Github Release](https://github.com/CeerDecy/KubeComing/releases)

## Introduction

KubeComing is a tool designed to simplify the management of your Kubernetes configuration files (KubeConfig). With its
user-friendly visual interface, you can easily manage multiple contexts and switch between them quickly using keyboard
shortcuts.

![img.png](docs/image/KubeEditorPage.png)

![img.png](docs/image/ContextDetailsPage.png)

## Features

- **Visual Interface**: Manage your KubeConfig files through an intuitive graphical user interface.
- **Quick Context Switching**: Use keyboard shortcuts to switch between Kubernetes contexts quickly.

## Shortcuts

Currently, the shortcuts only support F1 to F12, but this does not mean that the number of contexts is limited to 12. The shortcuts will be mapped according to the order of the contexts.

| Shortcuts         | Context Index |
|-------------------|---------------|
| Command+Shift+F1  | 0             |
| Command+Shift+F2  | 1             |
| Command+Shift+F3  | 2             |
| ...               | ...           |
| Command+Shift+F12 | 11            |

## Tips

Enable notifications in the system notification settings to display notifications when switching contexts using shortcuts.

![img.png](docs/image/OsSetting.png)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.