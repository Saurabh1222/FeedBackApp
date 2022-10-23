import { createContext, useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(true)
  // const [feedback, setFeedback] = useState([])
  // const [feedbackEdit, setFeedbackEdit] = useState({
  //   item: {},
  //   edit: false,
  // })

  // useEffect(() => {
  //   fetchFeedback()
  // }, [])

  // // Fetch feedback
  // const fetchFeedback = async () => {
  //   const response = await fetch(`/feedback?_sort=id&_order=desc`)
  //   const data = await response.json()

  //   setFeedback(data)
  //   setIsLoading(false)
  // }

  // // Add feedback
  // const addFeedback = async (newFeedback) => {
  //   const response = await fetch('/feedback', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newFeedback),
  //   })

  //   const data = await response.json()
  //   console.log(data);

  //   setFeedback([data, ...feedback])
  // }

  // // Delete feedback
  // const deleteFeedback = async (id) => {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     await fetch(`/feedback/${id}`, { method: 'DELETE' })

  //     setFeedback(feedback.filter((item) => item.id !== id))
  //   }
  // }

  // // Update feedback item
  // const updateFeedback = async (id, updItem) => {
  //   const response = await fetch(`/feedback/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updItem),
  //   })

  //   const data = await response.json()
  //   console.log(data);
  //   // NOTE: no need to spread data and item
  //   setFeedback(feedback.map((item) => (item.id === id ? data : item)))


  //   // FIX: this fixes being able to add a feedback after editing
  //   // credit to Jose https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/29768200#questions/16462688
  //   setFeedbackEdit({
  //     item: {},
  //     edit: false,
  //   })
  // }

  // // Set item to be updated
  // const editFeedback = (item) => {
  //   setFeedbackEdit({
  //     item,
  //     edit: true,
  //   })
  // }
  const [feedback,setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'This is Item 1',
    },
    {
      id: 2,
      rating: 9,
      text: 'This is Item 2',
    },
    {
      id: 3,
      rating: 8,
      text: 'This is Item 3',
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  const [isLoading, setIsLoading] = useState(false)

  const addFeedback = (newFeedback) => {
      newFeedback.id = uuidv4()
      setFeedback([newFeedback,...feedback])
  }

  function deleteFeedback(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id===id ? {...item,...updItem} : item))
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
