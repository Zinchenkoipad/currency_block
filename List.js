import React from 'react';
import { Table, Col, Row, Container } from 'react-bootstrap';

class ListItem extends React.Component{
  constructor(){
    super()
    this.state={
      completed: ''
    }
    this.setChecked = this.setChecked.bind(this)
  }
  setChecked(){
    this.setState(state=>({completed: !state.completed}))
  }
	render(){
    return(
  		<tr>
        <td>
          {this.props.code}
        </td>
        <td>
          {this.props.bid}
        </td>
        <td>
          {this.props.ask}
        </td>
        <td>
          <button onClick={this.props.func}>X</button>
        </td>
  		</tr>
  	)
  }
}

class List extends React.Component{
  constructor(){
    super()
    this.state = {
      allCurrencies: [],
      currencies: [],
    }
    this.addCurrency = this.addCurrency.bind(this);
    this.removeCurrency = this.removeCurrency.bind(this);
  }

  addCurrency(event){
    this.setState({currencies: this.state.currencies.concat(event.target.id)});
     event.target.className = 'p-1 m-2 btn btn-secondary';
  }
  removeCurrency(id){
    this.setState({currencies: this.state.currencies.filter(currency => currency !== id)})
  }

  componentDidMount(){
    const requestA = 'http://api.nbp.pl/api/exchangerates/tables/C/?format=json';
    fetch(requestA)
      .then(response => response.json())
      .then(data => this.setState({allCurrencies: data[0].rates}));
  }

  render(){
  	return(
      <Row>
      <Col lg="3">
        <p>Choose your currencies</p>
    		<Container className="d-flex flex-wrap justify-content-center" >
      			{this.state.allCurrencies.map(
              (allCurrenciesListItem,itemNum) => <button 
                style={{width:'45px',height:'35px'}} 
                className="p-1 m-2 btn btn-primary" 
                onClick={this.addCurrency} 
                key={itemNum}
                id={itemNum}
              >
                {allCurrenciesListItem.code}</button>
            )}
        </Container>
      </Col>
      <Col lg="1">
      </Col>
      <Col lg="4">
        <Table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Bid</th>
              <th>Ask</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.currencies.map(
              (currency,key) => <ListItem 
                key= {key} 
                code= {this.state.allCurrencies[currency].code} 
                bid = {this.state.allCurrencies[currency].bid}
                ask = {this.state.allCurrencies[currency].ask}
                func = {()=>this.removeCurrency(currency)} />
            )}
          </tbody>
        </Table>
      </Col>
      </Row>
  	)
  }
}

export default List;