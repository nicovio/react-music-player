export const getAnimationPercentaje = (currentTime, duration) => {
    return currentTime && duration ? Math.round((currentTime * 100) / duration) : 0
}