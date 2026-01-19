"use client";

import React, { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";

interface IconoirLoaderProps {
    iconName: string;
    size?: number | string;
    className?: string;
}

/**
 * Dynamic Icon Loader for Iconoir-React
 * 
 * Fetches icons from the iconoir-react library by their string name.
 * Handles name normalization to PascalCase.
 */
export default function IconoirLoader({ iconName, size = 24, className = "" }: IconoirLoaderProps) {
    const [IconComponent, setIconComponent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadIcon = async () => {
            try {
                // Dynamic import to support tree-shaking and avoid heavy initial bundle
                const iconoirModule = await import("iconoir-react");

                // Normalize name: lowercase to PascalCase (e.g., 'facebook' -> 'Facebook')
                // Iconoir icons are exported as PascalCase components.
                const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);

                // Try direct name, then formatted name
                let Icon = (iconoirModule as any)[iconName];
                if (!Icon) {
                    Icon = (iconoirModule as any)[formattedName];
                }

                if (Icon) {
                    setIconComponent(() => Icon);
                    setError(false);
                } else {
                    console.warn(`Iconoir icon "${iconName}" (formatted as "${formattedName}") not found.`);
                    setError(true);
                }
            } catch (err) {
                console.error(`Failed to load Iconoir icon "${iconName}":`, err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (iconName) {
            loadIcon();
        }
    }, [iconName]);

    if (loading) {
        return (
            <div
                className={`bg-current opacity-10 animate-pulse rounded-sm ${className}`}
                style={{ width: size, height: size }}
            />
        );
    }

    if (error || !IconComponent) {
        return <HelpCircle size={size} className={className} />;
    }

    const Icon = IconComponent;
    return <Icon width={size} height={size} className={className} />;
}
