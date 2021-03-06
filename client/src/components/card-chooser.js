import React from 'react';
import '../../public/css/main.css';
import * as actions from '../actions';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import Card from './card';

export class CardChooser extends React.Component {
    constructor(props) {
      super(props);
      this.submitCards = this.submitCards.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchCards());
    }

    submitCards(){
      function isToggled(card){
        return card.toggled===true;
      }
      //filter for only cards which have been toggled (selected by user)
      const filteredCards = this.props.cards.filter(isToggled);
      //remove toggled key before adding to DB
      filteredCards.forEach(card => {delete card.toggled});
      const formData = {
        username: this.props.username,
        cards: filteredCards
    }
      this.props.dispatch(actions.addUserCards(formData));
      const path = '/';
      browserHistory.push(path);
    }

    render() {
        const cards = this.props.cards.map((card, index) => <Card key={index}
                                                                name={card.name}
                                                              toggled={card.toggled}
                                                              index={index}/>)

        return (
            <div>
              <h3>Please Select Your Cards</h3>
              {cards}
              <button className='btn submit-cards' onClick={this.submitCards}>Submit</button>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
      cards: state.cards,
      username: state.username,
  }
}

export default connect(mapStateToProps)(CardChooser);
