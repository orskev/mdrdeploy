import React, { Component } from "react";
import Header from "./Header";
import CanvasJSReact from "../canvasjs.react";
import { Button } from "react-bootstrap";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AccountDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesmth: [],
      cstpiechart: []
    };
  }

  getCustomerId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[3];
  };

  componentDidMount() {
    const cust_id = this.getCustomerId();
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const preYear = currentTime.getFullYear() - 1;
    Promise.all([
      fetch(
        `http://localhost:4000/salesmth?cust_id=${cust_id}&year=${year}&preyear=${preYear}`
      ),
      fetch(`http://localhost:4000/cstpiechart?cust_id=${cust_id}`)
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          salesmth: data1.data,
          cstpiechart: data2.data
        })
      );
  }

  render() {
    const currentTime = new Date();
    var year = currentTime.getFullYear();
    var preYear = currentTime.getFullYear() - 1;
    const curYearSalesMthByCst = this.state.salesmth.filter(function(obj) {
      return obj.Year === year;
    });
    const preYearSalesMthByCst = this.state.salesmth.filter(function(obj) {
      return obj.Year === preYear;
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

    const finalCurYearSalesMthByCst = mthArr.map(({ Month, MonthName }) => {
      const foundMth = curYearSalesMthByCst.find(e => e.Month === Month);
      return {
        label: MonthName,
        y: foundMth ? foundMth.Sales : 0
      };
    });
    const finalPreYearSalesMthByCst = mthArr.map(({ Month, MonthName }) => {
      const foundMth = preYearSalesMthByCst.find(e => e.Month === Month);
      return {
        label: MonthName,
        y: foundMth ? foundMth.Sales : 0
      };
    });

    const options = {
      title: {
        text: "Monthly Sales by Customer"
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
          dataPoints: finalCurYearSalesMthByCst,
          color: "skyblue"
        },
        {
          type: "column",
          name: "Previous Year",
          showInLegend: true,
          dataPoints: finalPreYearSalesMthByCst,
          color: "orange"
        }
      ]
    };

    const cstPieChartUnits = this.state.cstpiechart.map(({ Units }) => {
      return {
        Units
      };
    });

    const cstPieChartData = this.state.cstpiechart.map(
      ({ MainCategoryCode, Units }) => {
        const unSum = cstPieChartUnits.reduce((ac, { Units }) => ac + Units, 0);
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
          dataPoints: cstPieChartData
        }
      ]
    };

    function goBack() {
      window.history.back();
    }

    return (
      <div>
        <Header />
        <Button onClick={goBack} variant="warning" style={{ margin: "15px" }}>
          Choose a new Customer
        </Button>
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

export default AccountDashboard;
