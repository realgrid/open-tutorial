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

    print = () => {
        const container = printPreview.contentWindow.document.getElementById("realreport");
        container.innerHTML = this.viewer.getHtml();
        printPreview.contentWindow.print();
    }

    render() {
        return (
            <div>
                <div style={{ height: '32px', position: 'fixed' }}>
                    <button onClick={ this.print }>print</button>
                </div>
                <div style={{ height: '32px '}}></div>

                <div id="realreport" className="scroller"></div>

                <iframe id="printPreview"src="/print.html" style={{ display: 'none' }}></iframe>
            </div>
        );
    }
}

export default Preview;