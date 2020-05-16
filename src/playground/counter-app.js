const App = (props) => {
  const [count, setCount] = useState(props.count)
  const [text, setText] = useState('')

  // useEffect: A combo of componentDidMount & componentDidUpdate
  
  //This will only run once when component did mount
  useEffect(() => {
    console.log('This should only run once!')
  }, [])

  //This will run only when count changes
  useEffect(() => {
    console.log('useEffect ran!')
    document.title = count
  }, [count])

  return (
    <div>
      <p>The current {text || 'count'} is {count}</p>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <input value={text}  onChange={(e) => setText(e.target.value)}/>
    </div>
  )
}

App.defaultProps = {
  count: 0
}

// This is NOT a good approach and won't work as expected.
// Click any button then type something in input and it messes up
const App = (props) => {
  // const [count, setCount] = useState(props.count)
  // const [text, setText] = useState('')
  const [state, setState] = useState({
    count: props.count,
    text: ''
  })

  return (
    <div>
      <p>The current {state.text || 'count'} is {state.count}</p>
      <button onClick={() => setState({ count: state.count - 1 })}>-1</button>
      <button onClick={() => setState({ count: props.count })}>Reset</button>
      <button onClick={() => setState({ count: state.count + 1 })}>+1</button>
      <input value={state.text}  onChange={(e) => setState({ text: e.target.value})}/>
    </div>
  )
}