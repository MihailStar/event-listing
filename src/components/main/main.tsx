import React from 'react';

import { CardProps } from '../card/card';
import { Storage } from '../../helpers/storage';
import { APIEvent } from '../../api/api';
import { convertEventDateToDayMonthYear } from '../../helpers/convert-event-date-to-day-month-year';
import { Cards } from '../cards/cards';

export type MarkedCards = { [key: CardProps['id']]: true };
const markedCardsStorage = Storage.isAvailable()
  ? new Storage<MarkedCards>('markedCards')
  : null;

export interface MainProps {
  events: APIEvent[];
  cardsFilter(card: CardProps): boolean;
}

interface MainState {
  cards: CardProps[];
}

export class Main extends React.Component<MainProps, MainState> {
  public constructor(props: MainProps) {
    super(props);

    const markedCards = markedCardsStorage?.get() ?? {};

    this.state = {
      cards: this.props.events.map((event) => {
        return {
          id: event.id,
          title: event.name,
          date: convertEventDateToDayMonthYear(event.date),
          city: event.city,
          image: event.image,
          isMarked: Boolean(markedCards[event.id]),
          onMarkChange: () => {
            this.handleMarkChange(event.id);
          },
        };
      }),
    };
  }

  private getMarkedCards(): MarkedCards {
    const markedCards: MarkedCards = {};

    this.state.cards.forEach((card) => {
      if (card.isMarked === true) {
        markedCards[card['id']] = card.isMarked;
      }
    });

    return markedCards;
  }

  private handleMarkChange = (id: CardProps['id']): void => {
    this.setState(
      (prevState) => {
        return {
          cards: prevState.cards.map((card) => {
            return card['id'] === id
              ? { ...card, isMarked: !card['isMarked'] }
              : card;
          }),
        };
      },
      () => {
        markedCardsStorage?.set(this.getMarkedCards());
      }
    );
  };

  public override render(): JSX.Element {
    return (
      <main className="main">
        <div className="main__cards">
          <Cards cards={this.state.cards.filter(this.props.cardsFilter)} />
        </div>
      </main>
    );
  }
}
