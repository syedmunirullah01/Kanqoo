// LogoMarquee.jsx
import * as React from "react";
import { addPropertyControls, ControlType, motion } from "framer";

/**
 * LogoMarquee for Framer
 * Smooth, seamless horizontal scroll (like Axioma X)
 * - Built for Framer canvas
 * - Fully adjustable via property controls
 */

export default function LogoMarquee({
    items,
    speed,
    gap,
    textColor,
    background,
    fontSize,
    opacity,
    showEdgeFades,
}) {
    // 1️⃣ Duplicate the list twice for seamless loop
    const fullList = [...items, ...items];

    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: 60,
                background,
                display: "flex",
                alignItems: "center",
            }}
        >
            {/* 2️⃣ Track that moves infinitely */}
            <motion.div
                style={{
                    display: "flex",
                    gap: gap,
                    whiteSpace: "nowrap",
                }}
                animate={{
                    x: ["0%", "-50%"], // Move left continuously
                }}
                transition={{
                    ease: "linear",
                    duration: speed,
                    repeat: Infinity,
                }}
            >
                {fullList.map((text, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            color: textColor,
                            opacity,
                            fontWeight: 600,
                            fontSize,
                            whiteSpace: "nowrap",
                        }}
                    >
                        <div
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.3)",
                            }}
                        />
                        <span>{text}</span>
                    </div>
                ))}
            </motion.div>

            {/* 3️⃣ Optional fade masks for smooth edge */}
            {showEdgeFades && (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            width: "12%",
                            background:
                                "linear-gradient(to right, rgba(7,11,20,1), rgba(7,11,20,0))",
                            pointerEvents: "none",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            right: 0,
                            width: "12%",
                            background:
                                "linear-gradient(to left, rgba(7,11,20,1), rgba(7,11,20,0))",
                            pointerEvents: "none",
                        }}
                    />
                </>
            )}
        </div>
    );
}

// 4️⃣ Property Controls for Framer UI
addPropertyControls(LogoMarquee, {
    items: {
        title: "Logos",
        type: ControlType.Array,
        propertyControl: { type: ControlType.String, title: "Logo" },
        defaultValue: ["Logoipsum", "Logoipsum", "Logoipsum", "Logoipsum"],
    },
    speed: {
        title: "Speed (s)",
        type: ControlType.Number,
        defaultValue: 18,
        min: 4,
        max: 60,
        step: 1,
    },
    gap: {
        title: "Gap (px)",
        type: ControlType.Number,
        defaultValue: 100,
        min: 0,
        max: 300,
        step: 5,
    },
    fontSize: {
        title: "Font Size",
        type: ControlType.Number,
        defaultValue: 14,
        min: 10,
        max: 40,
    },
    opacity: {
        title: "Opacity",
        type: ControlType.Number,
        defaultValue: 0.8,
        min: 0.2,
        max: 1,
        step: 0.05,
    },
    textColor: {
        title: "Text Color",
        type: ControlType.Color,
        defaultValue: "#FFFFFF",
    },
    background: {
        title: "Background",
        type: ControlType.Color,
        defaultValue: "transparent",
    },
    showEdgeFades: {
        title: "Edge Fades",
        type: ControlType.Boolean,
        defaultValue: true,
    },
});
