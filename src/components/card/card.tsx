import React from 'react';

import { Mark, MarkProps } from '../mark/mark';
import './card.scss';

export interface CardProps {
  id: string;
  title: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  city: string;
  image: string;
  isMarked: MarkProps['isMarked'];
  onMarkChange: NonNullable<MarkProps['onChange']>;
}

export class Card extends React.Component<CardProps> {
  public override render(): JSX.Element {
    const { day, month, year } = this.props.date;

    return (
      <article
        className="card"
        id={this.props.id}
        style={{ backgroundImage: `url("${this.props.image}")` }}
      >
        <div className="card__overlay">
          <h2 className="card__title" title={this.props.title}>
            {this.props.title}
          </h2>
          <time
            className="card__date"
            dateTime={`${year}-${month}-${day}`}
            aria-label={`${day}.${month}.${year}`}
            title={`${day}.${month}.${year}`}
          >
            <span aria-hidden="true">{day}</span>
          </time>
          <div className="card__mark">
            <Mark
              id={`mark-for-${this.props.id}`}
              title={
                this.props.isMarked
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
              isMarked={this.props.isMarked}
              onChange={this.props.onMarkChange}
            />
          </div>
        </div>
      </article>
    );
  }
}
