import { makeStyles } from "@material-ui/core";
export const useDisplay = makeStyles({
    block: { display: "block" },
    contents: { display: "contents" },
    flex: { display: "flex" },
    flow: { display: "flow" },
    flowRoot: { display: "flow-root" },
    grid: { display: "grid" },
    inherit: { display: "inherit" },
    initial: { display: "initial" },
    inline: { display: "inline" },
    inlineBlock: { display: "inline-block" },
    inlineFlex: { display: "inline-flex" },
    inlineGrid: { display: "inline-grid" },
    inlineListItem: { display: "inline-list-item" },
    inlineTable: { display: "inline-table" },
    listItem: { display: "list-item" },
    mozInitial: { display: "-moz-initial" },
    msFlexbox: { display: "-ms-flexbox" },
    msGrid: { display: "-ms-grid" },
    msInlineFlexbox: { display: "-ms-inline-flexbox" },
    msInlineGrid: { display: "-ms-inline-grid" },
    none: { display: "none" },
    revert: { display: "revert" },
    ruby: { display: "ruby" },
    rubyBase: { display: "ruby-base" },
    rubyBaseContainer: { display: "ruby-base-container" },
    rubyText: { display: "ruby-text" },
    rubyTextContainer: { display: "ruby-text-container" },
    runIn: { display: "run-in" },
    table: { display: "table" },
    tableCaption: { display: "table-caption" },
    tableCell: { display: "table-cell" },
    tableColumn: { display: "table-column" },
    tableColumnGroup: { display: "table-column-group" },
    tableFooterGroup: { display: "table-footer-group" },
    tableHeaderGroup: { display: "table-header-group" },
    tableRow: { display: "table-row" },
    tableRowGroup: { display: "table-row-group" },
    unset: { display: "unset" },
    webkitFlex: { display: "-webkit-flex" },
    webkitInlineFlex: { display: "-webkit-inline-flex" },
});

export const useWidth = makeStyles({
    p10: {
        boxSizing: "border-box",
        width: "10%",
    },
    p100: {
        boxSizing: "border-box",
        width: "100%"
    },
    p20: {
        boxSizing: "border-box",
        width: "20%"
    },
    p30: {
        boxSizing: "border-box",
        width: "30%"
    },
    p40: {
        boxSizing: "border-box",
        width: "40%"
    },
    p50: {
        boxSizing: "border-box",
        width: "50%"
    },
    p60: {
        boxSizing: "border-box",
        width: "60%"
    },
    p70: {
        boxSizing: "border-box",
        width: "70%"
    },
    p80: {
        boxSizing: "border-box",
        width: "80%"
    },
    p90: {
        boxSizing: "border-box",
        width: "90%"
    },
});

export const useAnchor = makeStyles({
    unset: {
        color: "initial",
        textDecoration: "none",
    }
});