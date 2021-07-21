import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';

import Election from '../abis/Election.json'

import MyNavbar from './MyNavbar.js'
import Main from './Main.js'

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Election.networks[networkId]
    if(networkData) {
        const election = new web3.eth.Contract(Election.abi, networkData.address)
        this.setState({ election })
          
        const candidatesCount = await this.state.election.methods.candidatesCount().call()
        this.setState({candidatesCount})
        // console.log("No. of candidates:", candidatesCount)

        // List all candidates' data on console.log:
        for(var i=1; i<=candidatesCount; i++){
          const can = await this.state.election.methods.candidates(i).call()
          this.setState({
            candidates:[...this.state.candidates, can]
          })
        }
        //console.log(this.state.candidates)
  
        // List account 1's data on console.log:
        const isVoted = await this.state.election.methods.voters(accounts[0]).call()
        this.setState({isVoted})
        // console.log("Account 1's data:", accounts[0], isVoted)

        this.setState({ loading: false })
    } else {
        window.alert('Election contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      isVoted: false,
      loading: true, 
      candidatesCount: 0,
      value: 0,
      candidates: []
    }
 
    this.vote = this.vote.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  vote(id) {
    this.setState({loading: true})
    this.state.election.methods.vote(id).send({from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({loading: false})
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('You chose Candidate ' + this.state.value + '. Please press OK to confirm.');
    this.vote(this.state.value)
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
  
      <MyNavbar account={this.state.account}/>
  
        <div id="main">
            { this.state.loading 
            ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
            : <Main 
            candidatesCount={this.state.candidatesCount}
            candidates={this.state.candidates}
            isVoted={this.state.isVoted}
            value={this.state.value}
            vote={this.vote}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            />
            }

        </div>
            
      </div>

    );
  }
}

export default App;
