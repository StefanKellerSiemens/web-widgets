import React, { ReactElement, RefObject } from "react";
import Tooltip from "@rc-component/tooltip";
import { DynamicValue } from "mendix";

interface HandleTooltipProps {
    showTooltip: boolean;
    tooltipLower?: DynamicValue<string>;
    tooltipUpper?: DynamicValue<string>;
    tooltipTypeLower: "value" | "customText";
    tooltipTypeUpper: "value" | "customText";
    tooltipAlwaysVisible: boolean;
    sliderRef: RefObject<HTMLDivElement | null>;
    visible: boolean;
    value: number;
    children: React.ReactElement;
}

export function HandleTooltip(props: HandleTooltipProps): ReactElement {
    const {
        tooltipLower,
        tooltipUpper,
        showTooltip,
        tooltipTypeLower,
        tooltipTypeUpper,
        tooltipAlwaysVisible,
        sliderRef,
        visible,
        value,
        children
    } = props;

    const tooltipTypeCheck = [tooltipTypeLower === "customText", tooltipTypeUpper === "customText"];
    const tooltipValue = [tooltipLower, tooltipUpper];

    if (!showTooltip && !sliderRef.current) {
        return <></>;
    }
    const isCustomText = tooltipTypeCheck[value];

    return (
        <Tooltip
            getTooltipContainer={() => sliderRef.current!}
            prefixCls="rc-slider-tooltip"
            overlay={isCustomText ? <div>{tooltipValue[value]?.value ?? ""}</div> : value}
            trigger={["hover", "click", "focus"]}
            visible={tooltipAlwaysVisible || visible}
            placement="top"
            mouseLeaveDelay={0}
            key={value}
        >
            {children}
        </Tooltip>
    );
}
