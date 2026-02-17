
export default function Form({ formData,setFormData, handleSubmit, loading }){

    return(
        <form onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center gap-4 mt-10 mb-5'>
        <input
          required
          type="text"
          id="bookName"
          name="title"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder=" Enter book Title here"
        />

        <input
          required
          type="text"
          id="bookAuthor"
          name="author"
          value={formData.author || ""}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder=" Enter book Author here"
        />

        {/* <input
                      required
                      type="text"
                      id="bookGenre"
                      name="genre"
                      value={formData.genre || ""}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      placeholder=" Enter book Genre here"
                    /> */}

        <select 
        name="genre" 
        id="bookGenre" 
        value={formData.genre || ""}
        onChange={(e) => setFormData({...formData, genre: e.target.value})}>
          <option value="" disabled>select</option>
          <option value="science">Science</option>
          <option value="economy">Economy</option>
          <option value="politics">Politics</option>
        </select>

        <input
          required
          type="date"
          id="bookPublishedDate"
          name="publishedDate"
          value={formData.publishedDate || ""}
          onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    )
}