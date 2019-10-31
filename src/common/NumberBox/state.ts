import { OutlinedTextFieldProps } from "@material-ui/core/TextField";
import { IStateBase } from "../../core/State";

export interface INumberBoxState {
  textField: Pick<INumberTextFieldProps, "value" | "label">
}

interface INumberTextFieldProps extends OutlinedTextFieldProps {
  value: string;
}

export type IImNumberBoxState = IStateBase<INumberBoxState>

export const initialNumberBoxState = (state?: Partial<INumberBoxState>): INumberBoxState => {
  return {
    textField: {
      value: "0"
    },
    ...state,
  };
};

export const changeNumberBox = (value: string) => {
  return (state: IImNumberBoxState): IImNumberBoxState => {
    const stdValue = (value !== "0" && value.charAt(0) === "0") ? value.substr(1) : value;
    return isNaN(Number(stdValue)) ? state : state.setIn([
      "textField", "value"
    ], value);
  };
};