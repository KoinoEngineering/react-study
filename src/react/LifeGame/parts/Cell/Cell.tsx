import { Button, colors, WithStyles, createStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";


interface IStyleProps {
    alive: boolean;
}

const styles = createStyles({
    root: {
        "&.alive": {
            backgroundColor: colors.grey[900]
        },
        backgroundColor: colors.grey[50],
        border: "1px solid",
        borderColor: colors.grey[900],
        borderRadius: 0,
        boxSizing: "border-box",
        display: "inline-block",
        height: 10,
        minWidth: 10,
        padding: 0,
        width: 10,
    },
});

export interface ICellProps extends WithStyles<typeof styles> {
    y: number;
    x: number;
    ref?: React.Ref<HTMLButtonElement>;
}

export interface ICellState {
    alive: boolean;
}

class Cell extends React.PureComponent<ICellProps, ICellState> {
    constructor(props: ICellProps) {
        super(props);
        //初期化
        this.state = { alive: false };
    }

    private Alive() {
        this.setState({ ...this.state, alive: true });
    }

    private Dead() {
        this.setState({ ...this.state, alive: false });
    }

    private HandleClickButton(alive: boolean) {
        return () => {
            this.setState({ ...this.state, alive });
        };
    }

    public UpdateGeneration(field: boolean[][]) {
        const {
            y,
        } = this.props;
        const {
            alive
        } = this.state;
        // modで-1するのが面倒なので補正用の配列を作る
        const heightDiffArray = [field.length - 1, 0, 1];
        const widthDiffArray = [field[y].length - 1, 0, 1];
        let neighborAliveCount = 0;
        for (let h = 0; h < 3; h++) {
            for (let w = 0; w < 3; w++) {
                const diffHeight = (this.props.y + heightDiffArray[h]) % field.length;
                const diffWidth = (this.props.x + widthDiffArray[w]) % field[y].length;
                if (field[diffHeight][diffWidth]) {
                    neighborAliveCount++;
                }
            }
        }

        // 状態更新
        if (alive) {
            if (neighborAliveCount <= 1) {
                // 過疎
                this.Dead();
            } else if ((neighborAliveCount === 2 || neighborAliveCount === 3)) {
                // 生存（定義に存在するので分岐を作るが維持なので何もしない）
            } else if (neighborAliveCount >= 4) {
                // 過密
                this.Dead();
            }
        } else {
            // 近傍の生が3の時だけ誕生
            if (neighborAliveCount === 3) {
                // 誕生
                this.Alive();
            }
        }
    }

    render() {
        const {
            classes,
        } = this.props;
        const {
            alive
        } = this.state;
        return <Button
            ref={this.props.ref}
            className={classNames(classes.root, { alive })}
            onClick={this.HandleClickButton(!alive)}
        />;
    }
}

export default withStyles(styles)(Cell);