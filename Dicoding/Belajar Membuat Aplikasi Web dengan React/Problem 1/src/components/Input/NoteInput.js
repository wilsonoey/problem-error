import React from 'react';
     
class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    // inisialisasi state
    this.state = {
      title: '',
      body: '',
      limit: 50
    }
    
    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }
  
  onTitleChangeEventHandler(event) {
    if(this.state.limit > 0){
      this.setState((prevState) => {
        return {
          ...prevState,
          title: event.target.value,
          limit: prevState.limit.length - event.target.value.length,
        }
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState((prevState) => {
      return {
        ...prevState,
        body: event.target.value,
      }
   });
  }
  
  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
    this.setState(() => {
      return {
        title : '',
        body : '',
        limit: 50
      }
    });
  }
  
  render() {
    return (
      <form className='note-input' onSubmit={this.onSubmitEventHandler}>
        <p className='note-input__title__char-limit'>Sisa karakter: {this.state.limit}</p>
        <input class="note-input__title" type="text" placeholder="Name" value={this.state.title} onChange={this.onTitleChangeEventHandler} />
        <textarea class="note-input__body" type="text" placeholder="Description" value={this.state.body} onChange={this.onBodyChangeEventHandler} />
        <button type="submit">Buat</button>
      </form>
    )
  }
}
 
export default NoteInput;