const data = [
  {
    indicator: "Выручка, руб",
    class: "",
    currentDay: 500521,
    yesterday: 480521,
    thisWeekDay: 4805121,
  },
  {
    indicator: "Наличные",
    class: "revenue",
    currentDay: 300000,
    yesterday: 300000,
    thisWeekDay: 300000,
  },
  {
    indicator: "Безналичный расчет",
    class: "revenue",
    currentDay: 100000,
    yesterday: 100000,
    thisWeekDay: 100000,
  },
  {
    indicator: "Кредитные карты",
    class: "revenue",
    currentDay: 100521,
    yesterday: 100521,
    thisWeekDay: 100521,
  },
  {
    indicator: "Средний чек, руб",
    class: "",
    currentDay: 1300,
    yesterday: 900,
    thisWeekDay: 900,
  },
  {
    indicator: "Средний гость, руб",
    class: "",
    currentDay: 1200,
    yesterday: 800,
    thisWeekDay: 800,
  },
  {
    indicator: "Удаления из чека (после оплаты), руб",
    class: "",
    currentDay: 1000,
    yesterday: 1100,
    thisWeekDay: 900,
  },
  {
    indicator: "Удаления из чека (до оплаты), руб",
    class: "",
    currentDay: 1300,
    yesterday: 1300,
    thisWeekDay: 900,
  },
  {
    indicator: "Количество чеков",
    class: "",
    currentDay: 34,
    yesterday: 36,
    thisWeekDay: 32,
  },
  {
    indicator: "Количество гостей",
    class: "",
    currentDay: 34,
    yesterday: 36,
    thisWeekDay: 32,
  },
];

const container = document.querySelector(".grid-inner");

data.forEach((item, index) => {
  const percentage = Math.floor((item.yesterday / item.currentDay) * 100);
  const result = parseInt(100 - percentage);

  let classListYesterday;
  if (result > 0) {
    classListYesterday = "green";
  }
  if (result < 0) {
    classListYesterday = "red";
  }

  let classThisWeekDay;

  if (item.thisWeekDay < item.currentDay) {
    classThisWeekDay = "green";
  }
  if (item.thisWeekDay > item.currentDay) {
    classThisWeekDay = "red";
  }

  container.innerHTML += `
    <div class="grid-row" data-index="${index}">
      <div class="grid-item indicator-column ${item.class}">${item.indicator}</div>
      <div class="grid-item currentDay-column">${item.currentDay}</div>
      <div class="grid-item yesterday-column ${classListYesterday}">${item.yesterday} <span>${result}%</span></div>
      <div class="grid-item thisWeekDay-column ${classThisWeekDay}">${item.thisWeekDay}</div>
    </div>
  `;
});

document.querySelectorAll(".grid-row").forEach((row) => {
  row.addEventListener("click", function () {
    const index = this.getAttribute("data-index");
    const item = data[index];

    const existingChartContainer =
      this.nextElementSibling?.classList.contains("chart-container");
    if (existingChartContainer) {
      this.nextElementSibling.remove();
      return;
    }

    document.querySelectorAll(".chart-container").forEach((chart) => {
      chart.remove();
    });

    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container");
    chartContainer.innerHTML = `<figure class="highcharts-figure">
            <div id="container-${index}"></div>
          </figure>`;

    this.insertAdjacentElement("afterend", chartContainer);

    Highcharts.chart(`container-${index}`, {
      chart: {
        type: "line",
      },
      title: {
        text: `${item.indicator} - ${new Date().toLocaleDateString()}`,
      },
      xAxis: {
        categories: ["Этот день недели", "Вчера", "Текущий день"],
      },
      yAxis: {
        title: {
          text: item.indicator,
        },
      },
      series: [
        {
          name: item.indicator,
          data: [item.thisWeekDay, item.yesterday, item.currentDay],
        },
      ],
    });
  });
});
