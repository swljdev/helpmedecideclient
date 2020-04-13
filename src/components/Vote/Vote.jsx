import React from 'react';
import './Vote.css'
import { LinearProgress, Button } from '@material-ui/core/';
import Chart from './voteChart'

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        question: "",
        solution1: "",
        solution1count: '',
        solution2: "",
        solution2count: '',
        summary: "",
        havePoll: false,
        //DON'T HARDCODE RESPONSES
        vote: null,
        hasVoted: false
    }
    this.voteHandler = this.voteHandler.bind(this)
}
 
//Grab the Poll Information & User Info
    componentDidMount() {
    let fetchId = this.props.pollId
    let token = localStorage.getItem('session')
    let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({"session":token});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow'
    };
    fetch(`http://localhost:3001/poll/${fetchId}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        fetch(`http://localhost:3001/response/get/${fetchId}`)
        .then(voteResponse => voteResponse.json())
        .then(votes => {
            let voted
            let vote
            let solution1parse = parseInt(votes.count[0] === undefined ? 0:votes.count[0].count,0)
            let solution2parse = parseInt(votes.count[1] === undefined ? 0:votes.count[1].count,0)

            if (result[1] === null) {
                voted = false
                vote = null
            } else {
                voted = true
                vote = result[1].response
                
            }
            this.setState({
                question: result[0].question,
                solution1: result[0].solution1,
                solution1count: solution1parse,
                solution2: result[0].solution2,
                solution2count: solution2parse,
                summary: result[0].summary,
                havePoll: true,
                hasVoted: voted,
                vote: vote
                })
            console.log(`Logging Vote.jsx componentDidMount`)
            console.log(`${solution1parse} votes for ${result[0].solution1}`)
            console.log(`${solution2parse} votes for ${result[0].solution2}`)
            let totalVotes = solution1parse + solution2parse
            console.log(`${totalVotes} total Votes`)
            console.log(`-----------------------------------------------`)
            })
            
        
    
    })
    .catch(error => console.log('error', error));
    }

    voteHandler(choice) {
        let token = localStorage.getItem('session')
        let pollId = this.props.pollId
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let body = JSON.stringify({"session":token,"vote":choice});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
            };

        fetch(`http://localhost:3001/response/${pollId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                hasVoted: true,
                vote: result.response
            })
            console.log(result)
        })
        .catch(error => console.log('error', error));
    }

render() {
    console.log(this.state)
    
    if (this.state.havePoll === true && this.state.hasVoted === false) {
        return (
            <div className="homeVote">
                <h2>POLL ID is {this.props.pollId}</h2>
               <h2>{this.state.question}</h2>
               <p>{this.state.summary}</p>
               <p>Cast your vote to see the results</p>
               <div>
                    <h3>{this.state.solution1}</h3>
                    <Button variant="contained" color="secondary" onClick={() => {this.voteHandler(1)}}>Vote Option 1</Button>
               </div>
               <div>
                    <h3>{this.state.solution2}</h3>
                    
                    <Button variant="contained" color="secondary" onClick={() => {this.voteHandler(2)}}>Vote Option 2</Button>
               </div>
               <Chart solutions={[this.state.solution1,this.state.solution2,this.state.solution1count,this.state.solution2count]}/>
               <Button variant="contained" color="primary" onClick={() => this.props.setVote(false)}>Back to Polls</Button>
    
            </div>
            )
    } else if (this.state.havePoll === true && this.state.hasVoted === true) {
        let theWinner = this.state.solution1count > this.state.solution2count ?  this.state.solution1 : this.state.solution2
        let voteCount = (this.state.solution1count + this.state.solution2count)
        let winnerBy =  (this.state.solution1count > this.state.solution2count ?  this.state.solution1count : this.state.solution2count) / voteCount * 100
        winnerBy = winnerBy.toFixed(1)

        if (this.state.vote === 1) {
            return (
                <div className="homeVote">
                     <h2>{this.state.question}</h2>
                    <p>{this.state.summary}</p>
                    <p><b>You voted for {this.state.solution1}</b></p>
                    <h3>{winnerBy}% of the community thinks that {theWinner} is the best answer to your question.</h3>
                    <p>{voteCount} members participated in this poll.</p>

                    <Chart solutions={[this.state.solution1,this.state.solution2,this.state.solution1count,this.state.solution2count]}/>
                    <Button variant="contained" color="primary" onClick={() => this.props.setVote(false)}>Back to Polls</Button>
    
                </div>
                )
        } else if (this.state.vote === 2) {
            return (
                <div className="homeVote">
                   <h2>{this.state.question}</h2>
                   <p>{this.state.summary}</p>
                   <p><b>You voted for {this.state.solution2}</b></p>
                   <h3>{winnerBy}% of the community thinks that {theWinner} is the best answer to your question.</h3>
                   <p>{voteCount} members participated in this poll.</p>
                   <Chart solutions={[this.state.solution1,this.state.solution2,this.state.solution1count,this.state.solution2count]}/>
                   <Button variant="contained" color="primary" onClick={() => this.props.setVote(false)}>Back to Polls</Button>
                 
                </div>
            )
        }
        } else {
        return (
            <div className="home">
               <LinearProgress />
            </div>
            )
    }
    
    }
}


export default Vote;