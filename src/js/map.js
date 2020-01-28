"use strict";

//  по умолчанию
var arrayCord = [];
var offsetCordX = 3;
var zoom = 6; //  конец

$(document).ready(function() {
  // eventYandexMapTour();
  scollTourCart();
});
// yandex-maps

function eventYandexMapTour() {
  if ($(".tour").length > 0) {
    createCordData();
  }
  if ($("#mapTour").length > 0) {
    var init = function init() {
      var centerDesktop = createCenterMaps(offsetCordX);
      var myMap = new ymaps.Map("mapTour", {
        center: centerDesktop,
        zoom: createZoom(zoom),
        controls: []
      });

      // Создание метки с круглой активной областью.
      arrayCord.forEach(function(element, index) {
        var circleLayout = ymaps.templateLayoutFactory.createClass(
          '<div class="placemark-layout__container"  data-placemark="' +
            (index + 1) +
            '"><div class="circle__layout">' +
            (index + 1) +
            "</div></div>"
        );
        var circlePlacemark = new ymaps.Placemark(
          element,
          {},
          {
            iconLayout: circleLayout,
            // Описываем фигуру активной области "Круг".
            iconShape: {
              type: "Circle",
              // Круг описывается в виде центра и радиуса
              coordinates: [0, 0],
              radius: 25
            }
          }
        );

        circlePlacemark.events.add(["click"], function(e) {
          var clustererPlacemark = e.get("target");
          var overlay = clustererPlacemark.getOverlaySync();
          var layout = overlay.getLayoutSync();
          var element = layout.getParentElement();
          var dataPlacemark = $(element)
            .find(".placemark-layout__container")
            .data("placemark");
          var cardTour = $('[data-tour="' + dataPlacemark + '"]');
          if (cardTour.length > 0) {
            var scrollTour = cardTour.offset().top - 60;
            $("html, body").animate({ scrollTop: scrollTour }, 600);
          }
        });

        circlePlacemark.events.add(["mouseenter"], function(e) {
          var clustererPlacemark = e.get("target");
          var overlay = clustererPlacemark.getOverlaySync();
          var layout = overlay.getLayoutSync();
          var element = layout.getParentElement();
          $(element)
            .find(".placemark-layout__container")
            .addClass("hover");
        });

        circlePlacemark.events.add(["mouseleave"], function(e) {
          var clustererPlacemark = e.get("target");
          var overlay = clustererPlacemark.getOverlaySync();
          var layout = overlay.getLayoutSync();
          var element = layout.getParentElement();
          $(element)
            .find(".placemark-layout__container")
            .removeClass("hover");
        });

        myMap.geoObjects.add(circlePlacemark);
      });

      var myPolyline = new ymaps.Polyline(
        arrayCord,
        {},
        {
          draggable: false,
          strokeColor: "#ac9a6b",
          strokeWidth: 5,
          // Первой цифрой задаем длину штриха.
          // Второй — длину разрыва.
          strokeStyle: "2 2"
        }
      );

      myMap.geoObjects.add(myPolyline);
      var centerMobile = centerMapMobile();

      $(window).on("load resize", function () {
        if($(window).width() <= 768) {
          console.log(centerMobile);
          myMap.setCenter(centerMobile);
          myMap.setZoom(createZoom(zoom) - 1);
        } else {
          myMap.setCenter(centerDesktop);
          myMap.setZoom(createZoom(zoom));
          
        }
      });
    };

    ymaps.ready(init);
  }
}

function scollTourCart() {
  $(window).on("scroll load resize", function() {
    var container = $(".tour");
    var containerOffsetTop = container.offset().top;
    var arrayTour = $(".tour__city");
    var windowScroll = $(this);
    if (windowScroll.scrollTop() > containerOffsetTop) {
      var newArr = arrayTour.map(function(index, currentValue) {
        var elementOffsetTop = $(currentValue).offset().top;
        var elementNextOffsetTop;
        var nextIndex = index + 1;
        if (nextIndex === arrayTour.length) {
          elementNextOffsetTop = $("body").innerHeight();
        } else {
          elementNextOffsetTop = $(arrayTour[nextIndex]).offset().top + 50;
          //   console.log(elementNextOffsetTop);
        }
        if (
          windowScroll.scrollTop() > elementOffsetTop + 50 &&
          windowScroll.scrollTop() < elementNextOffsetTop
        ) {
          var dataTour = $(currentValue).data("tour");
          var placemarkElement = $('[data-placemark="' + dataTour + '"]');
          if (!placemarkElement.hasClass("active")) {
            $(".placemark-layout__container").removeClass("active");
            placemarkElement.addClass("active");
            return placemarkElement;
          }
        }
      });
    }
  });
}

function createCordData() {
  var tour = $(".tour");
  var arrTour = $(".tour__city");

  zoom = tour.data("zoom");
  offsetCordX = tour.data("offset-x");

  $.each(arrTour, function(index, element) {
    var cord = $(element)
      .data("cord")
      .replace(/\s/g, "")
      .split(",");
    arrayCord.push(cord);
  });
}

function maxXCord(arrayCord) {
  var arrXCord = [];

  for (var i = 0; i < arrayCord.length; i++) {
    var cordX = filterFloat(arrayCord[i][1]);
    arrXCord.push(cordX);
  }

  return getMaxOfArray(arrXCord);
}

function filterFloat(value) {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value);
  }

  return NaN;
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function centerYCord(arrayCord) {
  var arrYCord = [];

  for (var i = 0; i < arrayCord.length; i++) {
    var cordY = filterFloat(arrayCord[i][0]);
    arrYCord.push(cordY);
  }

  return average(arrYCord);
}
function centerXCord(arrayCord) {
  var arrXCord = [];

  for (var i = 0; i < arrayCord.length; i++) {
    var cordX = filterFloat(arrayCord[i][1]);
    arrXCord.push(cordX);
  }

  return average(arrXCord);
}

function average(nums) {
  return (
    nums.reduce(function(a, b) {
      return a + b;
    }) / nums.length
  );
}

function createCenterMaps(offsetCordX) {
  var centerMap = [];

  if (offsetCordX === NaN || offsetCordX === undefined || offsetCordX == "") {
    offsetCordX = 3;
  }

  centerMap.push(centerYCord(arrayCord));
  centerMap.push(maxXCord(arrayCord) + offsetCordX);
  return centerMap;
}

function createZoom(zoom) {
  if (zoom === NaN || zoom === undefined || zoom == "") {
    return 6;
  }

  return zoom;
}

function mapCor() {
  if($(window).width() < 767){
  }
}

function centerMapMobile (){
  var centerMap = [];

  centerMap.push(centerYCord(arrayCord));
  centerMap.push(centerXCord(arrayCord));
  return centerMap;
}