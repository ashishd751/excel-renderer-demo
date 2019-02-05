import React, { Component } from 'react';
import './App.css';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      dataLoaded: false,
      rows: null,
      cols: null
    }
    this.fileHandler = this.fileHandler.bind(this);
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });               

  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
        {this.state.dataLoaded && <div>
          <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
        </div>}
      </div>
    );
  }
}

export default App;
