import React, { Component, useState } from 'react'
import './PokeFetch.css';



class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      countdown: 10,
      loaded: false,
    }
    this.timer = setInterval(() => this.tick(), props.timeout || 1000);
  }

  tick() {
    const current = this.state.countdown;
    if (current === 0) {
      this.transition();
    } else {
      this.setState({ countdown: current - 1 }); 
    } 
  }

  transition() {
    clearInterval(this.timer);
    // do something else here, presumably.
  }


  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

    componentDidMount() {}

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.countdown}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} style={{ tintColor: 'gray' }} />
        </div>
      </div>
    )
  }
}

export default PokeFetch;