

export default function BookCard({ book, handleUpdateClick, handleDelete }){
      console.log(book);
    return(
         <div className='text-black flex flex-col justify-center items-center gap-4' key={book._id || book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Published Date: {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : ""}</p>
            <button 
                  onClick={() => handleUpdateClick(book._id || book.id)}
            >Update</button>

            <button
                  onClick={() => handleDelete(book._id || book.id)}
            >Delete</button>
          </div>
    )
}