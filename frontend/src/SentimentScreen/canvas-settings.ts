import CanvasJSReact from "../CanvasJsLibrary/canvasjs.react";

const toolTip = (count: number): string => {
    return count.toString() + " Tweets";
}

const percentage = (count: number, total_count: number): string => {
    let percentageOfAllTweets = count * 100 / total_count;
    return percentageOfAllTweets.toString();
}

export const CanvasSettings = (positiveCount: number, neutralCount: number, negativeCount: number) => {
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
                    toolTipContent: "{y} Tweets",
                    label: percentage(positiveCount, total_count)
                },
                {
                    name: "Neutral",
                    y: neutralCount,
                    toolTipContent: toolTip(neutralCount),
                    label: percentage(neutralCount, total_count)
                },
                {
                    name: "Negative",
                    y: negativeCount,
                    toolTipContent: toolTip(negativeCount),
                    label: percentage(negativeCount, total_count)
                }
            ]
        }]
    }
}

// configure canvasJS
const CanvasJS = CanvasJSReact.CanvasJS;
CanvasJS.addColorSet("customColorSet", ["#559E55", "#8F8F88", "#BF5250"])

// import canvasJSChart from canvasjs library
export const CanvasJSChart = CanvasJSReact.CanvasJSChart;
