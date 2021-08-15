import { ChartColor } from '../enums/chart-color.enum';

/**
 * Bar of a bar chart
 */
export interface Bar {

    color?: ChartColor; // The color of the bar
    x: number;          // The abscissa of the bar
    y: number;          // The ordinate (the height) of the bar

}
