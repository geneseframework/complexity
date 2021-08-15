import { Bar } from '../interfaces/bar.interface';
import { ComplexityType } from '../enums/complexity-type.enum';
import { ChartColor } from '../enums/chart-color.enum';
import { Options } from '../../core/models/options.model';

/**
 * Barchart of complexities
 */
export class Barchart {

    data?: Bar[] = [];                                  // The data of the chart
    cpxType?: ComplexityType;                           // The kind of complexity of the chart


    constructor(cpxType?: ComplexityType) {
        this.cpxType = cpxType;
    }


    /**
     * Increases the height of a bar with a given complexity
     * @param complexity / The x abscissa
     * @param quantity / The y value to add for the bar with x abscissa
     */
    addResult(complexity: number, quantity = 1): Barchart {
        const roundedCpx = Math.round(complexity);
        if (this.abscissaAlreadyExists(roundedCpx)) {
            this.increaseOrdinate(roundedCpx, quantity);
        } else {
            this.newBar(roundedCpx, quantity);
        }
        return this;
    }


    /**
     * Checks if a bar exists on a given abscissa
     * @param complexity / The abscissa value
     */
    private abscissaAlreadyExists(complexity: number): boolean {
        return this.data.map(p => p.x).includes(complexity);
    }


    /**
     * Increases the height of an existing bar
     * @param abscissa / The abscissa of the bar (the complexity value)
     * @param quantity / The height to add at the bar
     */
    private increaseOrdinate(abscissa: number, quantity = 1): void {
        const index = this.data.findIndex(e => e.x === abscissa);
        this.data[index].y = this.data[index].y + quantity;
    }


    /**
     * Adds a bar for a given abscissa
     * @param complexity
     * @param quantity
     */
    newBar(complexity: number, quantity = 1): void {
        this.data.push({x: complexity, y: quantity, color: this.getColor(complexity)});
    }


    /**
     * Sorts the data by abscissa value (orders the complexities by ascending sort)
     */
    sort(): Barchart {
        this.data = this.data.sort((A, B) => A.x - B.x);
        return this;
    }


    /**
     * Gets the color of a bar with a given abscissa
     * @param complexity / The abscissa of the bar
     */
    getColor(complexity: number): ChartColor {
        let color = ChartColor.WARNING;
        const cpx = `${this.cpxType}Cpx`;
        if (complexity <= Options[cpx].warningThreshold) {
            color = ChartColor.CORRECT;
        } else if (complexity > Options[cpx].errorThreshold) {
            color = ChartColor.ERROR;
        }
        return color;
    }


    /**
     * Adds bars with height = 0 when there is no method with a given complexity value which is lower than the greatest value
     * Returns the chart himself
     */
    plugChartHoles(): Barchart {
        this.sort();
        const cpxMax: number = this.data[this.data.length - 1]?.x;
        const cpxMin: number = this.cpxType === ComplexityType.COGNITIVE ? 0 : 1;
        for (let cpx = cpxMin; cpx < cpxMax; cpx++) {
            if (!this.data.find(e => e.x === cpx)) {
                this.addResult(cpx, 0);
            }
        }
        this.sort();
        return this;
    }

}

