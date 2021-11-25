import React from 'react';

import './select.scss';

export interface SelectProps {
  id: string;
  value: string;
  title: string;
  options: {
    value: string;
    title: string;
  }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export class Select extends React.Component<SelectProps> {
  public override render(): JSX.Element {
    return (
      <div className="select">
        <select
          className="select__element"
          id={this.props.id}
          name={this.props.id}
          value={this.props.value}
          aria-label={this.props.title}
          onChange={this.props.onChange}
        >
          {this.props.options.map((option) => {
            return (
              <option
                className="select__option"
                value={option.value}
                key={option.value}
              >
                {option.title}
              </option>
            );
          })}
        </select>
        <svg
          className="select__icon"
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="m1 1 6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
}
