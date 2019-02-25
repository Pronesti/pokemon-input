import React from 'react';
import Autocomplete from 'react-autocomplete';
import {Loader,Card, Form,Table,Icon, Message, Portal, Segment,Header} from 'semantic-ui-react';

class PokeSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      pokemon: '',
      allPokemons: [],
      allPokemonsList: [],
      shiny: false,
      moveText: "",
      moveName: "",
      abilityName: "",
      abilityText: "",
      portal: true,
    };
  }
  
  componentDidMount(){
    console.log(this.props);  
  }

  doThings(e){
    if (e.target.value === ''){
      this.setState({pokemon: '', shiny: false});
    }
    console.log('https://pokeapi.co/api/v2/pokemon/' + e.target.value +'/');
    fetch('https://pokeapi.co/api/v2/pokemon/' + e.target.value +'/')
    .then(response => response.json())
    .then(jsondata => this.setState({pokemon: jsondata}))
    .catch(error => {console.log(error); this.setState({pokemon: ''});});

  this.setState({ value: e.target.value });
  }

  fetchAbility(url){
    fetch(url)
    .then(response => response.json())
    .then(jsondata => {this.setState({ability: jsondata, abilityName: jsondata.name, abilityText: jsondata.effect_entries[0].effect});})
    .catch(error => {console.log(error);});
  }

  fetchMove(url){
    fetch(url)
    .then(response => response.json())
    .then(jsondata => {this.setState({move: jsondata, moveText: jsondata.flavor_text_entries[2].flavor_text, moveName: jsondata.name });})
    .catch(error => {console.log(error);});
    
  }

  renderMoves(){
    return this.state.pokemon.moves.map((move, index) => (
      <Table.Row>
        <Table.Cell onClick={() => this.fetchMove(move.move.url)}>{move.move.name}</Table.Cell>
      </Table.Row>
    ));
  }

  renderAbilities(){
    return this.state.pokemon.abilities.map((ability, index) => (
      <Table.Row>
        <Table.Cell onClick={() => this.fetchAbility(ability.ability.url)}>{ability.ability.name}</Table.Cell>
      </Table.Row>
    ));
  }
  handleClose = () => this.setState({ open: false })



  render() {
    var {value, shiny, pokemon, abilities, moves} = this.state;
    return (
      <div>

<Form>
 <Autocomplete
items={[]}
//shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
getItemValue={item => item.label}
renderItem={(item, highlighted) =>
  <div
    key={item.id}
    style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
  >
    {item.label}
  </div>
}
value={value}
onChange={e => this.doThings(e)}
onSelect={value => this.setState({ value })}
renderInput={function(props){return <input {...props} placeholder="enter pokemon" />}}
/>
</Form>
{pokemon ? (
<Card>
<Card.Content>
{pokemon ? (!shiny ? (<img src={pokemon.sprites.front_default} alt={pokemon.species.name} />): (<img src={pokemon.sprites.front_shiny} alt={pokemon.species.name} />)) : (<Loader active inline/>)}
<button onClick={() => this.setState({shiny: !shiny})}>{!shiny ? ("make shiny") : ("undo")} </button>
</Card.Content>
<Card.Content>
<Card.Header><h1>{pokemon ? (pokemon.species.name) : ("loading...")}</h1></Card.Header>
</Card.Content>


    <Table celled>
    <Table.Header>
    <Table.Row>
    <Table.HeaderCell onClick={() => this.setState({abilities: !abilities})}>Abilities <Icon name='caret down' /></Table.HeaderCell>
    </Table.Row>
    </Table.Header>

    <Table.Body>
    {abilities ? (<Portal onClose={this.handleClose} open={abilities}>
            <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
              <Header>{this.state.abilityName}</Header>
              <p>{this.state.abilityText}</p>
            </Segment>
          </Portal>) : ("")}
      {abilities ? (this.renderAbilities()) : ("")}
    </Table.Body>
  </Table>

<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell onClick={() => this.setState({moves: !moves})}>Moves <Icon name='caret down' /></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Message attached></Message>
      {moves ? (<Portal onClose={this.handleClose} open={moves}>
            <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
              <Header>{this.state.moveName}</Header>
              <p>{this.state.moveText}</p>
            </Segment>
          </Portal>) : ("")}
      
      {moves ? (this.renderMoves()) : ("")}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
</Card>
): ("")}
      </div>
    );
  }
}

export default PokeSearch;