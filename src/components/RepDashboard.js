import React, { Component } from "react";
import Header from "./Header";
import CanvasJSReact from "../canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class RepDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesmth: [],
      slspiechart: []
    };
  }

  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };

  componentDidMount() {
    const sls_id = this.getUserId();
    Promise.all([
      fetch("http://localhost:4000/salesmthsls"),
      fetch(`http://localhost:4000/slspiechart?sls_id=${sls_id}`)
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          salesmth: data1.data,
          slspiechart: data2.data
        })
      );
  }

  render() {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const preYear = currentTime.getFullYear() - 1;
    const userID = this.getUserId();

    const curYearSalesMthBySls = this.state.salesmth.filter(function(obj) {
      return obj.Salesperson === userID && obj.Year === year;
    });

    const preYearSalesMthBySls = this.state.salesmth.filter(function(obj) {
      return obj.Salesperson === userID && obj.Year === preYear;
    });
    const mthArr = [
      {
        Month: 1,
        MonthName: "Jan",
        Sales: 0
      },
      {
        Month: 2,
        MonthName: "Feb",
        Sales: 0
      },
      {
        Month: 3,
        MonthName: "Mar",
        Sales: 0
      },
      {
        Month: 4,
        MonthName: "Apr",
        Sales: 0
      },
      {
        Month: 5,
        MonthName: "May",
        Sales: 0
      },
      {
        Month: 6,
        MonthName: "Jun",
        Sales: 0
      },
      {
        Month: 7,
        MonthName: "Jul",
        Sales: 0
      },
      {
        Month: 8,
        MonthName: "Aug",
        Sales: 0
      },
      {
        Month: 9,
        MonthName: "Sep",
        Sales: 0
      },
      {
        Month: 10,
        MonthName: "Oct",
        Sales: 0
      },
      {
        Month: 11,
        MonthName: "Nov",
        Sales: 0
      },
      {
        Month: 12,
        MonthName: "Dec",
        Sales: 0
      }
    ];

    const finalCurYearSalesMthBySls = mthArr.map(({ Month, MonthName }) => {
      const foundMth = curYearSalesMthBySls.find(e => e.Month === Month);
      return {
        label: MonthName,
        y: foundMth ? foundMth.Sales : 0
      };
    });
    const finalPreYearSalesMthBySls = mthArr.map(({ Month, MonthName }) => {
      const foundMth = preYearSalesMthBySls.find(e => e.Month === Month);
      return {
        label: MonthName,
        y: foundMth ? foundMth.Sales : 0
      };
    });
    const options = {
      title: {
        text: "Monthly Sales from all Customers"
      },
      axisY: {
        gridThickness: 0,
        title: "Sales in $"
      },
      axisX: {
        title: "Months"
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "column",
          name: "Current Year",
          showInLegend: true,
          dataPoints: finalCurYearSalesMthBySls,
          color: "skyblue"
        },
        {
          type: "column",
          name: "Previous Year",
          showInLegend: true,
          dataPoints: finalPreYearSalesMthBySls,
          color: "orange"
        }
      ]
    };

    const slsPieChartUnits = this.state.slspiechart.map(({ Units }) => {
      return {
        Units
      };
    });

    const slsPieChartData = this.state.slspiechart.map(
      ({ MainCategoryCode, Units }) => {
        const unSum = slsPieChartUnits.reduce((ac, { Units }) => ac + Units, 0);
        return {
          category: MainCategoryCode,
          y: ((Units / unSum) * 100).toFixed(2)
        };
      }
    );

    const options2 = {
      animationEnabled: true,
      title: {
        text: "Sales by Item Category, in Percentage"
      },
      data: [
        {
          type: "doughnut",
          showInLegend: false,
          indexLabel: "{category}: {y}",
          yValueFormatString: "#,##'%'",
          dataPoints: slsPieChartData
        }
      ]
    };

    return (
      <div>
        <Header />
        <div style={{ margin: "2%" }}>
          <CanvasJSChart
            options={options}

            /* onRef={ref => this.chart = ref} */
          />
        </div>
        <div style={{ margin: "2%" }}>
          <CanvasJSChart
            options={options2}

            /* onRef={ref => this.chart = ref} */
          />
        </div>

        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

function toggleDataSeries(e) {
  if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  e.chart.render();
}

export default RepDashboard;
