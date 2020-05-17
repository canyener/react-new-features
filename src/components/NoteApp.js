import React, { useState, useEffect, useReducer } from 'react'

import notesReducer from '../reducers/notes'

import NoteList from './NoteList'

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
    const notesData = JSON.parse(localStorage.getItem('notes'))
    if(notesData) {
      dispatch({ type: 'POPULATE_NOTES', notes: notesData})
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div>
      <h1>Notes</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} placeholder="title" onChange={e => setTitle(e.target.value)} />
        <textarea value={body} placeholder="body" onChange={e => setBody(e.target.value)} />
        <button>Add Note</button>
      </form>
    </div>
  )
}

export { NoteApp as default }