$(document).ready(function(){

// slider1
	$('.slider1').slick({
		arrows:false,
        dots:true,
		slidesToShow:1,
		autoplay: false,
		variableWidth:false,

		// responsive: [
  //           {
  //               breakpoint: 768,
  //               settings: {
  //                   slidesToShow: 2
  //               }
  //           },
  //           {
  //               breakpoint: 480,
  //               settings: {
  //                   slidesToShow: 1
  //               }
  //           }
  //       ]

        
	});

//burgeer---------------------
$('.burger').click(function(event){
        $('.burger, .top_menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    // $('.top_menu').click(function(event){
    //     $('.burger, .top_menu').removeClass('active');
    //     $('body').removeClass('lock');
    // });

// slider2-------------------------------------------------
    $('.slider2').slick({
        arrows:true,
        dots:true,
        slidesToShow:3,
        autoplay: false,
        variableWidth:false,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

//accordion
    $('.accord_title').click(function(){
    const parent = $(this).parent();

    if (parent.hasClass('accord_item_active')){
        parent.removeClass('accord_item_active');
    } else {
        $('.accord_item').removeClass('accord_item_active')
        parent.addClass('accord_item_active')
    }
    });

});

//DA-----------------------------------------------


"use strict";

(function () {
    let originalPositions = [];
    let daElements = document.querySelectorAll('[data-da]');
    let daElementsArray = [];
    let daMatchMedia = [];
    //Заполняем массивы
    if (daElements.length > 0) {
        let number = 0;
        for (let index = 0; index < daElements.length; index++) {
            const daElement = daElements[index];
            const daMove = daElement.getAttribute('data-da');
            if (daMove != '') {
                const daArray = daMove.split(',');
                const daPlace = daArray[1] ? daArray[1].trim() : 'last';
                const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
                const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
                const daDestination = document.querySelector('.' + daArray[0].trim())
                if (daArray.length > 0 && daDestination) {
                    daElement.setAttribute('data-da-index', number);
                    //Заполняем массив первоначальных позиций
                    originalPositions[number] = {
                        "parent": daElement.parentNode,
                        "index": indexInParent(daElement)
                    };
                    //Заполняем массив элементов 
                    daElementsArray[number] = {
                        "element": daElement,
                        "destination": document.querySelector('.' + daArray[0].trim()),
                        "place": daPlace,
                        "breakpoint": daBreakpoint,
                        "type": daType
                    }
                    number++;
                }
            }
        }
        dynamicAdaptSort(daElementsArray);

        //Создаем события в точке брейкпоинта
        for (let index = 0; index < daElementsArray.length; index++) {
            const el = daElementsArray[index];
            const daBreakpoint = el.breakpoint;
            const daType = el.type;

            daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
            daMatchMedia[index].addListener(dynamicAdapt);
        }
    }
    //Основная функция
    function dynamicAdapt(e) {
        for (let index = 0; index < daElementsArray.length; index++) {
            const el = daElementsArray[index];
            const daElement = el.element;
            const daDestination = el.destination;
            const daPlace = el.place;
            const daBreakpoint = el.breakpoint;
            const daClassname = "_dynamic_adapt_" + daBreakpoint;

            if (daMatchMedia[index].matches) {
                //Перебрасываем элементы
                if (!daElement.classList.contains(daClassname)) {
                    let actualIndex = indexOfElements(daDestination)[daPlace];
                    if (daPlace === 'first') {
                        actualIndex = indexOfElements(daDestination)[0];
                    } else if (daPlace === 'last') {
                        actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
                    }
                    daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
                    daElement.classList.add(daClassname);
                }
            } else {
                //Возвращаем на место
                if (daElement.classList.contains(daClassname)) {
                    dynamicAdaptBack(daElement);
                    daElement.classList.remove(daClassname);
                }
            }
        }
        customAdapt();
    }

    //Вызов основной функции
    dynamicAdapt();

    //Функция возврата на место
    function dynamicAdaptBack(el) {
        const daIndex = el.getAttribute('data-da-index');
        const originalPlace = originalPositions[daIndex];
        const parentPlace = originalPlace['parent'];
        const indexPlace = originalPlace['index'];
        const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
        parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    }
    //Функция получения индекса внутри родителя
    function indexInParent(el) {
        var children = Array.prototype.slice.call(el.parentNode.children);
        return children.indexOf(el);
    }
    //Функция получения массива индексов элементов внутри родителя 
    function indexOfElements(parent, back) {
        const children = parent.children;
        const childrenArray = [];
        for (let i = 0; i < children.length; i++) {
            const childrenElement = children[i];
            if (back) {
                childrenArray.push(i);
            } else {
                //Исключая перенесенный элемент
                if (childrenElement.getAttribute('data-da') == null) {
                    childrenArray.push(i);
                }
            }
        }
        return childrenArray;
    }
    //Сортировка объекта
    function dynamicAdaptSort(arr) {
        arr.sort(function (a, b) {
            if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
        });
        arr.sort(function (a, b) {
            if (a.place > b.place) { return 1 } else { return -1 }
        });
    }
    //Дополнительные сценарии адаптации
    function customAdapt() {
        //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    }());

// // slider2-------------------------------------------------
//     $('.slider2').slick({
//         arrows:true,
//         dots:true,
//         slidesToShow:3,
//         autoplay: false,
//         variableWidth:false,

//         responsive: [
//             {
//                 breakpoint: 1200,
//                 settings: {
//                     slidesToShow: 2
//                 }
//             },
//             {
//                 breakpoint: 767,
//                 settings: {
//                     slidesToShow: 1
//                 }
//             }
//         ]
//     });

//tours_tabs---------------------------------------

const tours_target = document.querySelectorAll('.tours_target');
const tours_row = document.querySelectorAll('.tours_row');
tours_row[0].style.display = 'block';

function remAct() {
    tours_target.forEach( function(item) {
        if (item.classList.contains('tours_target_active')) {
            item.classList.remove('tours_target_active');
        }
    });
}

function hideToursRow() {
    tours_row.forEach(function(item) {
        if (item.style.display = 'block') {
            item.style.display = 'none';
        }
    })
}

tours_target.forEach( function(item, i) {

    item.addEventListener('click', () => {

        remAct();
        item.classList.add('tours_target_active');
        hideToursRow();
        tours_row[i].style.display = 'block';

    })
});