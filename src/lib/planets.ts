export const planetsData: Record<string, any> = {
    earth: {
        name: "Earth",
        color: "#3b82f6",
        size: 6371, // km
        gravity: "9.8 m/s²",
        desc: "Our home planet.",
        texture: "/textures/earth.jpg", // dynamic
    },
    mars: {
        name: "Mars",
        color: "#ef4444",
        size: 3389,
        gravity: "3.72 m/s²",
        desc: "The Red Planet.",
    },
    jupiter: {
        name: "Jupiter",
        color: "#d97706",
        size: 69911,
        gravity: "24.79 m/s²",
        desc: "The Gas Giant.",
    },
    saturn: {
        name: "Saturn",
        color: "#fcd34d",
        size: 58232,
        gravity: "10.44 m/s²",
        desc: "Ringed beauty.",
    },
    // Add more
};

export function getPlanet(name: string) {
    return planetsData[name.toLowerCase()] || null;
}
