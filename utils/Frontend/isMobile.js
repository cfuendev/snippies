window.isMobile = () => {
    if (window.screen.width <= 500 && window.screen.height <= 950) {
        return true;
    }
    return false;
};