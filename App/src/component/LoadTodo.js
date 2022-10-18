import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Axios from "axios";

class AddTodo extends Component {
  state = {
    content: "",
    date: "",
    due: null,
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
      date: Date().toLocaleString('en-US'),
    });
  };
  
  handleTimeChange = (e) => {
    let dueDate = new Date(e).toLocaleDateString()
    this.setState({
      due: dueDate,
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    // JSON object to be sent as body of request
    const jsonObject = {
      task: this.state.content,
      currentDate: this.state.date,
      dueDate: this.state.due
    };
  
    // HTTP Client to send a POST request
    Axios({
      method: "POST",
      url: "http://localhost:8080/add/item",
      data: {jsonObject},
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data.message);
    });

    this.props.addTodo(this.state);
    this.setState({
      content: "",
      date: "",
      due: null,
    });
  };
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="new-item-input"
            label="Add New Item"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.content}
          /> 
           <LocalizationProvider dateAdapter={AdapterDateFns}>
           <DesktopDatePicker
              id="new-item-date"
              label="Due Date"
              value={this.state.due}
              onChange={this.handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
           </LocalizationProvider>
          <Button
            id="new-item-button"
            name='submit'
            style={{ marginLeft: "10px",marginTop:10 }}
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
