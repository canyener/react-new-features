import React, { useState, useEffect, useReducer } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes
    case 'ADD_NOTE':
      return [
        ...state,
        {
          title: action.title,
          body: action.body
        }
      ]
    case 'REMOVE_NOTE':
      return state.filter(note => note.title !== action.title)
    default:
      return state
  }
}

const NoteApp = () => {

  //1st parameter: reducer function.
  //2nd parameter: initial state.
  const [notes, dispatch] = useReducer(notesReducer, [])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  
  const addNote = (e) => {
    e.preventDefault()

    dispatch({ type: 'ADD_NOTE', title, body })
    setTitle('')
    setBody('')
  }

  const removeNote = (titleToRemove) => {
    dispatch({ type: 'REMOVE_NOTE', title: titleToRemove })
  }

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'))
    if(notes) {
      dispatch({ type: 'POPULATE_NOTES', notes })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div>
      <h1>Notes</h1>
      {
        notes.map(note => (
          <Note key={note.title} note={note} removeNote={removeNote} />
        ))
      }
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} placeholder="title" onChange={e => setTitle(e.target.value)} />
        <textarea value={body} placeholder="body" onChange={e => setBody(e.target.value)} />
        <button>Add Note</button>
      </form>
    </div>
  )
}

const Note = ({ note, removeNote}) => {

  useEffect(() => {
    console.log('Setting up effect!')

    //Cleanup function for the effect
    return () => {
      console.log('Cleaning up effect!')
    }

  }, [])

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
