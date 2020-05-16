import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

const NoteApp = () => {

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  
  const addNote = (e) => {
    e.preventDefault()
    setNotes([
      ...notes,
      { title, body }
    ])

    setTitle('')
    setBody('')
  }

  const removeNote = (titleToRemove) => {
    setNotes(notes.filter(note => note.title !== titleToRemove))
  }

  useEffect(() => {
    console.log('Run once!')
    const notesData = JSON.parse(localStorage.getItem('notes'))
    if(notesData) {
      setNotes(notesData)
    }
  }, [])

  useEffect(() => {
    console.log('Run when notes change')
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div>
      <h1>Notes</h1>
      {
        notes.map(note => (
          <div key={note.title}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button onClick={() => removeNote(note.title)}>x</button>
          </div>
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

// const App = (props) => {
//   const [count, setCount] = useState(props.count)
//   const [text, setText] = useState('')

//   // useEffect: A combo of componentDidMount & componentDidUpdate
  
//   //This will only run once when component did mount
//   useEffect(() => {
//     console.log('This should only run once!')
//   }, [])

//   //This will run only when count changes
//   useEffect(() => {
//     console.log('useEffect ran!')
//     document.title = count
//   }, [count])

//   return (
//     <div>
//       <p>The current {text || 'count'} is {count}</p>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(props.count)}>Reset</button>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <input value={text}  onChange={(e) => setText(e.target.value)}/>
//     </div>
//   )
// }

// App.defaultProps = {
//   count: 0
// }

//This is NOT a good approach and won't work as expected.
//Click any button then type something in input and it messes up
// const App = (props) => {
//   // const [count, setCount] = useState(props.count)
//   // const [text, setText] = useState('')
//   const [state, setState] = useState({
//     count: props.count,
//     text: ''
//   })

//   return (
//     <div>
//       <p>The current {state.text || 'count'} is {state.count}</p>
//       <button onClick={() => setState({ count: state.count - 1 })}>-1</button>
//       <button onClick={() => setState({ count: props.count })}>Reset</button>
//       <button onClick={() => setState({ count: state.count + 1 })}>+1</button>
//       <input value={state.text}  onChange={(e) => setState({ text: e.target.value})}/>
//     </div>
//   )
// }

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
