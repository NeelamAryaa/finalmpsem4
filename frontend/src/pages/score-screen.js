import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Wrong", "Correct", "Unattempt"],
  datasets: [
    {
      label: "# of Votes",
      data: [40, 40, 40],
      backgroundColor: [
        "rgba(247, 0, 0, 0.6)",
        "rgba(26, 165, 46, 0.6)",
        "rgba(247, 229, 0, 0.6)",
      ],
      borderColor: [
        "rgba(247, 0, 0, 1)",
        "rgba(26, 165, 46, 1)",
        "rgba(247, 229, 0, 1)",
      ],
      borderWidth: 1.5,
      cutout: 100,
    },
  ],
};

const ScoreScreen = () => {
  return (
    <>
      <nav
        className="navbar navbar-dark flex-nowrap"
        style={{ backgroundColor: "#29385c" }}
      >
        <div className="container-fluid">
          <div className="d-flex">
            <a className="navbar-brand" href="/">
              Your Score
            </a>
          </div>
        </div>
        <div className="container-fluid justify-content-end">
          <button type="button" class="btn btn-info text-white ">
            <i className="fa fa-file pe-2"></i>
            Answer Key
          </button>
        </div>
      </nav>
      <div className="d-flex flex-column w-50 text-center border mt-4 mx-auto shadow ">
        <h2 className="border-bottom py-2">Overview</h2>
        <div className="pb-4">
          <Doughnut
            data={data}
            height={300}
            width={300}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
      <div className="row m-5">
        <div className="col mb-4">
          <div className="border-3 border-start border-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 ">
                    Score
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <span>3.00</span>/<span className="ng-binding">480</span>
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fa fa-clipboard text-gray-300"
                    style={{ color: "#cfd1d3", fontSize: "24px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="border-3 border-start border-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1 ">
                    Accuracy
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        <span>50.00</span>%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fa fa-bullseye text-gray-300"
                    style={{ color: "#cfd1d3", fontSize: "24px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="border-3 border-start border-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1 ">
                    Rank (AIR)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <span>841</span>
                    <span>/980</span>
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fa fa-list-ol text-gray-300"
                    style={{ color: "#cfd1d3", fontSize: "24px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="border-3 border-start border-danger shadow h-100 py-2">
            <div className="card-body ">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1 ">
                    Percentage
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <span>0.63</span>%
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fa fa-percent"
                    style={{ color: "#cfd1d3", fontSize: "24px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card m-5 shadow">
        <div className="card-header">Attempted Efficiency</div>
        <div className="card-body">
          <div class="row">
            <div class="col mb-4 px-4">
              <div class="card h-100 py-2 border-0">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-info font-weight-light text-uppercase mb-1">
                        Attempted
                      </div>
                      <div class="h5 mb-0 font-weight-lightbold text-gray-700">
                        <span>2</span> <span>of</span> <span>120</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="text-info">
                        <span class="fa-stack fa-2x">
                          <i
                            class="fa fa-circle fa-stack-2x"
                            style={{ opacity: "0.2" }}
                          ></i>

                          <i class="fa fa-pencil fa-stack-1x "></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-4 px-4">
              <div class="card h-100 py-2 border-0">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-success font-weight-light text-uppercase mb-1 ">
                        Correct
                      </div>

                      <div class="h5 mb-0 font-weight-lightbold text-gray-700">
                        <span>1</span> <span>of</span> <span>120</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="text-success">
                        <span class="fa-stack fa-2x">
                          <i
                            class="fa fa-circle fa-stack-2x"
                            style={{ opacity: "0.2" }}
                          ></i>
                          <i class="fa fa-check fa-stack-1x "></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-4 px-4">
              <div class="card h-100 py-2 border-0">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-danger font-weight-light text-uppercase mb-1 ">
                        Incorrect
                      </div>
                      <div class="h5 mb-0 font-weight-lightbold text-gray-700">
                        <span>1</span> <span>of</span> <span>120</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="text-danger">
                        <span class="fa-stack fa-2x">
                          <i
                            class="fa fa-circle fa-stack-2x"
                            style={{ opacity: "0.2" }}
                          ></i>
                          <i class="fa fa-times fa-stack-1x"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-4 px-4">
              <div class="card h-100 py-2 border-0">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-warning font-weight-light text-uppercase mb-1 ">
                        Time/Ques
                      </div>
                      <div class="h5 mb-0 font-weight-lightbold text-gray-700">
                        <span>0 Min 18 Sec</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="text-warning">
                        <span class="fa-stack fa-2x">
                          <i
                            class="fa fa-circle fa-stack-2x"
                            style={{ opacity: "0.2" }}
                          ></i>
                          <i class="fa fa-hourglass-half fa-stack-1x"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            Your detailed section performance is shown below
          </div>
          <div class="col-xs-12">
            <table class="table table-bordered table-grid section-table customScrollBar">
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Attempted</th>
                  <th scope="col">Correct</th>
                  <th scope="col">Accuracy</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Mathematics</th>

                  <td>
                    <div></div>
                    <div>
                      <span>2</span>
                      <span> / </span>
                      <span>50</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <span>1</span>
                      <span> / </span>
                      <span>50</span>
                    </div>
                  </td>

                  <td>
                    <div
                      ng-bind="nu_ex(((x[5]*100)/x[4])).toFixed(2)+'%'"
                      class="ng-binding"
                    >
                      50.00%
                    </div>
                  </td>

                  <td ng-bind="convertHMS(x[8])" class="ng-binding">
                    00:37
                  </td>
                </tr>
                <tr ng-repeat="x in report_data.scorecard" class="ng-scope">
                  <th scope="row" ng-bind="x[0]" class="ng-binding">
                    Analytical Ability and Logical Reasoning
                  </th>

                  <td>
                    <div>
                      <span>0</span>
                      <span> / </span>
                      <span ng-bind="x[3]" class="ng-binding">
                        40
                      </span>
                    </div>
                  </td>

                  <td>
                    <div></div>
                    <div>
                      <span>0</span>
                      <span> / </span>
                      <span>40</span>
                    </div>
                  </td>

                  <td>
                    <div>0.00%</div>
                  </td>

                  <td>00:00</td>
                </tr>
                <tr>
                  {" "}
                  <th scope="row">Computer Awareness</th>
                  <td>
                    <div>
                      <span>0</span>
                      <span> / </span>
                      <span>10</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span ng-bind="x[5]" class="ng-binding">
                        0
                      </span>
                      <span> / </span>
                      <span>10</span>
                    </div>
                  </td>
                  <td>
                    <div>0.00%</div>
                  </td>
                  <td>00:00</td>
                </tr>
                <tr>
                  {" "}
                  <th scope="row"> General English</th>
                  <td>
                    <div>
                      <span>0</span>
                      <span> / </span>
                      <span>20</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span> 0</span>
                      <span> / </span>
                      <span> 20</span>
                    </div>
                  </td>
                  <td>
                    <div>0.00%</div>
                  </td>
                  <td> 00:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreScreen;
