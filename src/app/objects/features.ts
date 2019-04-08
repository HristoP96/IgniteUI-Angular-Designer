import { DateRangeType } from 'igniteui-angular';

export interface IgxFeatureProperty {
    name: string;
    type: string;
    value: any;
}
export interface IgxComponentFeature {
    name: string;
    prop: string | IgxFeatureProperty;
    value?: boolean;
}

export const GridFeatures: any[] = [
    { name: 'Filtering', prop: 'allowFiltering', value: false },
    { name: 'Paging', prop: 'paging', value: false },
    { name: 'Hiding', prop: 'columnHiding', value: false },
    { name: 'Pinning', prop: 'columnPinning', value: false },
    { name: 'Row Editing', prop: 'rowEditable', value: false },
    { name: 'Row Select', prop: 'rowSelectable', value: false },
    { name: 'Toolbar', prop: 'showToolbar', value: false }
];
export const ComboFeatures: any[] = [
    { name: 'Filtering', prop: 'filterable', value: false },
    { name: 'Allow Custom Values', prop: 'allowCustomValues', value: false },
];

export const CalendarFeatures: IgxComponentFeature[] = [
    { name: 'Localization', prop: {name: 'locale', type: 'single', value: '' }
    , value: false,  },
    { name: 'Special Dates', prop: 'customValues', value: false },
    {name: 'Disabled Dates', prop: {name: 'disabledDates', value:
            (from: number, to: number, rangeType: number) => {
                const today = new Date(Date.now());
                 const dateRange = [new Date(today.getFullYear(), today.getMonth(), from),
                                  new Date(today.getFullYear(), today.getMonth(), to)];
                                  return [{type: rangeType, dateRange: dateRange}];
            }
    , type: 'function'} }
];
