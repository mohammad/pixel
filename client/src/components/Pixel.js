import React from 'react';
import Canvas from '../containers/CanvasContainer'
import ToolBar from '../containers/ToolBarContainer'
import SelectContract from '../containers/SelectionContractContainer'

export default function Pixel() {
    return (
        <div>
            <SelectContract />
            <ToolBar />
            <Canvas height={640} width={640} />
        </div>
    )
}