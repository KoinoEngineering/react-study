import { Record, RecordOf } from "immutable";
import { IEventInfo, EventInfo } from "./EventInfo";

export interface IBubblingInRedux {
    event: RecordOf<IEventInfo>;
    activeElementId: Element["id"] | undefined | null;
}

export const BubblingInRedux = Record<IBubblingInRedux>({
    activeElementId: undefined,
    event: new EventInfo(),
});