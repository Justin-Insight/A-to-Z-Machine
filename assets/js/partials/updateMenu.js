function updateMenu() {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll(".nav-list__link");

    for (let menu of menuItem) {
        menu.classList.remove("current");
        if (menu.href === currentLocation) {
            menu.classList.add("current");
        }
    }

}

export default updateMenu;