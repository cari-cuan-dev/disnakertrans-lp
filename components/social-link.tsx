"use client";

import React, { useState } from "react";
import IconoirLoader from "./iconoir-loader";

interface SocialLinkProps {
    url: string | null;
    name: string;
    icon: string | null;
    color: string | null;
    className?: string;
    iconSize?: number;
}

export default function SocialLink({ url, name, icon, color, className = "", iconSize = 18 }: SocialLinkProps) {
    const [isHovered, setIsHovered] = useState(false);

    if (!url) return null;

    // Normalizing color for CSS (ensuring names like "Blue" work, or supporting hex)
    const hoverStyle = isHovered && color ? { color: color } : {};

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label={name}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={hoverStyle}
        >
            <IconoirLoader iconName={icon || name} size={iconSize} className="text-current flex-shrink-0" />
        </a>
    );
}
