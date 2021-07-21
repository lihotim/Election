import React, { Component } from 'react';

class Main extends Component {
    render() {
        return(
            <div>

            <div>
             <h1>Candidates Count: {this.props.candidatesCount}</h1>
            </div>
             
             <hr/>

            <div>
            <h1>Result</h1>
             <table id="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Candidate Name</th>
                  <th>Votes</th>
                </tr>
              </thead>

               <tbody id="candidateList">
                 {this.props.candidates.map((candidate, key) => {
                   return(
                    <tr key={key}>
                      <th>{candidate.id.toString()}</th>
                      <td>{candidate.name}</td>
                      <td>{candidate.voteCount.toString()}</td>
                   </tr>
                   )
                 })}

                </tbody>
              </table>
            </div>

            <hr/>

              { this.props.isVoted 
              ? <h1>You have voted already!</h1> 
              : <div>
                    <h1>Please vote:</h1>

                    <form id="form" onSubmit={this.props.handleSubmit}>

                    <select className="form-select" aria-label="Default select example" value={this.props.value} onChange={this.props.handleChange} >
                      <option value="0" disabled >(Choose a president)</option>
                      <option value="1" >Donald Trump</option>
                      <option value="2" >Joe Biden</option>
                      <option value="3" >Kim Namjoon</option>
                    </select>
                    <br/><br/>
                    <input type="submit" value="Vote" className="btn btn-primary" />
                    
                    </form>
            </div>
              }
              
          </div>
        );
    }
}

export default Main;
