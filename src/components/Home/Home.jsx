import React from 'react';
import './Home.css'
import OpenPolls from '../OpenPolls/OpenPolls'
import ClosedPolls from '../ClosedPolls/ClosedPolls'
import Vote from '../Vote/Vote'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: false,
      hasVoted: false,
      pollId: null
    }
  this.logoutHandler = this.logoutHandler.bind(this)
  this.setVote = this.setVote.bind(this)   
  this.setHasVoted = this.setHasVoted.bind(this)   
  }

  logoutHandler() {
    localStorage.clear()
    this.props.logout()
  }

  setVote(status, id) {
    console.log(`Set Vote to ${status} and PollId to ${id}`)
    this.setState({
      vote: status,
      pollId: id
    })
  }

  setHasVoted(status) {
    this.setState({
      hasVoted: status
    })
  }

  render() {
    
    if (this.state.vote === false) {
      //Show Active Polls
      return (
      <div className="polls">
        <div className="voteContainer">
        {/* <NewPoll2 /> */}
        </div>
       
        <div className="pollcontainer">
          <div className="pollList">
          <OpenPolls vote={this.state.vote} setVote={this.setVote} hasVoted={this.state.hasVoted} setHasVoted={this.setHasVoted} />
          </div>
          <div className="pollList">
          <ClosedPolls vote={this.state.vote} setVote={this.setVote} hasVoted={this.state.hasVoted} setHasVoted={this.setHasVoted} />    
          </div>
        
        
        </div>
        
      </div>
      )}
      else if (this.state.vote === true && this.state.pollId !== null) {
        //Show the vote window
        return (
          <div className="vote">
            <Vote vote={this.state.vote} setVote={this.setVote} pollId={this.state.pollId} hasVoted={this.state.hasVoted} setHasVoted={this.setHasVoted}/>
          </div>
        )
      }
   }
}

export default Home;