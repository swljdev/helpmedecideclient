import React from 'react';
import './Poll.css'
import { FormLabel, Button, TextField } from '@material-ui/core'


class NewPoll2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pollQuestion: null,
        answer1: null,
        answer2: null, 
        tags: null,
        summary: null
    }
    this.pollSubmit = this.pollSubmit.bind(this)
}

    pollSubmit(event) {
        event.preventDefault()
        console.log("The Question is: ", this.state.pollQuestion)
        console.log("Option 1 is: ", this.state.answer1)
        console.log("Option 2 is: ", this.state.answer2)
        console.log("Tags: ", this.state.tags)
        console.log("Summary is: ", this.state.summary)

        //REQUIRE FORM VALIDATION
        let token = localStorage.getItem('session')
        console.log(token)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify(
            {
                "token":token,
                "question":this.state.pollQuestion,
                "answer1":this.state.answer1,
                "answer2":this.state.answer2,
                "tags":[this.state.tags],
                "summary":this.state.summary
            });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
        };

        fetch("http://localhost:3001/poll/new/newPoll", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            alert("Your Poll Has Been Recorded! In 48 Hours, We'll send your the community's response!")
        })
        
        .catch(error => console.log('error', error));
        }
    
  render() {
    return (
        <div className="home">
            <div className="pollContainer">
                <form>
                    <FormLabel>Question: TLDR;</FormLabel>
                <TextField required id="standard-required" label="Required" autoComplete="off" onChange={e => {
                    console.log(e.target.value)
                    this.setState({
                        pollQuestion: e.target.value,
                    })
              }} placeholder="Question" />
              <FormLabel>Option 1</FormLabel>
                <TextField required id="standard-required" label="Required" autoComplete="off" onChange={e => {
                    console.log(e.target.value)
                    this.setState({
                        answer1: e.target.value,
                    })
              }} placeholder="First Option" />
              <FormLabel>Option 2</FormLabel>
                <TextField required id="standard-required" label="Required" autoComplete="off" onChange={e => {
                    console.log(e.target.value)
                    this.setState({
                        answer2: e.target.value,
                    })
              }} placeholder="Second Option" />
               <FormLabel>Tags (Seperate by Commas)</FormLabel>
              <TextField required id="standard-required" label="Required" autoComplete="off" onChange={e => {
                    console.log(e.target.value)
                    this.setState({
                        tags: e.target.value,
                    })
              }} placeholder="Tags" />
              <FormLabel>Give Us A Short Summary</FormLabel>
              <TextField required id="standard-required" label="Required" autoComplete="off" onChange={e => {
                    console.log(e.target.value)
                    this.setState({
                        summary: e.target.value,
                    })
              }} placeholder="1000 Character Limit" />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit"
                    onClick={this.pollSubmit}
                >
                    Submit Poll
                </Button>
                </form>
            </div>
        </div>
        )
    }
}


export default NewPoll2;
