import React, { useContext } from 'react'

import NotesContext from '../context/notes-context'

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext) 
  
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => dispatch({ type: 'REMOVE_NOTE', title: note.title })}>x</button>
    </div>
  )
}

export { Note as default }