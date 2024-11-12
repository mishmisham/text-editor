import { brackets } from './objects/brackets';
import { quotes } from './objects/quotes';
import { punctuation } from './objects/punctuation';
import { operators } from './objects/operators';

export const symbolInformaiton = {
    ...brackets,
    ...quotes,
    ...punctuation,
    ...operators,
};