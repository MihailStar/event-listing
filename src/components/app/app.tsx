import React from 'react';

import { APIEvent } from '../../api/api';
import { FiltersValues } from '../header/header';
import { Header } from '../header/header';
import { Main } from '../main/main';
import { fromMonthName as MonthNameToEventMonth } from '../../helpers/event-month';
import './app.scss';

export interface AppProps {
  events: APIEvent[];
}

interface AppState {
  filtersValues: FiltersValues;
}

export class App extends React.Component<AppProps, AppState> {
  public override state = { filtersValues: {} } as Readonly<AppState>;

  public override render(): JSX.Element {
    return (
      <div className="app">
        <div className="app__header">
          <Header
            events={this.props.events}
            onFiltersChanges={(filtersValues): void => {
              this.setState({ filtersValues });
            }}
          />
        </div>
        <div className="app__main">
          <Main
            events={this.props.events}
            cardsFilter={(card) => {
              const { city, month, favorites } = this.state.filtersValues;

              if (
                (city === undefined || city === card.city) &&
                (month === undefined ||
                  MonthNameToEventMonth[
                    month as keyof typeof MonthNameToEventMonth
                  ] === card.date.month) &&
                (favorites === undefined ||
                  (favorites === 'Marked' || !(favorites === 'Unmarked')) ===
                    card.isMarked)
              )
                return true;

              return false;
            }}
          />
        </div>
      </div>
    );
  }
}
