import { fromJS, WithPath } from "../core/Immutable";

export interface IState {
}

export type IImState = fromJS<WithPath<IState>>
export const initialState = (): IState => {
  return {
  };
};
