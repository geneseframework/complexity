import { Location } from './location.model';
import { LambdaParametersChildren } from './lambda-parameters-children.model';

export class LambdaParameters {
    name ?= '';
    children?: LambdaParametersChildren = new LambdaParametersChildren();
    location?: Location = new Location();
}
