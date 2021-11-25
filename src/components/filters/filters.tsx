import React from 'react';

import { Filter, FilterProps } from '../filter/filter';
import './filters.scss';

export interface FiltersProps {
  filters: FilterProps[];
}

export class Filters extends React.Component<FiltersProps> {
  public override render(): JSX.Element {
    return (
      <form className="filters" id="filters" name="filters">
        {this.props.filters.map((filter) => {
          return (
            <div className="filters__filter" key={filter.id}>
              <Filter {...filter} />
            </div>
          );
        })}
      </form>
    );
  }
}
