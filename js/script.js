"use strict";

document.addEventListener("DOMContentLoaded", function() {
    function customSelect(element) {
        const selectWrapper = element;
        const listItemClass = "custom-select__list-item";
        const selectInput = selectWrapper.querySelector(".custom-select__input");
        const selectList = selectWrapper.querySelector(".custom-select__list");
        const listElementTemplate = document.createElement("li");
        const itemTextBolderClass = "custom-select__text--bolder";
        const itemActiveClass = `${listItemClass}--active`;
        const itemHoverClass = `${listItemClass}--active`;
        const inputFocusClass = 'custom-select__input--focused';
        let activeItemIndex;
        listElementTemplate.classList.add(listItemClass);

        let data = '["Arial","Roboto","Reem","Roboto Slab","Roboto Condensed","Roboto Mono"]';

        data = JSON.parse(data);

        function createList() {
            const fragment = document.createDocumentFragment();
            data.forEach(text => {
                let element = listElementTemplate.cloneNode(true);
                let substringElement = document.createElement("span");
                substringElement.textContent = text;
                element.appendChild(substringElement);
                fragment.appendChild(element);
            });
            selectList.appendChild(fragment);
        }

        function clearList() {
            while (selectList.firstChild) {
                selectList.removeChild(selectList.firstChild);
            }
        }

        function selectItem(e, item) {
            let etarget = event.target;
            if (item) {
                etarget = item;
            }
            if (etarget.closest(`.${listItemClass}`)) {
                etarget = etarget.closest(`.${listItemClass}`);
                const boldSubstrig = etarget.querySelector(`.${itemTextBolderClass}`);
                const substrig = etarget.querySelector("span:not([class]");
                let text = "";
                if (boldSubstrig) {
                    text += boldSubstrig.textContent;
                }
                selectInput.value = text + substrig.textContent;
                activeItemIndex = data.indexOf(etarget.textContent);
                removeActiveClass();
                etarget.classList.add(itemActiveClass);
                unfocusInput();
            }
        }

        function filter(e) {
            let inputValue = e.target.value.toLowerCase();
            let fragment = document.createDocumentFragment();
            let filteredData = data.slice();
            clearList();
            if (inputValue) {
                filteredData.forEach(function(item, index) {
                    let element = listElementTemplate.cloneNode(true);
                    let regExp = new RegExp(inputValue, "i");
                    let boldSubstringElement = document.createElement("span");
                    let substringElement = document.createElement("span");
                    boldSubstringElement.classList.add(itemTextBolderClass);

                    if (index === activeItemIndex) {
                        element.classList.add(itemActiveClass);
                    }

                    if (item.toLowerCase().startsWith(inputValue)) {
                        let text = item;
                        boldSubstringElement.textContent = text.match(regExp)[0];
                        substringElement.textContent = text.replace(regExp, "");
                        element.appendChild(boldSubstringElement);
                        element.appendChild(substringElement);
                        fragment.appendChild(element);
                    }

                    selectList.appendChild(fragment);
                });
            } else {
                createList();
            }
        }

        function removeActiveClass() {
            const selectItemsArr = [].slice.call(selectWrapper.querySelectorAll(`.${listItemClass}`));
            selectItemsArr.forEach(item => {
                item.classList.remove(itemActiveClass);
            });
        }

        function focusInput() {
            selectInput.classList.add(inputFocusClass);
        }

        function unfocusInput() {
            selectInput.classList.remove(inputFocusClass);
            selectInput.blur();
        }

        function closeSelectOffClick() {
            if (!event.target.closest("#custom-select-js")) {
                unfocusInput();
            }
        }

        function keyDown(e) {
            const keyCode = e.code;
            if (keyCode == "ArrowDown" || keyCode == "ArrowUp" || keyCode == "Enter") {
                let itemsArr = selectList.querySelectorAll(`.${listItemClass}`);
                let id = [].slice
                    .call(itemsArr)
                    .indexOf(selectList.querySelector(`.${itemHoverClass}`));
                switch (keyCode) {
                    case "ArrowDown": {
                        if (selectList.querySelector(`.${itemHoverClass}`)) {
                            itemsArr[id].classList.remove(itemHoverClass);
                            id++;
                            if (id >= itemsArr.length) {
                                id = 0;
                            }
                            itemsArr[id].classList.add(itemHoverClass);
                        } else {
                            itemsArr[0].classList.add(itemHoverClass);
                        }
                        break;
                    }
                    case "ArrowUp": {
                        if (selectList.querySelector(`.${itemHoverClass}`)) {
                            itemsArr[id].classList.remove(itemHoverClass);
                            id--;
                            if (id < 0) {
                                id = itemsArr.length - 1;
                            }
                            itemsArr[id].classList.add(itemHoverClass);
                        } else {
                            itemsArr[itemsArr.length - 1].classList.add(itemHoverClass);
                        }
                        break;
                    }
                    case "Enter": {
                        if (id !== -1) {
                            selectItem(e, itemsArr[id]);
                        }
                    }
                }
            }
        }

        createList();

        document.addEventListener("mousedown", closeSelectOffClick);
        selectInput.addEventListener("focus", focusInput);
        selectWrapper.addEventListener("click", selectItem);
        selectInput.addEventListener("input", filter);
        selectWrapper.addEventListener("keydown", keyDown);
    }

    customSelect(document.querySelector("#custom-select-js"));
});
