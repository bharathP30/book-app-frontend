import { useEffect, useState } from 'react';
import BookCard from './components/BookCard.jsx';
import Form from './components/Form.jsx';
import Authpage from './components/AuthPage.jsx';
import useAuth from './components/useAuth.js';
import UpdateModal from './components/UpdateModal.jsx';

function App() {
  const [auth, setAuth] = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedDate: new Date().toISOString().split("T")[0]
  });

  const [updateFormData, setUpdateFormData] = useState({
    _id: "",
    title: "",
    author: "",
    genre: "",
    publishedDate: new Date().toISOString().split("T")[0]
  });
  const [filter, setFilter] = useState("");

  const [books, setBooks] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const apiURL = `${BASE_URL}/api`;
  const booksURL = `${BASE_URL}/api/books`;


  const [loading, setLoading] = useState(false);
  console.log("running ", auth?.token);
  console.log("running ", filter);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  
  const fetchBooks = async () => {
    const url = filter? `${booksURL}?genre=${filter}` : booksURL;
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        }
      });
      
      const data = await response.json();
      console.log(formData);
      console.log(data);

      // backend returns either an array or { count, books }
      setBooks(Array.isArray(data) ? data : data.books || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth) fetchBooks();

  }, [auth, filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    const res = await fetch(booksURL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchBooks();
        setFormData({
          title: "",
          author: "",
          genre: "",
          publishedDate: new Date().toISOString().split("T")[0],
        });
      } else {
        console.error("Failed to create book", res.status);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      
    }
  };

  const handleUpdate = async (id) => {
    const dataToUpdate = {
      title: updateFormData.title,
      author: updateFormData.author,
      genre: updateFormData.genre,
      publishedDate: updateFormData.publishedDate
    };

    try {
      const res = await fetch(`${booksURL}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(dataToUpdate),
    });

    if (res.ok) {
    await fetchBooks();
    }

    } catch (error) {
      console.error("error updating book", error);
    }
  }

  const handleUpdateFormData  = async (id) => {
     try {
      const res = await fetch(`${booksURL}/${id}`, {
        headers: {
          "content-type": "application/json",
          'Authorization': `Bearer ${auth.token}`
        },
      });

      const data = await res.json();
      setUpdateFormData(data);
    } catch (error) {
      console.error("error updating form data", error);
    }
  }

  const handleUpdateClick = async (id) => {
    setShowUpdateForm(prev => !prev);
    handleUpdateFormData(id);
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(`${booksURL}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${auth.token}`
      },
    });

    if (res.ok) {
    await fetchBooks();
    }

    } catch (error) {
      console.error("error deleting book", error);
    }
  }

  if(!auth) {
    return (
      <Authpage setAuth={setAuth} API_URL={apiURL}/>
    )
  }

  return (
    <>
     <div className='flex justify-center items-center flex-col gap-10'>
          <Form formData={formData}
                setFormData={setFormData} 
                handleSubmit={handleSubmit} 
                loading={loading}
                />
      <div>
        <select name="filter" id="bookFilter"  value={filter} onChange={(e)=> setFilter(e.target.value)}>
          <option value="">ALL</option>
          <option value="science">Science</option>
          <option value="economy">Economy</option>
          <option value="politics">Politics</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (

        books.map((book) => (
          <BookCard
          key={book._id || book.id}
          book={book}
          handleUpdateClick={handleUpdateClick}
          handleDelete={handleDelete}
          />
        ))
      )}

      {
        showUpdateForm && (
         <UpdateModal updateFormData={updateFormData}
                      setUpdateFormData={setUpdateFormData} 
                      handleUpdate={handleUpdate} 
                      loading={loading}
                      showForm={setShowUpdateForm}
         />
        )
      }
     </div>
    </>
  );
}

export default App
