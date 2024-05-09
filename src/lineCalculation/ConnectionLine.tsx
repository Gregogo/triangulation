import React from "react";

type Coordinates = {
    x: number,
    y: number,
}

type ConnectionLineProps = {
    dot1: Coordinates,
    dot2: Coordinates,
    color: string,
}

function findLongestLine(dot1: Coordinates, dot2: Coordinates) {
    return Math.sqrt(
        (dot1.x - dot2.x) * (dot1.x - dot2.x) + (dot1.y - dot2.y) * (dot1.y - dot2.y)
    )
}
function findAngle(dot1: Coordinates, dot2: Coordinates) {
    const dy = dot1.y - dot2.y
    const dx = dot1.x - dot2.x
    return Math.atan(dy / dx) * 180 / Math.PI
}

function neededCoordinate(dot1: Coordinates, dot2: Coordinates): Coordinates {
    const dy = dot1.y - dot2.y
    const dx = dot1.x - dot2.x
    const longestLine = findLongestLine(dot1, dot2)
    const sin = (dy / longestLine)
    const cos = (dx / longestLine)
    const y = dot1.y - sin * longestLine / 2
    const x = dot1.x - cos * longestLine / 2 - longestLine / 2
    return {
        x,
        y,
    }
}
function ConnectionLine({dot1, dot2, color}: ConnectionLineProps) {
    const length = findLongestLine(dot1, dot2)
    const middleCoordinate = neededCoordinate(dot1, dot2)
    const angle = findAngle(dot1, dot2)
    const style: React.CSSProperties = {
        position: 'absolute',
        top: middleCoordinate.y + 'px',
        left: middleCoordinate.x + 'px',
        background: color,
        height: '1.5px',
        borderRadius: '9999px',
        width: length + 'px',
        transform: 'rotate(' + angle + 'deg)',
        borderStyle: 'solid',
        borderWidth: '0px',
        borderColor: color,
    };
    return (
        <div style={style}>
        </div>
    );
}

export {
    ConnectionLine,
};
export type {
    Coordinates,
};
