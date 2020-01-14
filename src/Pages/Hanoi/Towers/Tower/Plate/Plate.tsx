import React from "react";

const Plate: React.FC<{ size: number }> = (props: { size: number }) => {
    return <div>{props.size}</div>;
};

export default Plate;