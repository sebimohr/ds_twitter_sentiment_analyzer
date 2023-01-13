import CanvasJSReact from "../CanvasJsLibrary/canvasjs.react";

const percentage = (count: number, total_count: number): string => {
    // round percentage to the first decimal after comma
    let percentageOfAllTweets = Math.round(count * 1000 / total_count) / 10;
    return percentageOfAllTweets.toString();
}

export const ChartSettings = (positiveCount: number, neutralCount: number, negativeCount: number) => {
    const total_count = positiveCount + neutralCount + negativeCount;

    return {
        animationEnabled: true,
        willReadFrequently: true,
        colorSet: "customColorSet",
        data: [{
            type: "pie",
            // toolTipContent: "{sentiment}: {percentage}%",
            indexLabel: "{name}: {label}%",
            // indexLabelPlacement: "inside",
            startAngle: -90,
            dataPoints: [
                {
                    name: "Positive",
                    y: positiveCount,
                    toolTipContent: "Positive: {y} Tweets",
                    label: percentage(positiveCount, total_count)
                },
                {
                    name: "Neutral",
                    y: neutralCount,
                    toolTipContent: "Neutral: {y} Tweets",
                    label: percentage(neutralCount, total_count)
                },
                {
                    name: "Negative",
                    y: negativeCount,
                    toolTipContent: "Negative: {y} Tweets",
                    label: percentage(negativeCount, total_count)
                }
            ]
        }]
    }
}

// configure canvasJS
const CanvasJS = CanvasJSReact.CanvasJS;
CanvasJS.addColorSet("customColorSet", [
    "#00e676",
    "#bdbdbd",
    "#ff1744"])

// import canvasJSChart from canvasjs library
export const CanvasJSChart = CanvasJSReact.CanvasJSChart;
