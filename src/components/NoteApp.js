import React, { useEffect, useReducer } from 'react'

import notesReducer from '../reducers/notes'

import NoteList from './NoteList'
import AddNoteForm from './AddNoteForm'

import NotesContext from '../context/notes-context'

const NoteApp = () => {

  //1st parameter: reducer function.
  //2nd parameter: initial state.
  const [notes, dispatch] = useReducer(notesReducer, [])

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
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Notes</h1>
      <NoteList removeNote={removeNote} />
      <AddNoteForm dispatch={dispatch} />
    </NotesContext.Provider>
  )
}

export { NoteApp as default }