import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

function App() {

  const [length, setLength] = useState(8); // Takes length of password
  const [numAllowed, setNumAllowed] = useState(false); // Checkbox to toggle the use of numbers in password
  const [charAllowed, setCharAllowed] = useState(false); // Checkbox to toggle the use of special characters in password
  const [password, setPassword] = useState("none"); // For password in input field
   
  const passwordGen = useCallback(() => {
    let string = "abcdefghijklmnopqrstuvwxyz";
      let pass = ""
      if(numAllowed) string += "0123456789"
      if(charAllowed) string += "!@#$%^&*()_+"
      for(let i = 1; i <=length; i++){
        let charIndex = Math.floor(Math.random() * string.length + 1)
        pass += string.charAt(charIndex)
      }
      setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGen()
  }, [length, numAllowed, charAllowed, passwordGen])

  const passwordRef = useRef(null)
  const copyPassword = useCallback(() => {
  passwordRef.current.select()
    navigator.clipboard.writeText(password)
    .then(() => alert("Password copied."))
  }, [password])
  
  return (
    <>
      <div className='bg-gray-900 font-medium my-5 rounded-md max-w-screen-md mx-auto w-full w-md-3 text-orange-600 py-3 text-3xl text-center'>Password Generator</div>

      <div className='bg-gray-900 flex flex-col justify-center align-middle my-5 rounded-md max-w-screen-md mx-auto w-full w-md-3  py-3 text-xl px-2'>
        {/* password text input */}
        <div className='my-3 mx-auto'>
          <input
            id='passField'
            className='px-3 py-2 rounded-md mx-auto w-96'
            type="text"
            placeholder='password'
            readOnly
            ref={passwordRef}
            value={password}
          />
          <button
            className="text-white bg-blue-700 py-2 w-auto rounded-md px-3  mx-2 text-center"
            onClick={copyPassword}
          >copy</button>
        </div>

        {/* password modifiers */}
        <div className='mx-auto'>

          {/* password length */}
          <input type="range"
            className='cursor-pointer'
            min={5}
            max={25}
            value={length}
            onChange={(e) => setLength(e.target.value)}

          />
          <label className='text-gray-400 ms-2' >{length}</label>

          {/* number allowed? */}
          <span className='ms-6 me-2'>
            <input type="checkbox"
              id='number'
              defaultChecked={numAllowed}
              className='cursor-pointer m-0'
              onChange={() => setNumAllowed((prev => !prev))}
            />
            <label htmlFor='number' className='text-gray-400 m-0' >numbers</label>
          </span>

          {/* characters allowed? */}
          <span className='mx-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='character'
              className='cursor-pointer'
              onChange={() => setCharAllowed((prev => !prev))}
            />
            <label htmlFor='character' className='text-gray-400 m-0'>characters</label>
          </span>
        </div>

      </div>

    </>
    // <>
    //   <div className='bg-gray-900 font-medium my-5 rounded-md max-w-screen-md mx-auto w-full w-md-3 text-orange-600 py-3 text-3xl text-center'>Password Generator</div>

    //   <div className='bg-gray-900 flex flex-col justify-center align-middle my-5 rounded-md max-w-screen-md mx-auto w-full w-md-3  py-3 text-xl px-2'>
    //     {/* password text input */}
    //     <div className='my-3 mx-auto'>
    //       <input
    //         className='px-3 py-2 rounded-md mx-auto w-96'
    //         type="text"
    //         placeholder='password'
    //         readOnly
    //         value={passGen()}
    //       />
    //       <button
    //       className="text-white bg-blue-700 py-2 w-auto rounded-md px-3  mx-2 text-center"
    //       onClick={copyHandler}
    //       >copy</button>
    //     </div>

    //     {/* password modifiers */}
    //     <div className='mx-auto'>

    //       {/* password length */}
    //       <input type="range"
    //         className='cursor-pointer'
    //         min={5}
    //         max={25}
    //         value={length}
    //         onChange={(e) => setLength(e.target.value)}
    //       />
    //       <label className='text-gray-400 ms-2' >{length}</label>

    //       {/* number allowed? */}
    //       <span className='ms-6 me-2'>
    //         <input type="checkbox"
    //           id='number'
    //           defaultChecked={num}
    //           className='cursor-pointer m-0'
    //           onChange={(e) => setNum(prev => !prev)}
    //         />
    //         <label htmlFor='number' className='text-gray-400 m-0' >numbers</label>
    //       </span>

    //       {/* characters allowed? */}
    //       <span className='mx-1'>
    //         <input type="checkbox"
    //           defaultChecked={char}
    //           id='character'
    //           className='cursor-pointer'
    //           onChange={(e) => setChar(prev => !prev)}
    //         />
    //         <label htmlFor='character' className='text-gray-400 m-0'>characters</label>
    //       </span>
    //     </div>

    //   </div>

    // </>
  )
}

export default App
