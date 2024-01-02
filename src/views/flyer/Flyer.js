
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import { cibCcVisa } from '@coreui/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import {

    Font,
    Image,
} from "@react-pdf/renderer";
export default function Billing() {





    const [col, setCol] = useState([]);
    const [row, setRow] = useState([]);
    const [table, setTable] = useState([]);
    const [showDocument, setShowDocument] = useState([]);
    const image = require('../../assets/images/5903.a.jpg');
    const logo = require('../../assets/images/logo.png');
    const eachbanner = require('../../assets/images/eachbanner.png');
    const circle = require('../../assets/images/yellow-circle.png');
    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });

        // Adding the fonts.
        // doc.setFont('Inter-Regular', 'normal');

        // doc.html(reportTemplateRef.current, {
        //   async callback(doc) {
        //     await doc.save('document');
        //   },
        // });



        html2canvas(document.querySelector("#textcanves"), { scale: 2, scrollY: -window.scrollY }).then(canvas => {


            var imgData = canvas.toDataURL('image/png');
            var imgWidth = 300;
            var pageHeight = 212;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF('l', 'mm');
            var position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;


            window.scrollTo(0, 0)

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save('file.pdf');
        });

    };


    const fileHandler = (event) => {

        let fileObj = event.target.files[0];

        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {

                setCol(resp.cols);
                setRow(resp.rows);
            }
        });
    }

    const MyDocument = () => {

        let image = require('../../assets/images/5903.a.jpg')

        return (
            <div id='textcanves'>

                {row.map(function (obj, index) {
                    if (index != 0) {
                        let image = require('../../assets/images/5903.a.jpg')

                        return (

                            <div className="template-box mb-3" key={index}>
                                {/* <div className=''> */}
                                <div className='template-lable-bg1'>
                                    <div className='row'>
                                        <div className="row">
                                            <div className="col-md-2"> <img className='template-logo' src={logo} /></div>
                                            <div className="col-md-5 p-0">
                                                <div className='template-text-heading'>POLSKIE SUPERMARKETY</div>
                                                <div className='template-text-sub-heading'>MIESZKO</div>
                                            </div>
                                            <div className="col-md-5 p-0">

                                                <div className="template-promo-period">Promotional Period</div>
                                                <div className="template-promo-period-date">18.12.2023 to 24.12.2023</div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 template-product-image-height">  <img className='template-product-image' src={image} /></div>
                                            <div className="col-md-6">
                                                <span className="template-Price-pound">£</span><span className="template-Price">{obj[3]}</span>
                                                <img className='template-each-circle' src={circle} />
                                                <div className="centered">Kg</div>
                                                {/* <img className='template-each-banner' src={eachbanner} /> */}


                                            </div>

                                        </div>
                                        <div>

                                        </div>

                                        <div className="row"></div>
                                        <div className='col-5'>

                                        </div>
                                        <div className='col-7'>
                                           
                                            <div className='item-name'>CIASTO FRANCUSKIE XXL SWIEZE 375G HENGLEIN</div>
                                            <div className='item-brand'>Kg/SIERPC</div>
                                        </div>

                                    </div>

                                    {/* <div className="container-box">
                                                            </div> */}
                                </div>
                            </div>
                        );
                    }


                })}


            </div>
        )
    };








    return (
        <>





            {/* <div id='textcanves2' className="template-box" >
        
                <div className='template-lable-bg1'>
                    <div className='row'>
                        <div className="row">
                            <div className="col-md-2"> <img className='template-logo' src={logo} /></div>
                            <div className="col-md-5 p-0">
                                <div className='template-text-heading'>POLSKIE SUPERMARKETY</div>
                                <div className='template-text-sub-heading'>MIESZKO</div>
                            </div>
                            <div className="col-md-5 p-0">

                                <div className="template-promo-period">Promotional Period</div>
                                <div className="template-promo-period-date">18.12.2023 to 24.12.2023</div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6 template-product-image-height">  <img className='template-product-image' src={image} /></div>
                            <div className="col-md-6">
                                <span className="template-Price-pound">£</span><span className="template-Price">1.99</span>
                                <img className='template-each-circle' src={circle} />
                                <div className="centered">Kg</div>
                             

                            </div>

                        </div>

                
                    </div>

                   
                </div>
            </div> */}
            <button className="button" onClick={handleGeneratePdf}>
                Generate PDF
            </button>

            <input type="file" onChange={(e) => fileHandler(e)} style={{ "padding": "10px" }} />
            <OutTable data={row} columns={col} tableClassName="ExcelTable2007" tableHeaderRowclassName="heading" />
            <MyDocument></MyDocument>
        </>
    )
}

