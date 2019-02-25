import React from 'react';
import PokeSearch from './PokeSearch.js';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            pokeList: [],
            allPokemonsList: [],
            loading:true,
        };
      }
    componentDidMount(){
            fetch('https://pokeapi.co/api/v2/pokemon/?limit=251')
            .then(response => response.json())
            .then(data => {
             this.setState({allPokemons: data, loading: false});
             alert("fetched");
             console.log(this.state);
            })
            .catch(error => alert(error));
            
          
            var pokearray = [];
        try{
          for(let i=0; i < 251; i++){
              pokearray.push(this.state.allPokemons.results[i].name)
            }
            this.setState({allPokemonsList: pokearray});
            console.log(this.state);
        }
        catch(error){
        console.log(error);
        }    
    }

    render() {

     return(
         <div>
             <h1>Pokemon</h1>
           {this.state.loading ? ("Loading...") : (<PokeSearch pokeList={this.state.allPokemonList}/> )} 
         </div>
         
     );   
    }
}
export default App;