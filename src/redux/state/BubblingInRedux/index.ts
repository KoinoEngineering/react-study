import { Record, RecordOf } from "immutable";
import { IEventInfo, EventInfo } from "./EventInfo";

export interface IBubblingInRedux {
    event: RecordOf<IEventInfo>;
}

export const BubblingInRedux = Record<IBubblingInRedux>({
    event: new EventInfo()
});