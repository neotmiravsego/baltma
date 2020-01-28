$(document).ready(function() {
  createSelect();
  eventdatepicer();
});

// создание селекта формы (ДОДЕЛАТЬ НАЖАТИЕ ПРОБЕЛА)
function createSelect() {
  if ($(".select").length) {
    $(".select")
      .on("click", ".select__placeholder", function() {
        var parent = $(this).closest(".select");
        var element = this;
        var scroller = parent.find(".select__scrollbar");
        scroller.baron({
          root: ".select__scrollbar",
          scroller: ".select__body",
          bar: ".select__bar",
          scrollingCls: "_scrolling",
          draggingCls: "_dragging"
        });
        if (!parent.hasClass("is-open")) {
          parent.addClass("is-open");
          $("select.is-open")
            .not(parent)
            .removeClass("is-open");
        } else {
          parent.removeClass("is-open");
        }
      })
      .on("click", ".select__item", function() {
        var parent = $(this).closest(".select");
        var selectARr = parent.find(".select__item");
        var dataTitle = $(this).data('title');
        var tourBlockParent = parent.closest('.other-tours');
        // console.log(dataTitle.length);
        // console.log(tourBlockParent);
        // console.log($(this).data('value'));
        parent
          .removeClass("is-open")
          .find(".select__placeholder .value")
          .text($(this).text());
        parent
          .find("input[type=text].visually-hidden")
          .attr("value", $(this).data("value"));
        parent.find(".select__placeholder").addClass("active");
        selectARr.removeClass("active");
        if(tourBlockParent.length > 0 && dataTitle !== undefined) {
          changeTitleTours(dataTitle,tourBlockParent);
        }
        $(this).addClass("active");
      });

    $(document).mouseup(function(e) {
      var arr = $(".select");
      $.each(arr, function(i, val) {
        var div = $(val);
        if (!div.is(e.target) && div.has(e.target).length === 0) {
          if (div.hasClass("is-open")) {
            div.removeClass("is-open");
          }
        }
      });
    });

    function changeTitleTours (title,parent) {
      var elemTitle = $(parent).find('.other-tours__title-value');
      elemTitle.text(title);
    }
  }
}

function eventdatepicer() {
  $(".js-date-picker").daterangepicker({
    locale: {
      format: "DD.MM.YYYY",
      separator: " - ",
      applyLabel: "Подвердить",
      cancelLabel: "Отмена",
      fromLabel: "От",
      toLabel: "До",
      customRangeLabel: "Выбрать",
      weekLabel: "Н",
      daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
      ],
      firstDay: 1
    },

    // parentEl: ".pick-tours__fieldset",
    startDate: moment(),
    endDate: moment(),
    minDate: moment(),
    opens: "center",
    minYear: moment().format("YYYYY"),
    autoUpdateInput: false
  });

  $(".js-date-picker").on("apply.daterangepicker", function(ev, picker) {
    $(this).attr(
      "value",
      picker.startDate.format("DD.MM.YYYY") +
        " - " +
        picker.endDate.format("DD.MM.YYYY")
    );
    $(this).addClass('active');
  });

  $(".js-date-picker").on("cancel.daterangepicker", function(ev, picker) {
    $(this).attr("value", "");
    $(this).removeClass('active');
  });
}


