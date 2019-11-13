import { List, Record } from "immutable";

export type IEventInfo = {
    log: List<string>;
}
export const EventInfo = Record<IEventInfo>(
    {
        log: List()
    });