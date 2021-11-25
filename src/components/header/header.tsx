import React from 'react';

import { FilterProps } from '../filter/filter';
import { Storage } from '../../helpers/storage';
import { APIEvent } from '../../api/api';
import { getUniqueValuesOfObjects } from '../../helpers/get-unique-values-of-objects';
import { fromMonthName as MonthNameToEventMonth } from '../../helpers/event-month';
import { Title } from '../title/title';
import { Filters } from '../filters/filters';
import './header.scss';

const NO_FILTERING = 'All';

export type FiltersValues = { [key: FilterProps['id']]: FilterProps['value'] };
const filtersValuesStorage = Storage.isAvailable()
  ? new Storage<FiltersValues>('filtersValues')
  : null;

export interface HeaderProps {
  events: APIEvent[];
  onFiltersChanges(filtersValues: FiltersValues): void;
}

interface HeaderState {
  filters: FilterProps[];
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  public constructor(props: HeaderProps) {
    super(props);

    const [uniqueCities = []] = getUniqueValuesOfObjects(this.props.events, [
      'city',
    ]);
    const filtersValues = filtersValuesStorage?.get() ?? {};

    this.state = {
      filters: [
        {
          id: 'city',
          title: 'City',
          options: uniqueCities.map((uniqueCity) => {
            return { value: uniqueCity, title: uniqueCity };
          }),
        },
        {
          id: 'month',
          title: 'Month',
          options: Object.keys(MonthNameToEventMonth).map((month) => {
            return {
              value: month,
              title: month,
            };
          }),
        },
        {
          id: 'favorites',
          title: 'Favorites',
          options: [
            { value: 'Marked', title: 'Marked' },
            { value: 'Unmarked', title: 'Unmarked' },
          ],
        },
      ].map((filter) => {
        return {
          ...filter,
          options: [{ value: NO_FILTERING, title: 'All' }, ...filter.options],
          value: filtersValues[filter.id] ?? NO_FILTERING,
          onFilterChange: (event) => {
            this.handleFilterChange(filter.id, event.target.value);
          },
        };
      }),
    };

    this.props.onFiltersChanges(filtersValues);
  }

  private getFiltersValues(): FiltersValues {
    const filtersValues: FiltersValues = {};

    this.state.filters.forEach((filter) => {
      if (filter.value === NO_FILTERING) {
        return;
      }

      filtersValues[filter['id']] = filter.value;
    });

    return filtersValues;
  }

  private handleFilterChange = (
    id: FilterProps['id'],
    value: FilterProps['value']
  ): void => {
    this.setState(
      (prevState) => {
        return {
          filters: prevState.filters.map((filter) => {
            return filter['id'] === id ? { ...filter, value } : filter;
          }),
        };
      },
      () => {
        const filtersValues = this.getFiltersValues();

        this.props.onFiltersChanges(filtersValues);
        filtersValuesStorage?.set(filtersValues);
      }
    );
  };

  public override render(): JSX.Element {
    return (
      <header className="header">
        <div className="header__title">
          <Title title="Event Listing" />
        </div>
        <div className="header__filters">
          <Filters filters={this.state.filters} />
        </div>
      </header>
    );
  }
}
