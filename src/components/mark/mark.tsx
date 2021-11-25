import React from 'react';

import './mark.scss';

export interface MarkProps {
  id: string;
  title: string;
  isMarked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Mark extends React.Component<MarkProps> {
  public override render(): JSX.Element {
    return (
      <div className="mark">
        <input
          className="mark__element"
          id={this.props.id}
          name={this.props.id}
          type="checkbox"
          checked={this.props.isMarked}
          aria-label={this.props.title}
          title={this.props.title}
          onChange={this.props.onChange}
        />
        <svg
          className="mark__icon"
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="m15 19-7-5-7 5V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z"
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
