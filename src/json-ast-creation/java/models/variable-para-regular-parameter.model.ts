import { VariableParaRegularParameterChildren } from './variable-para-regular-parameter-children.model';
import { Location } from './location.model';

export class VariableParaRegularParameter {
    name ?= '';
    children?: VariableParaRegularParameterChildren = new VariableParaRegularParameterChildren();
    location?: Location = new Location();
}
