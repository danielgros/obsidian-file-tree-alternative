import React, { useState } from 'react';
// @ts-ignore
import { TFile, App, WorkspaceLeaf, Keymap } from 'obsidian';

interface FileTreeProps {
    files: TFile[],
    app: App,
    folderPath: string
}

export function FileTreeComponent({ files, app, folderPath }: FileTreeProps) {

    const [activeFile, setActiveFile] = useState(null);

    const openFile = (file: TFile, e: React.MouseEvent) => {
        app.workspace.openLinkText(file.path, "/", Keymap.isModifier(e, "Mod") || 1 === e.button);
    }

    const getFileNameAndExtension = (fullName: string) => {
        var index = fullName.lastIndexOf('.');
        return {
            fileName: fullName.substring(0, index),
            extension: fullName.substring(index + 1)
        }
    }

    return (
        <React.Fragment>
            <div className="oz-file-tree-header">
                {
                    folderPath === '/' ?
                        app.vault.getName() :
                        folderPath
                }
            </div>
            {files.map(file => {
                return (
                    <div className="oz-nav-file" key={file.path} onClick={(e) => openFile(file, e)}>
                        <div className={'nav-file-title oz-nav-file-title' + (activeFile === file ? ' is-active' : '')} data-path={file.path}>
                            {
                                getFileNameAndExtension(file.name).extension !== 'md' &&
                                <span className="nav-file-tag">
                                    {getFileNameAndExtension(file.name).extension}
                                </span>
                            }
                            <div className="nav-file-title-content">
                                {getFileNameAndExtension(file.name).fileName}
                            </div>
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    )
}