import React from 'react';

import { Select, SelectProps } from '../select/select';
import './filter.scss';

export interface FilterProps
  extends Omit<
    SelectProps & { onFilterChange: NonNullable<SelectProps['onChange']> },
    'onChange'
  > {}

export class Filter extends React.Component<FilterProps> {
  public override render(): JSX.Element {
    return (
      <div className="filter">
        <label className="filter__title" htmlFor={this.props.id}>
          {this.props.title}:
        </label>
        <div className="filter__select">
          <Select
            id={this.props.id}
            value={this.props.value}
            title={this.props.title}
            options={this.props.options}
            onChange={this.props.onFilterChange}
          />
        </div>
      </div>
    );
  }
}
