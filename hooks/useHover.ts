import { useState } from "react";

export function useHover() {
    
    const [hovering, setHover] = useState(false)

    return {
        hovering,
        listeners: {
            onMouseEnter: () => setHover(true),
            onMouseLeave: () => setHover(false)
        }
    }

}