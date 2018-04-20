import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.selectedSlotInfo.name
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      inputValue: event.target.value
    })
  }

  render() {
    return (
      <div className={this.props.slotStatus ? 'myModal' : 'myModal hide'}>
        <div className="overlay"></div>
        <div className="modalWindow">
            <h3>Time Slot Assignment</h3>
            <div className="container content">
                <label>Selected Slot: </label>{this.props.selectedSlotInfo.slot} <br />
                <label>Name: </label><input type="text" defaultValue={this.props.selectedSlotInfo.name } onChange={this.handleChange}></input><br />
                <br />
                <button className="btn" onClick={() => this.props.saveModalFn(this.props.selectedSlotInfo.slot,this.state.inputValue)}>Save</button>
                &nbsp;
                <button className="btn" onClick={this.props.closeModalFn}>Cancel</button> &nbsp;
            </div>
        </div>
      </div>
    )
  }
}

export default Modal;
