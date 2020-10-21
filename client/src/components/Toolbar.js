import React, { useState } from 'react';
import { BRUSH, ERASER, BUCKET } from '../models/tools';
import { SHOW_GRID, NO_GRID } from '../models/views';
import { createAsset } from '../utils/calls';

export function ToolBar({ updateTool, updateGridView, tool }) {
    function selectTool(selectedTool) {
        updateTool(selectedTool)
    }

    function selectView(selectedView) {
        updateGridView(selectedView)
    }

    return (
        <div>
            <h1>Currently Selected Tool: {tool}</h1>
            <p onClick={() => selectView(SHOW_GRID)}>Grid</p>
            <p onClick={() => selectView(NO_GRID)}>No Grid</p>
            <p onClick={() => selectTool(BRUSH)}>Brush</p>
            <p onClick={() => selectTool(ERASER)}>Eraser</p>
            <p onClick={() => selectTool(BUCKET)}>Bucket</p>
        </div>
    )
}