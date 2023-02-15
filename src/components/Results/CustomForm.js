import React, { useState } from "react"
import { useEffect } from "react"
import Loading from "../Loading"

function CustomForm({ status, message, onValidated }) {
  const [email, setEmail] = useState(email)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const changeHandler = e => {
    setEmail(e.target.value)
    setError("")
    setSuccess("")
  }
  const handleSubmit = e => {
    setError("")
    setSuccess("")
    e.preventDefault()
    if (!email || email.length < 7 || email.indexOf("@") <= -1) {
      setError("Please enter valid email")
    } else {
      onValidated({
        EMAIL: email,
        MERGE0: email,
      })
    }
  }

  useEffect(() => {
    if (status == "success") {
      setSuccess("Thank you for subscribing")
      setEmail("")
    } else if (status == "sending") {
    } else {
      setError(message)
    }
  }, [status])
  return (
    <form onSubmit={handleSubmit}>
      <div className="h-[4.3rem] mb-4 mt-2">
        <p className="errorMessage text-red-600">{error}</p>
        <p className="successMessage text-green-500">{success}</p>
        <div className="flex flex-row items-center justify-center mt-2">
          <input
            className="p-3 min-w-[8.3rem] lg:min-w-[15rem] rounded-tl-md rounded-bl-md   outline-DarkPink h-[50px]"
            placeholder="Your Email"
            name="email"
            type={"email"}
            required
            onChange={changeHandler}
            value={email}
          />
          <button
            type="submit"
            className="bg-DarkPink rounded-tr-md rounded-br-md  text-white p-3 h-[50px]"
          >
            {status === "sending" ? <Loading /> : "submit"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default CustomForm
