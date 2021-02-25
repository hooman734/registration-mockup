import {Component} from "react";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    }
  }

  nextHandler = (wip) => {
    console.log(wip);
    this.setState(state => ({ step: state.step + 1}));
  }

  previousHandler = () => {
    this.setState(state => ({ step: Math.max(state.step - 1, 0)}));
  }

  render() {
    const { step } = this.state;
    switch (step) {
      case 0:
        return <StepOne onNext={this.nextHandler} onPrevious={this.previousHandler} />
      case 1:
        return <StepTwo onNext={this.nextHandler} onPrevious={this.previousHandler} />
      case 2:
        return <StepThree onNext={this.nextHandler} onPrevious={this.previousHandler} />
    }
  }
}
