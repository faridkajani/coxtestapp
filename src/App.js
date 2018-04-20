import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [
              {slot:'9am - 10am',name:''},
              {slot:'10am - 11am',name:''},
              {slot:'11am - 12noon',name:''},
              {slot:'12noon - 1pm',name:''},
              {slot:'1pm - 2pm',name:''},
              {slot:'3pm - 4pm',name:''},
              {slot:'4pm - 5pm',name:''}
            ],
      selectedSlot:{slot:'',name:''},
      showModal:false
    };
    this.selectedSlotFn = this.selectedSlotFn.bind(this);
    this.saveModalFn = this.saveModalFn.bind(this);
    this.closeModalFn = this.closeModalFn.bind(this);
    this.newValues = this.newValues.bind(this);
  }

  selectedSlotFn(slot,name){
    this.setState({
      showModal:true,
      selectedSlot:{slot, name}
    })
  }

  saveModalFn(slot,newValue){
    this.setState({
      showModal:false,
      slots: this.newValues(slot,newValue)
    })
  }

  newValues(slot,newValue){
    let newArr = this.state.slots;
    let newArrLength = newArr.length;
    for (let i=0; i<newArrLength; i++){
      if (newArr[i].slot === slot){
        newArr[i].name = newValue
      }
    }
    return newArr;
  }

  closeModalFn(){
    this.setState({
      showModal:false
    })
  }

  render() {
    return (
      <div className="timeSlotsPage">
        <div className="container">
          <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th colspan="2" className="titleCell"><h2>Time Slots Reservation</h2></th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>Slot</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.slots.map((slots,i) => <EachRow slots={slots} selectedSlotFn={this.selectedSlotFn} key={i}/> )}
              </tbody>
          </table>
          {this.state.showModal ? <Modal selectedSlotInfo={this.state.selectedSlot} slotStatus={this.state.showModal} saveModalFn={this.saveModalFn} closeModalFn={this.closeModalFn}/> : null}
        </div>
      </div>
    );
  }
}

class EachRow extends Component {
  render() {
    return (
      <tr><td><a onClick={() => this.props.selectedSlotFn(this.props.slots.slot,this.props.slots.name)} className={this.props.slots.name !== '' ? 'boldLink' : null}>{this.props.slots.slot} </a></td><td>{this.props.slots.name}</td></tr>
    )
  }
}



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

export default App;
