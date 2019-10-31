import { fork, put, takeEvery } from "redux-saga/effects";
import { IAction } from "../core/Action";

const SAGA_TAKEEVERY_ACTIONS: (SAGA_TAKEEVERY_ACTIONS)[] = [
  "PUT_COMMON_NUMBERBOX_CHANGE",
];
export type SAGA_TAKEEVERY_ACTIONS = "PUT_COMMON_NUMBERBOX_CHANGE";
export default function* rootSaga() {
  yield takeEvery(SAGA_TAKEEVERY_ACTIONS, takeEverySaga);
}

function* takeEverySaga(action: IAction) {
  switch (action.type) {
    case "PUT_COMMON_NUMBERBOX_CHANGE":
      yield fork(PUT_COMMON_NUMBERBOX_CHANGE, action);
      break;
    default:
      break;
  }
}

function* PUT_COMMON_NUMBERBOX_CHANGE(action: IAction) {
  yield put<IAction>({
    ...action,
    type: "COMMON_NUMBERBOX_CHANGE"
  });
}
