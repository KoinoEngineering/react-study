import { List, Record } from "immutable";

export interface IUnitState {
    path: List<string>;
    click: number;
    change: number;
    text: string;
    children: List<UnitState> | undefined;
}

export class UnitState extends Record<IUnitState>({
    change: 0,
    children: undefined,
    click: 0,
    path: List(),
    text: ""
}) {
    constructor(init: Partial<IUnitState>) {
        super(init);
    }

    // 子を作る
    public CreateChildren(): this {
        return this.set("children", List().push(
            new UnitState({
                path: this.path.push("children").push("0")
            })));
    }

    // 子リストの最後を複製する
    public AppendChild(): this {
        return this.children ? this.set("children", this.children.push(new UnitState({
            path: this.path.push("children").push(this.children.size.toString())
        }))) : this;
    }

    // 発生したイベントのカウントを増やす
    public IncrementEventCount(event: "click" | "change"): this {
        return this.update(event, (event: number) => {
            return event + 1;
        });
    }

    // テキストの更新
    public ChangeText(text: string): this {
        return this.set("text", text);
    }
}