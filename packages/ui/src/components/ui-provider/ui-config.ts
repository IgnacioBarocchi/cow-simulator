import { deepMerge } from "grommet/utils";
import { grommet } from "grommet";

export const fontStack = "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif;"
export const customTheme = {
    name: "pwa with siray",
    rounding: 12,
    spacing: 24,
    defaultMode: "dark",
    global: {
        colors: {
            brand: {
                dark: "#0011FA",
                light: "#6600cc",
            },
            background: {
                dark: "#111111",
                light: "#FFFFFF",
            },
            "background-back": {
                dark: "#111111",
                light: "#EEEEEE",
            },
            "background-front": {
                dark: "#222222",
                light: "#FFFFFF",
            },
            "background-contrast": {
                dark: "#FFFFFF11",
                light: "#11111111",
            },
            text: {
                dark: "#333333",
                light: "#EEEEEE",
            },
            "text-strong": {
                dark: "#000000",
                light: "#FFFFFF",
            },
            "text-weak": {
                dark: "#CCCCCC",
                light: "#444444",
            },
            "text-xweak": {
                dark: "#666666",
                light: "#999999",
            },
            border: {
                dark: "#444444",
                light: "#CCCCCC",
            },
            control: "brand",
            "active-background": "background-contrast",
            "active-text": "text-strong",
            "selected-background": {
                light: "brand",
                dark: "#00087A",
            },
            "selected-text": "text-strong",
            "status-critical": "#FF4040",
            "status-warning": "#FFAA15",
            "status-ok": "#00C781",
            "status-unknown": "#CCCCCC",
            "status-disabled": {
                light: "#CCCCCC",
                dark: "#252A7A",
            },
            "graph-0": {
                light: "brand",
                dark: "#000DC7",
            },
            "graph-1": {
                light: "status-warning",
                dark: "#252A7A",
            },
            focus: {
                dark: "#4B57FB",
            },
        },
        font: {
            family: '"Ranade-Medium"',
        },
        active: {
            background: "active-background",
            color: "active-text",
        },
        hover: {
            background: "active-background",
            color: "active-text",
        },
        selected: {
            background: "selected-background",
            color: "selected-text",
        },
        control: {
            border: {
                radius: "12px",
            },
        },
        drop: {
            border: {
                radius: "12px",
            },
        },
    },
    chart: {},
    diagram: {
        line: {},
    },
    meter: {},
    layer: {
        background: {
            dark: "#111111",
            light: "#FFFFFF",
        },
    },
    button: {
        border: {
            radius: "12px",
        },
    },
    checkBox: {
        check: {
            radius: "12px",
        },
        toggle: {
            radius: "12px",
        },
    },
    radioButton: {
        check: {
            radius: "12px",
        },
    },
    formField: {
        border: {
            color: "border",
            error: {
                color: {
                    dark: "white",
                    light: "status-critical",
                },
            },
            position: "inner",
            side: "bottom",
        },
        content: {
            pad: "small",
        },
        disabled: {
            background: {
                color: "status-disabled",
                opacity: "medium",
            },
        },
        error: {
            color: "status-critical",
            margin: {
                vertical: "xsmall",
                horizontal: "small",
            },
        },
        help: {
            color: "dark-3",
            margin: {
                start: "small",
            },
        },
        info: {
            color: "text-xweak",
            margin: {
                vertical: "xsmall",
                horizontal: "small",
            },
        },
        label: {
            margin: {
                vertical: "xsmall",
                horizontal: "small",
            },
        },
        margin: {
            bottom: "small",
        },
        round: "12px",
    },
    email: "siray.yaya@gmail.com",
    date: "2021-04-08T21:38:07.000Z",
};

export const standardTheme = deepMerge(grommet,
    {
        global: {
            animation: {
                duration: "2s",
                jiggle: {
                    duration: "0.1s"
                }
            },
            font: {
                family: fontStack,
                size: "14px",
                height: "20px",
            },
        },
    }
);
