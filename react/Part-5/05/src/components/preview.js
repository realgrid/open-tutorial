import React from "react";

/* eslint-disable */

import reportForm from "../data/reportForm";
import reportData from "../data/reportData";

class Preview extends React.Component {
    componentDidMount() {
        this.viewer = new RealReport.ReportViewer("realreport", reportForm);
        this.viewer.dataSet = reportData;
        this.viewer.preview();
    }

    render() {
        return (
            <div id="realreport"></div>
        );
    }
}

export default Preview;