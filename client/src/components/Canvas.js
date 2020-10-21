import React, { useEffect, useRef, useState } from "react";
import { SliderPicker } from 'react-color';
import { CreateAsset } from './CreateAsset'
import { ERASER, BRUSH, BUCKET } from '../models/tools'
import "./styles/Canvas.css"

export function Canvas({ width, height, tool, view, contract }) {
    const [mouseDown, updateMouseDown] = useState(false)
    const [selectedColor, updateSelectedColor] = useState("")

    const gridRef = OnLoad()
    const navigatorRef = useRef(null)
    const canvasRef = useRef(null)
    const delta = (width / 32)

    function OnLoad() {
        const grid = useRef(null);
        useEffect(() => {
            const canvas = grid.current
            const ctx = canvas.getContext('2d');
            drawGrid(ctx);
        }, [])
        return grid;
    }

    function drawGrid(ctx) {
        const oldWidth = ctx.canvas.width;
        const oldHeight = ctx.canvas.height;
        ctx.lineWidth = 0.1;
        ctx.beginPath();
        for (let i = 0; i * delta < oldWidth; i++) {
            ctx.moveTo((i * delta), 0);
            ctx.lineTo(i * delta, oldHeight);
        }
        for (let j = 0; j * delta < oldHeight; j++) {
            ctx.moveTo(0, j * delta);
            ctx.lineTo(oldWidth, j * delta);
        }
        ctx.closePath();
        ctx.stroke();
    }

    function normalizeCoordinates(event) {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const normalizedX = Math.round(x / delta) * delta;
        const normalizedY = Math.round(y / delta) * delta;
        return { x: normalizedX, y: normalizedY }
    }

    function drawSelector(event) {
        const navaigatorCanvas = navigatorRef.current
        const navigatorCtx = navaigatorCanvas.getContext('2d');
        navigatorCtx.clearRect(0, 0, width, height)
        navigatorCtx.globalAlpha = 0.2;
        const { x, y } = normalizeCoordinates(event)
        navigatorCtx.fillRect(x, y, delta, delta);
    }

    function drawSquare(event, ctx, color) {
        const { x, y } = normalizeCoordinates(event)
        if (tool === ERASER) {
            ctx.clearRect(x, y, delta, delta);
        } else if (tool === BRUSH) {
            ctx.fillStyle = color
            ctx.fillRect(x, y, delta, delta);
        }
    }

    function eraseBoard(ctx) {
        ctx.clearRect(0, 0, width, height);
    }

    function handleHover(event, ctx) {
        drawSelector(event)
        if (mouseDown) {
            drawSquare(event, ctx, selectedColor)
        }
    }

    function changeSelectedColor(newColor) {
        updateSelectedColor(newColor.hex)
    }

    return (
        <div className="canvas-parent">
            <p onClick={() => {
                const ctx = canvasRef.current.getContext('2d')
                eraseBoard(ctx)
            }}>Erase All</p>
            <CreateAsset contract={contract} canvas={canvasRef.current} />
            <SliderPicker color={selectedColor} onChange={changeSelectedColor} />
            <div className="canvas-container"
                onMouseDown={() => updateMouseDown(true)}
                onMouseUp={() => updateMouseDown(false)}>
                <canvas
                    onMouseMoveCapture={e => {
                        const canvas = canvasRef.current
                        const ctx = canvas.getContext('2d');
                        handleHover(e, ctx);
                    }}
                    onMouseLeave={() => {
                        const navigatorCtx = navigatorRef.current.getContext('2d')
                        eraseBoard(navigatorCtx)
                    }}
                    onClick={e => {
                        const canvas = canvasRef.current
                        const ctx = canvas.getContext('2d');
                        drawSquare(e, ctx, selectedColor);
                    }}
                    className="navigator" ref={navigatorRef} width={width} height={height} />
                <canvas className="canvas"
                    ref={canvasRef} width={width} height={height} />
                <canvas className="grid" ref={gridRef} width={width} height={height} />
            </div>
        </div>
    )

}
