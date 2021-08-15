import { Location } from './location.model';
import { LambdaBodyChildren } from './lambda-body-children.model';

export class LambdaBody {
    name ?= '';
    children?: LambdaBodyChildren = new LambdaBodyChildren();
    location?: Location = new Location();
}
