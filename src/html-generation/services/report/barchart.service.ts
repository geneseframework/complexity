import { Barchart } from '../../models/barchart.model';

/**
 * Service for BarCharts
 */
export class BarchartService {

    /**
     * Merge two BarCharts
     * @param chart1
     * @param chart2
     */
    static concat(chart1: Barchart, chart2: Barchart): Barchart {
        if (!chart2) {
            return chart1;
        }
        for (const bar of chart2.data) {
            chart1 = chart1.addResult(bar.x, bar.y);
        }
        return chart1;
    }

}
